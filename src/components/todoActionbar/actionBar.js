import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleInputChanges,
  addTodoItem,
  deleteSelected,
  markSelected,
} from "./../../redux/actions/actions";
import Button from "../button/Button";

function ActionBar(props) {
  const { inputFocus, handleClick, checkBox } = props;
  const todoItemDescription = useSelector((state) => state.todoItemDescription);
  const edited = useSelector((state) => state.editItem);
  const dispatch = useDispatch();

  return (
    <div className="actionBarWrapper">
      <h1 className="mainHeading" id="heading">
        TODO LIST
      </h1>
      <div className="todoInputBar">
        <input
          type="text"
          className="addTaskTextbox"
          autoFocus
          ref={inputFocus}
          placeholder="Enter the task to add"
          value={todoItemDescription || ""}
          onChange={(e) => dispatch(handleInputChanges(e.target.value))}
          onKeyPress={(e) =>
            e.key === "Enter" && e.target.value !== ""
              ? dispatch(addTodoItem(e))
              : null
          }
        />
        <Button
          className="todoAddButton"
          onclickHandler={() => {
            dispatch(addTodoItem());
            handleClick();
          }}
          label={edited ? "Save" : "Add"}
        />
      </div>
      <div className="todoActionBar" id="todoActionBar">
        <div className="checkBoxWrapper">{checkBox}</div>
        <Button
          onclickHandler={(e) => dispatch(deleteSelected(e))}
          label="Delete Selected"
        />
        <Button
          onclickHandler={(e) => dispatch(markSelected(e))}
          label="Mark/UnMark Selected"
        />
      </div>
      <hr className="myHrStyle" />
    </div>
  );
}

export default ActionBar;
