import React from "react";
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

const [count, setCount] = React.useState(1); 
const [notesData, setNotesData] = React.useState([]); 

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

function removeNote(noteIndex, noteId) {
  const items = notesData;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === noteId) {
     setNotesData(items.filter((item, itemIndex) => itemIndex !== noteIndex ))
    }
  }}

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

function handleOnDragEnd(result) {
  if (!result.destination) return;
  let notesDataCopy = Array.from(notesData);
  let [reorderedNotes] = notesDataCopy.splice(result.source.index, 1); 
  notesDataCopy.splice(result.destination.index, 0, reorderedNotes);
  setNotesData(notesDataCopy);
}

function saveFile() {
  const notesText = JSON.stringify(notesData);
  const file = new File([notesText], "Notes.txt", {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(file);
}

function loadFile(event) {
  const files = event.target.files;
  const file = files[0];
  const reader = new FileReader();
  setNotesData([]);

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
    <div className = "main-container">
      <Title />
      <div className="buttons-container">
        <div className="add-save-load-buttons">
        <div className="button , list-buttons , tooltip" id="save-button" onClick={saveFile}>
          <span className="tooltiptext">Save notes file</span>
          <BiDownload />
        </div>
        <div className="button , list-buttons , tooltip" id="add-button" onClick={addNote}>
            <span className="tooltiptext">Add note</span>
              <BsPlusLg />
        </div>
         <label className="button , list-buttons , tooltip" for="load-input">
            <span className="tooltiptext">Load notes file</span>
            <BiUpload />
         </label>
         <input id="load-input" type="file" onChange={loadFile}></input>
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

