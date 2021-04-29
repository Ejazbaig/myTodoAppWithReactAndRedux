import uuid from "react-uuid";
import {
  HANDLE_INPUT_CHANGE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  STRIKE_TODO_ITEM,
  HANDLE_EDIT_ICON,
  SHOW_FULL_DETAILS,
  SELECT_AND_DESELECT_ALL,
  HANDLE_CHECK_BOX,
  DELETE_SELECTED_TODO_ITEM,
  MARK_SELECTED_TODO_ITEM,
  CHECKED_IF_ALL_CHECKED,
  UPDATE_STATE,
  ON_DRAG_START,
  ON_DRAG_OVER,
  ON_ITEM_DROP,
} from "./../action-types/action-types";

const myState = {
  todoListDetails: [],
  todoItemDescription: "",
  todoItemId: uuid(),
  checked: false,
  editItem: false,
  loaded: false,
};

export const myHandleInputChangeReducer = (state = myState, action) => {
  switch (action.type) {
    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        todoItemDescription: action.value,
        todoItemId: uuid(),
      };
    case ADD_TODO_ITEM:
      const newTodoItem = {
        id: state.todoItemId,
        title: state.todoItemDescription.substring(0, 100),
        item: state.todoItemDescription,
        done: false,
        checked: false,
        expand: false,
      };
      if (!newTodoItem.item.trim()) {
        return state;
      }
      const updatedItems = [newTodoItem, ...state.todoListDetails];
      return {
        ...state,
        todoListDetails: updatedItems,
        todoItemDescription: "",
        todoItemId: uuid(),
        checked: false,
        editItem: false,
      };
    case DELETE_TODO_ITEM:
      const filteredItems = state.todoListDetails.filter(
        (item) => item.id !== action.id
      );
      return {
        ...state,
        todoListDetails: filteredItems,
      };
    case STRIKE_TODO_ITEM:
      let todoListDetails = state.todoListDetails.map((item) => {
        if (item.id === action.id) {
          let temp = item.done;
          item.done = !temp;
        }
        return item;
      });
      return {
        ...state,
        todoListDetails,
      };
    case HANDLE_EDIT_ICON:
      const filteredTodoItems = state.todoListDetails.filter(
        (item) => item.id !== action.id
      );
      const selectedItems = state.todoListDetails.find(
        (item) => item.id === action.id
      );
      return {
        ...state,
        todoListDetails: filteredTodoItems,
        todoItemDescription: selectedItems.item,
        editItem: true,
        todoItemId: action.id,
      };
    case SHOW_FULL_DETAILS:
      let myTodoListDetails = state.todoListDetails;
      myTodoListDetails = myTodoListDetails.map((item) => {
        if (item.id === action.id) {
          if (item.expand === false) {
            item.expand = true;
          } else {
            item.expand = false;
          }
        }
        return item;
      });
      return {
        ...state,
        todoListDetails: myTodoListDetails,
      };
    case SELECT_AND_DESELECT_ALL:
      let todoListItems = state.todoListDetails;
      if (state.todoListDetails.length) {
        todoListItems.forEach(
          (item) => (item.checked = action.event.target.checked)
        );
      }
      return {
        ...state,
        todoListDetails: todoListItems,
        checked: action.event.target.checked ? true : false,
      };
    case HANDLE_CHECK_BOX:
      const theTodoListDetails = state.todoListDetails.map((item) => {
        if (item.id === action.event.target.id) {
          if (action.event.target.checked === true) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        }
        return item;
      });
      return {
        ...state,
        todoListDetails: theTodoListDetails,
      };
    case DELETE_SELECTED_TODO_ITEM:
      let todoListItemDetails = state.todoListDetails.filter((item) => {
        return item.checked === false;
      });
      if (state.checked) {
        return {
          todoListDetails: todoListItemDetails,
          checked: false,
        };
      } else {
        return {
          ...state,
          todoListDetails: todoListItemDetails,
        };
      }
    case MARK_SELECTED_TODO_ITEM:
      let todoListItemsDetails = state.todoListDetails.map((item) => {
        if (item.checked === true) {
          let temp = item.done;
          item.done = !temp;
        }
        return item;
      });
      return {
        ...state,
        todoListDetails: todoListItemsDetails,
      };
    case CHECKED_IF_ALL_CHECKED:
      if (action.bool === false) {
        return {
          ...state,
          checked: true,
        };
      } else {
        return {
          ...state,
          checked: false,
        };
      }
    case ON_DRAG_START:
      console.log("start---", action.id);
      action.event.dataTransfer.setData("id", action.id);
      return state;
    case ON_DRAG_OVER:
      console.log("over---", action.id);
      action.event.preventDefault();
      return state;
    case ON_ITEM_DROP:
      console.log("drop===", action.id);
      action.event.preventDefault();
      let draggedItemId = action.event.dataTransfer.getData("Id");
      let newTodoListDetails = state.todoListDetails;
      let draggedItemIndex = 0;
      let droppedItemIndex = 0;
      for (let i = 0; i < newTodoListDetails.length; i++) {
        if (newTodoListDetails[i].id === draggedItemId) {
          draggedItemIndex = i;
        }
        if (newTodoListDetails[i].id === action.id) {
          droppedItemIndex = i;
        }
      }
      if (draggedItemIndex === droppedItemIndex) {
        return state;
      }
      if (draggedItemIndex < droppedItemIndex) {
        let temp = newTodoListDetails[draggedItemIndex];
        for (let i = draggedItemIndex; i <= droppedItemIndex; i++) {
          newTodoListDetails[i] = newTodoListDetails[i + 1];
        }
        newTodoListDetails[droppedItemIndex] = temp;
        return {
          todoListDetails: [...newTodoListDetails],
        };
      }
      if (draggedItemIndex > droppedItemIndex) {
        let temp = newTodoListDetails[draggedItemIndex];
        for (let i = draggedItemIndex; i >= droppedItemIndex; i--) {
          newTodoListDetails[i] = newTodoListDetails[i - 1];
        }
        newTodoListDetails[droppedItemIndex] = temp;
        return {
          todoListDetails: [...newTodoListDetails],
        };
      }
      break;
    case UPDATE_STATE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
