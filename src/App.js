import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FileSaver from 'file-saver';
import Title from "./components/Title";
import Note from "./components/Note";
import { BsPlusLg } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { BiUpload } from "react-icons/bi";
import './style.css';
import './help.css';
export default function App() {

const [count, setCount] = useState(1); //State containing an int used to provide each note with a unique key
const [notesData, setNotesData] = useState([]); //State containing the list of note Objects


// Create new note and add to State
function addNote() {
  setCount(prevCount => prevCount + 1);

  setNotesData(prevState => {
    return [...prevState , { 
      id: notesData.length + 1, 
      position: `item ${count}`,
      text:"",
      checked: false,
      }];
  });
}

//Remove note from State
function removeNote(noteIndex, noteId) {
  const items = notesData;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === noteId) {
     setNotesData(items.filter((item, itemIndex) => itemIndex !== noteIndex ))
    }
  }}

//Handle changes to each note's text in State received from individual Note Components  
function handleText(formText, id) {
  const notesDataCopy = notesData;
  const textData = formText;
  const noteId = id;

  for (let i = 0; i < notesDataCopy.length; i++) {
     if (notesDataCopy[i].id === noteId) {
       notesDataCopy[i].text = textData;
       setNotesData(notesDataCopy);
    }
  }
}

//Handle changes to each note's 'checked' status in State received from individual Note Components 
function handleCheck(id) {
  const notesDataCopy = notesData;
  const noteId = id;

  for (let i = 0; i < notesDataCopy.length; i++) {
    if (notesDataCopy[i].id === noteId) {
      notesDataCopy[i].checked = !notesDataCopy[i].checked;
      setNotesData(notesDataCopy);
    }
  }
}

//Handle reordering of notes in State
function handleOnDragEnd(result) {
  if (!result.destination) return;
  let notesDataCopy = Array.from(notesData);
  let [reorderedNotes] = notesDataCopy.splice(result.source.index, 1); 
  notesDataCopy.splice(result.destination.index, 0, reorderedNotes);
  setNotesData(notesDataCopy);
}

//Handle saving of current State to a JSON file in the user's device
function saveFile() {
  const notesText = JSON.stringify(notesData);
  const file = new File([notesText], "Notes.txt", {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(file);
}

//Handle loading of an existing JSON file from the user's device
function loadFile(event) {
  const files = event.target.files;
  const file = files[0];
  const reader = new FileReader();
  setNotesData([]);

  //Return an error if the user selects more than a single file to load
  if (file.length > 1) {
    alert("Please select a single file to load");
    return;
  }

  //Load the file from the user's device and parse the contained JSON text, commit the resulting data to State
  reader.addEventListener("load", () => {
   const loadedFile = JSON.parse(reader.result);
   setNotesData(loadedFile);
   setCount(loadedFile.length + 1)
  }, false);
  reader.readAsText(file);
}

//Render the contents of State as a list of draggable notes
  const notes = notesData.map((item, index) => {
    return (
      <Draggable key={item.id} draggableId={item.position} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Note
            key={item.id}
            id={item.id}
            index={index}
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
    <div className = "main__container">
      <Title />
      <div className="buttons__container">
        <div className="add-save-load__buttons">
        <div className="button , list__buttons , tooltip" id="save__button" onClick={saveFile}>
          <span className="tooltip__text">Save notes file</span>
          <BiDownload />
        </div>
        <div className="button , list__buttons , tooltip" id="add__button" onClick={addNote}>
            <span className="tooltip__text">Add note</span>
              <BsPlusLg />
        </div>
         <label className="button , list__buttons , tooltip" id="load__button" for="load__input">
            <span className="tooltip__text">Load notes file</span>
            <BiUpload />
         </label>
         <input id="load__input" type="file" onChange={loadFile}></input>
        </div>
      </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable__notes">
            {(provided) => (
              <div className="notes__list" {...provided.droppableProps} ref={provided.innerRef}>
                {notes}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> 
    </div>    
  );
}

