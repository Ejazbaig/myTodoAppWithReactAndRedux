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
  ON_ITEM_DROP,
  ON_DRAG_START,
  ON_DRAG_OVER,
} from "./../action-types/action-types";

export const handleInputChanges = (value) => {
  return {
    type: HANDLE_INPUT_CHANGE,
    value,
  };
};

export const addTodoItem = (event) => {
  return {
    type: ADD_TODO_ITEM,
    event,
  };
};

export const deleteTodoItem = (id) => {
  return {
    type: DELETE_TODO_ITEM,
    id,
  };
};

export const todoItemStrikeThrough = (id) => {
  return {
    type: STRIKE_TODO_ITEM,
    id,
  };
};

export const handleEditIcon = (event, id) => {
  return {
    type: HANDLE_EDIT_ICON,
    event,
    id,
  };
};

export const showFullDetailsHandler = (event, id) => {
  return {
    type: SHOW_FULL_DETAILS,
    event,
    id,
  };
};

export const selectAndDeselectAll = (event) => {
  return {
    type: SELECT_AND_DESELECT_ALL,
    event,
  };
};

export const handleCheckBox = (event) => {
  return {
    type: HANDLE_CHECK_BOX,
    event,
  };
};

export const deleteSelected = (event) => {
  return {
    type: DELETE_SELECTED_TODO_ITEM,
    event,
  };
};

export const markSelected = (event) => {
  return {
    type: MARK_SELECTED_TODO_ITEM,
    event,
  };
};

export const checkIfCheckedAll = (bool) => {
  return {
    type: CHECKED_IF_ALL_CHECKED,
    bool,
  };
};

export const updateState = () => {
  return {
    type: UPDATE_STATE,
  };
};

export const dragOnStart = (event, id) => {
  return {
    type: ON_DRAG_START,
    event,
    id,
  };
};

export const dragOnOver = (event, id) => {
  return {
    type: ON_DRAG_OVER,
    event,
    id,
  };
};

export const onItemDrop = (event, id) => {
  return {
    type: ON_ITEM_DROP,
    event,
    id,
  };
};
