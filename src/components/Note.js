import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsCheck } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { MdChecklist } from "react-icons/md";

export default function Note(props) {
  const [formData, setFormData] = useState(props); //State containing the contents of the note's form input, receives initial State from the App Component

  //Handle text from the input field and store it in State, call the App Component's 'handleText' function to update App-level State 
  function setText(event) {
    const newText = event.target.value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        text: newText,
      };
    });
    props.textChange(newText, props.id);
  }

  //Toggle the note's 'edit' status, changing whether the input field or the text element is displayed
  function toggleEdit(event) {
    event.preventDefault();
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        isEdit: prevFormData.isEdit === true ? false : true,
      };
    });
  }

  //Toggle the note's 'checked' status, changing the styling on the text element
  function toggleChecked(event) {
    event.preventDefault();
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        checked: prevFormData.checked === true ? false : true,
      };
    });
    props.checked(props.id);
  }

  //Ternary operators declare whether the input field or text element are displayed depending on 'edit' status
  //'Edit', and 'Check' buttons toggle the note's 'edit', and 'checked' statuses 
  //Remove button calls the App Component's 'removeNote' function to remove the note from App State.
  return (
    <form className="note__form">
      {formData.isEdit === true ? (
        <textarea
          className="glass"
          id="note__input"
          type="text"
          placeholder="Enter a Note"
          name="text"
          value={formData.text}
          onChange={setText}
        />
      ) : (
        <p className="note__text , glass" 
        style={formData.checked === true ? {
                  textDecoration: "line-through",
                  color: "#ccc",
                  fontWeight: "100",
                  fontStyle: "italic",
                } : {}
          }
        >
          {formData.text}
        </p>
      )}
      <div className="note__buttons">
        <div className="button tooltip" id="edit__button" onClick={toggleEdit}>
          <span className="tooltip__text">Edit/Confirm text</span>
          {formData.isEdit ? <BsCheck /> : <FiEdit />}
        </div>
        <div className="button tooltip" id="check__button" onClick={toggleChecked}>
          <span className="tooltip__text">Strikethrough text</span>
          <MdChecklist />
        </div>
        <div className="button tooltip" id="remove__button" onClick={() => props.remove(props.index, props.id)}>
          <span className="tooltip__text">Delete note</span>
          <BiMinus />
        </div>
      </div>
    </form>
  );
}
