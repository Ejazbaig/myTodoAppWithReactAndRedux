import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodoItem,
  deleteTodoItem,
  todoItemStrikeThrough,
  handleEditIcon,
  showFullDetailsHandler,
  checkIfCheckedAll,
  onItemDrop,
  dragOnStart,
  dragOnOver,
  updateState,
} from "./../../redux/actions/actions";
import { FiTrash2 } from "react-icons/fi";
import { FaStrikethrough } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import styles from "./../css-modules/App.module.css";

function TodoItemContainer(props) {
  const {
    todoItem,
    todoItemTitle,
    id,
    toggledClass,
    expand,
    handleClick,
    checkBox,
  } = props;

  const todoItemDescription = useSelector((state) => state.todoItemDescription);
  const todoListDetails = useSelector((state) => state.todoListDetails);
  const checked = useSelector((state) => state.checked);
  const dispatch = useDispatch();

  useEffect(() => {
    let checkedItems = todoListDetails.filter((item) => item.checked === true);
    if (todoListDetails.length) {
      if (checkedItems.length === todoListDetails.length && checked === false) {
        dispatch(checkIfCheckedAll(false));
      }
      if (checkedItems.length !== todoListDetails.length && checked === true) {
        dispatch(checkIfCheckedAll(true));
      }
    }
  });

  return (
    <div
      className={styles.todoItemContainer}
      id="todoItemContainer"
      draggable={true}
      onDragStart={(e) => dispatch(dragOnStart(e, id))}
      onDragOver={(e) => dispatch(dragOnOver(e, id))}
      onDrop={(e) =>
        dispatch(onItemDrop(e, id)) && dispatch(updateState(todoListDetails))
      }
    >
      {checkBox}
      <p
        className={toggledClass ? "strikeThrough" : "saveTaskTextbox"}
        id={id}
        onClick={(e) => dispatch(showFullDetailsHandler(e, id))}
      >
        {expand === true ? todoItem : todoItemTitle}
      </p>
      <FaEdit
        className="editIcon"
        onClick={(e) =>
          todoItemDescription && todoItemDescription.length
            ? dispatch(addTodoItem()) && handleClick()
            : dispatch(handleEditIcon(e, id)) && handleClick()
        }
      />
      <FiTrash2
        className="trashIcon"
        id="trashIcon"
        onClick={() => dispatch(deleteTodoItem(id))}
      />
      <FaStrikethrough
        className="strike"
        id={id}
        onClick={(e) => dispatch(todoItemStrikeThrough(id))}
      />
    </div>
  );
}

export default TodoItemContainer;
