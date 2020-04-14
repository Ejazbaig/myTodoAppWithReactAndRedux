import React from "react";
import {
  handleCheckBox,
  selectAndDeselectAll,
} from "./../../redux/actions/actions";
import { useDispatch } from "react-redux";
function CheckBox(props) {
  const { id, checked, label } = props;
  const dispatch = useDispatch();
  return (
    <>
      <div className="pretty p-icon p-round p-jelly">
        <input
          type="checkbox"
          className="todoCheckBox"
          id={id}
          checked={!!checked}
          onChange={(e) =>
            id === "todoSelectDeslectAll"
              ? dispatch(selectAndDeselectAll(e))
              : dispatch(handleCheckBox(e))
          }
        />
        <div className="state p-primary">
          <i className="icon mdi mdi-check"></i>
          <label>{label}</label>
        </div>
      </div>
    </>
  );
}

export default CheckBox;
