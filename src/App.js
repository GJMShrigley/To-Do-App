import React from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FileSaver, { saveAs } from 'file-saver';

import Title from "./components/Title";
import Note from "./components/Note";

import { BsPlusLg } from "react-icons/bs";
import { BsSave } from "react-icons/bs";

import './style.css';
export default function App() {

  const [count, setCount] = React.useState(1);

  const [NotesData, setNotesData] = React.useState([{
    id: 0, 
    index: 0,
    position: `item 0`,
    text:"",
    checked: false,
    isEdit: true,
  }]) 

function addNote() {

  setCount(prevCount => prevCount + 1);

  setNotesData(prevState => {
    return [...prevState , { 
      id: count, 
      index: count,
      position: `item ${count}`,
      text:"",
      checked: false,
      isEdit: true,
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
      setNotesData(NotesDataCopy);
    }
  }
}

function handleOnDragEnd(result) {
  if (!result.destination) return;
  const NotesDataCopy = Array.from(NotesData);
  const [reorderedNotes] = NotesDataCopy.splice(result.source.index, 1); 
  NotesDataCopy.splice(result.destination.index, 0, reorderedNotes);
  setNotesData(NotesDataCopy);
}

function saveFile() {
  const notesText = JSON.stringify(NotesData);
  const file = new File([notesText], "Notes.txt", {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(file);
}

  const notes = NotesData.map(item => {
    return (
      <Draggable key={item.id} draggableId={item.position} index={item.index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Note
            key= {item.id}
            id= {item.id}
            remove={removeNote}
            text={handleText}
            checked={handleCheck}
          />
        </div>
        )}
        </Draggable>
    )
  }) 
  
  return (
    <div>
      <Title />
      <div className="buttons-container">
        <div className="add-remove-buttons">
          <div className="button" id="add-button" onClick={addNote}><BsPlusLg /></div>
        </div> 
        <div className="save-load-buttons">
          <div className="button" id="save-button" onClick={saveFile}><BsSave /></div>
        </div>
      </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable-notes">
            {(provided) => (
              <section className="notes-list" {...provided.droppableProps} ref={provided.innerRef}>
                {notes}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext> 
    </div>    
  );
}

