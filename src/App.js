import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ActionBar from "./components/todoActionbar/actionBar";
import TodoItemContainer from "./components/todoItemContainer/itemContainer";
import CheckBox from "./components/checkBox/CheckBox";
import "./App.css";

function App() {
  let todoList = useSelector((state) => state.todoListDetails);
  let checked = useSelector((state) => state.checked);
  const inputFocus = useRef(null);
  const handleClick = () => {
    inputFocus.current.focus();
  };

  return (
    <div>
      <ActionBar
        inputFocus={inputFocus}
        handleClick={handleClick}
        checkBox={
          <CheckBox
            id={"todoSelectDeslectAll"}
            checked={checked}
            label={"Select / Deselect All"}
          />
        }
      ></ActionBar>
      <div className="todoItemWrapper" id="todoItemWrapper">
        {todoList.map((item) => (
          <TodoItemContainer
            key={item.id}
            todoItemTitle={item.title}
            todoItem={item.item}
            id={item.id}
            toggledClass={item.done}
            handleClick={handleClick}
            expand={item.expand}
            checkBox={<CheckBox id={item.id} checked={item.checked} />}
          ></TodoItemContainer>
        ))}
      </div>
    </div>
  );
}

export default App;
