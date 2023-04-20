import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsCheck } from "react-icons/bs";

export default function Title() {
//State containing the contents of the title form input
  const [formData, setFormData] = useState({
    title: "",
    isEdit: true,
  });

//Handle changes to the title form input and commit them to State 
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

//Toggle the title's 'edit' status, changing whether the input field or the text element is displayed
  function toggleEdit(event) {
    event.preventDefault();
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        isEdit: formData.isEdit === true ? false : true,
      };
    });
  }

//Ternary operators declare whether the input field or text element are displayed depending on 'edit' status
//'Edit' button toggles the title's 'edit' status 
  return (
    <form className="title__form">
      {formData.isEdit === true ? (
        <input
          className="title__input , glass"
          type="text"
          placeholder="Enter a Title"
          name="title"
          maxLength="75"
          value={formData.title}
          onChange={handleChange}
        />
      ) : (
        <h1 className="title__text , glass">{formData.title}</h1>
      )}
      <div className="button tooltip" id="title__button" onClick={toggleEdit}>
        <span className="tooltip__text">Edit/Confirm title</span>
        {formData.isEdit ? <BsCheck /> : <FiEdit />}
      </div>
    </form>
  );
}
