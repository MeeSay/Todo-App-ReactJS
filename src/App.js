import TodoList from "./components/TodoList.js";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import {v4} from "uuid" //tạo id

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList]= useState([]); //array
  const [textInput, setTextInput]= useState(""); //array

  useEffect(()=>{
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if(storagedTodoList){
      setTodoList(JSON.parse(storagedTodoList));
    }
  },[]);

  useEffect(() => {
    console.log("Saving to localStorage:", JSON.stringify(todoList));
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  },[todoList]);

  const onTextInputChange = useCallback((event) =>{
    setTextInput(event.target.value);
  },[]);

  const onAddBtnClick = useCallback((event) =>{
    //Them text input vào danh sách todo list
    setTodoList([
      {id: v4(), name: textInput, isCompleted: false},
      ...todoList]);

      setTextInput("");
  },[textInput,todoList]); // có sự thay đổi ở text input và todolist => cập nhật lại

  const onCheckBtnClick = useCallback((id)=>{
    setTodoList((prevState) => 
      prevState.map((todo) =>
        todo.id === id ?{ ...todo, isCompleted: true} : todo
      )
    );
  },[]);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield 
        name="add-todo" 
        placeholder="Thêm việc cần làm ..." 
        elemAfterInput={
          <Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnClick}>
            Thêm
          </Button>
      }
      css = {{ padding: "2px 4px 2px"}}
      value={textInput}
      onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick = {onCheckBtnClick}/>
    </>
    
  );
}

export default App;
