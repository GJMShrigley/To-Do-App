import React from "react"

import { FiEdit } from "react-icons/fi"
import { BsCheck } from "react-icons/bs"
import { BiMinus } from "react-icons/bi";
import { MdChecklist } from "react-icons/md";


export default function Note(props) {
    const [formData , setFormData] = React.useState(props)
    
    

    function setText(event) {
        event.preventDefault();
        const newText = event.target.value;
        const loadedText = formData.loadedText;
        
        if (loadedText != "") {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    text: loadedText,
                    loadedText: "",
                    
                }
            }); console.log(formData)
        } else {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    text: newText
                }
            }); console.log(formData);
            props.text(newText, props.id);
        }


    }

    function toggleEdit(event) {
        event.preventDefault()
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                isEdit: prevFormData.isEdit === true ? false : true
            }
        })
    }

    function toggleChecked(event) {
        event.preventDefault()
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                checked: prevFormData.checked === true ? false : true
            }
        });
        props.checked(props.id);
    }

    return (
        <form className="note-form"> 
                {formData.isEdit === true ? 
                <textarea 
                className="glass"
                id="note-input"
                type="text"
                placeholder="Enter a Note"
                name="text"
                value={formData.text}
                onChange={setText}
                /> 
                :
                <p className="note-text , glass" style={formData.checked === true ? {textDecoration: "line-through", color: "#aaa", fontWeight: "100", fontStyle: "italic"} : {}}>{formData.text}</p>}
                <div className="button" id="edit-button" onClick={toggleEdit}>{formData.isEdit ? <BsCheck /> : <FiEdit /> }</div>
                <div className="button" id="check-button" onClick={toggleChecked}> <MdChecklist /></div>
                <div className="button" id="remove-button" onClick={()=>props.remove(props.id)}><BiMinus /></div>
            </form>
    )
}