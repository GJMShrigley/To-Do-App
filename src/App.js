import React from "react";

import Title from "./components/Title";
import Note from "./components/Note";

import { BsPlusLg } from "react-icons/bs";

import './style.css';

export default function App() {
  
  const [NotesData, setNotesData] = React.useState([{id: 0, 
    placeNo: 0,
    text:"",
    checked: false,
    isEdit: true}]) 

function addNote() {
  setNotesData(prevState => {
    return [...prevState , { 
      id: prevState.length, 
      placeNo: prevState.length,
      text:"",
      checked: false,
      isEdit: true
      }]
  })
}

function removeNote(id) {
  const items = NotesData;
  const noteId = id;

  if (items.length > 0) {
    setNotesData(items.filter((item, index) => index !== noteId))
    } 
  }

function handleText(formText, id) {
  const NotesDataCopy = NotesData;
  const textData = formText;
  const noteId = id;

  for (let i = 0; i < NotesDataCopy.length; i++) {
     if (NotesDataCopy[i].id === noteId) {
       NotesDataCopy[i].text = textData
       setNotesData(NotesDataCopy)
    }
    }
}

function handleCheck(id) {
  const NotesDataCopy = NotesData;
  const noteId = id;

  for (let i = 0; i < NotesDataCopy.length; i++) {
    if (NotesDataCopy[i].id === noteId) {
      NotesDataCopy[i].checked = !NotesDataCopy[i].checked;
      setNotesData(NotesDataCopy)
    }
  }
}

  const notes = NotesData.map(item => {
    return (
      <Note
        key= {item.id}
        id= {item.id}
        remove={removeNote}
        text={handleText}
        checked={handleCheck}
        />
    )
  }) 
  
  return (
    <div>
      <Title />
      <div className="add-remove-buttons">
      <div className="button" onClick={console.log(NotesData)}></div>
        <div className="button" id="add-button" onClick={addNote}><BsPlusLg /></div>
      </div>      
      <section className="notes-list">
        {notes}
      </section>   
    </div>    
  );
}

