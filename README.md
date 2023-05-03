# TO DO LIST APP

A React-based to-do list. Add items to your list of notes, mark them done, delete them and reorder them with drag-and-drop functionality. Then when you're done save them to your device for later. 

## HOW TO USE:

To run the app locally from your device, in the project directory, run the command `npm run build`.

Alternatively, see the app running live at: https://react-to-do-note.netlify.app/

### Entering a title

A text field at the top can be used to enter a title for your list of notes. When you're done click the checkmark button to the right of the text field. This will change the text field to a header element and prevent accidental changes to the text. If you wish to amend the title text at any time, simply click the button again to change the element back into an editable text field. 

### Adding a new note

Click the + button underneath the title element to add a new text field for a note. 

### Editing a note

Each note element contains 3 buttons. Clicking the top button will change the accompanying paragraph element into a text field which can be edited. Clicking the button again will change the text field back to a paragraph element and prevent accidental changes to the text. The size of the paragraph element will expand to fit any text entered without requiring scrolling so there is no need to limit the length of text entered.

### Marking a note complete

The middle button containing two checkmarks can be used to toggle the status of an accompanying note. This will alter the text inside to display in a darker shade and struck through.

### Delete a note

Once a note is no longer needed it can be removed from the list by clicking the bottom button to its right.

### Reordering a list

To change the order of notes in a list, click down on the note (or the space surrounding it if it is currently being edited) and drag it to its new destination. Other notes will automatically move aside to allow space.

### Saving a list

To save a list, click on the left button beneath the title element (containing the down-pointing arrow) and select a name and destination for the file.

### Loading a list

To load a list, click on the right button beneath the title element (containing the up-pointing arrow) and select the desired file.

## HOW IT WORKS:

This project was designed for the purposes of teaching myself the fundamentals of React.js and as a result it is fairly straightforward in its functionality and structure. 

React applications are often designed around a modular structure where separate components are combined into one. This makes React versatile and comparatively simple to implement as components can be easily reused either on the same page mutiple times or across several pages. These components can then modify their contents according to data from an outside source.

This app is comprised of two separate components,'Title' and a 'Notes'. React dynamically inserts these components into the HTML as needed. Notes are stored as an object in an array and the properties of that object (such as the text contents, whether or not the note has been 'checked' (as a boolean), an ID (as an integer), and a position (as a string).) are used to determine how React displays the element when it is rendered on the page.

One of the advantages of React is how it handles rendering and re-rendering its elements. By only re-rendering those elements that require it (typically those which have changed in some way) React is able to provide dynamic and interactive elements without being too intensive on the browser's resources. It is able to do this by recording the state of its elements in a form named, appropriately, 'state'. 

Each time the user adds a note using the + button, a new object is added to the array and the 'state' of that array is updated. React then runs through the array and re-renders the list portion of the screen to display the change while leaving the unaltered elements (such as the title) intact.

The 'React-beautiful-dnd' library allows notes to be reordered on the list by setting a drag and drop context. Dragging a note anywhere inside this area will update the array by removing the relevant note from its original position and returning it at the new destination. Each time a note is created, it is wrapped inside a 'draggable' context which keeps track of its ID and position properties, and its index within the array. 

Both the Title and Note components contain buttons which toggle various effects and also a text field. Typically React is only able to pass data in a single direction, from parent to child. While it would be possible to allow each individual note to handle the contents of its text field and other properties, this would not be good practice as it could lead to conflicts between the data contained in the original array and the data of each note element.

This made it necessary to use a slightly more complex method of dealing with user input to the interactive parts of each component. Instead of passing the data down to the individual note element directly, I instead passed a reference to a function contained in the parent component 'App.js'. Now interacting with the buttons or text field of the note element will trigger the function in the parent component 'App.js' and update the data in the original array of objects directly.

## CREDITS:

React-beautiful-dnd courtesy of Atlassian (https://github.com/atlassian/react-beautiful-dnd)

FileSaver courtesy of Eligrey (https://github.com/eligrey/FileSaver.js)

## LINKS:

For a live example, please visit my online portfolio (https://gs-todo.netlify.app/)
