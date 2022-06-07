import React from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FileSaver from 'file-saver';

import Title from "./components/Title";
import Note from "./components/Note";

import { BsPlusLg } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";

import './style.css';
export default function App() {

  const [count, setCount] = React.useState(1);

  const [NotesData, setNotesData] = React.useState([]) 

function addNote() {

  setCount(prevCount => prevCount + 1);

  setNotesData(prevState => {
    return [...prevState , { 
      id: NotesData.length + 1, 
      position: `item ${count}`,
      text:"",
      checked: false,
      }]
  })
}

function removeNote(noteIndex, noteId) {
  const items = NotesData;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === noteId) {
      console.log(noteId)
     setNotesData(items.filter((item, itemIndex) => itemIndex !== noteIndex ))
    }
  }}

function handleText(formText, id) {
  const NotesDataCopy = NotesData;
  const textData = formText;
  const noteId = id;

  for (let i = 0; i < NotesDataCopy.length; i++) {
     if (NotesDataCopy[i].id === noteId) {
       NotesDataCopy[i].text = textData;
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
      console.log(NotesData)
    }
  }
}

function handleOnDragEnd(result) {
  if (!result.destination) return;
  let NotesDataCopy = Array.from(NotesData);
  let [reorderedNotes] = NotesDataCopy.splice(result.source.index, 1); 
  NotesDataCopy.splice(result.destination.index, 0, reorderedNotes);
  setNotesData(NotesDataCopy);
  console.log(result)
}

function saveFile() {
  const notesText = JSON.stringify(NotesData);
  const file = new File([notesText], "Notes.txt", {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(file);
}

function loadFile(event) {
  const files = event.target.files;
  const file = files[0];
  const reader = new FileReader();

  setNotesData([])

  if (file.length > 1) {
    alert("Please select a single file to load");
    return;
  }

  reader.addEventListener("load", () => {
   const loadedFile = JSON.parse(reader.result);
   setNotesData(loadedFile);
   setCount(loadedFile.length + 1)
  }, false);

  reader.readAsText(file);
}

  const notes = NotesData.map((item, index) => {
    return (
      <Draggable key={item.id} draggableId={item.position} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Note
            key= {item.id}
            id= {item.id}
            index= {index}
            remove={removeNote}
            text={item.text}
            textChange={handleText}
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
          <div className="button" id="save-button" onClick={saveFile}><BiDownload /></div>
        </div>
        <input id="load-input" type="file" onChange={loadFile}></input>
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

