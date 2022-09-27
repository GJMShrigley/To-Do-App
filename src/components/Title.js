import React from "react";

import { FiEdit } from "react-icons/fi"
import { BsCheck } from "react-icons/bs"

export default function Title() {
    const [formData , setFormData] = React.useState({
        title: "",
        isEdit: true
    });

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            };
        });
    }

    function toggleEdit(event) {
        event.preventDefault()
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                isEdit: formData.isEdit === true ? false : true
            };
        });
    }

    return (
        <form className="title-form"> 
                {formData.isEdit === true ? 
                <input 
                className="title-input , glass"
                type="text"
                placeholder="Enter a Title"
                name="title"
                maxLength="75"
                value={formData.title}
                onChange={handleChange}
                /> 
                :
                <h1 className="title-text , glass">{formData.title}</h1>}
                <div className="button tooltip" id="title-button" onClick={toggleEdit}><span class="tooltiptext">Edit/Confirm title</span>{formData.isEdit ? <BsCheck /> : <FiEdit /> }</div>
            </form>
    )
}