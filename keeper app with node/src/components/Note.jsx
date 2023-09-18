import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


function Note(props) {
  const [isEditable, setEditable] = useState(false);

  const [note, setNote] = useState({
    title: props.title,
    content: props.content,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
    console.log(note.title);
    console.log(note.content);
  }
  
  function handleDelete() {
    props.onDelete(props.id, props._id, note.title, note.content);
  }
 
  function handleModify() {
    setEditable(true);
  }
 
  function handleSave() {
    setEditable(false);
    const newTitle = document.getElementById("title-"+props.id).textContent;
    const newContent = document.getElementById("content-"+props.id).textContent;
    props.onModify(props.id, props._id, newTitle, newContent, note.title, note.content);
  }

  return (
    <div className="note">
      <h1
        id={"title-"+props.id} 
        name="title"
        onChange={handleChange}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        value={note.title}
      >{note.title}</h1>
      <p 
        id={"content-"+props.id}
        name="content"
        onChange={handleChange}
        contentEditable={isEditable}
        suppressContentEditableWarning={true} 
        value={note.content}
      >{note.content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={isEditable ? handleSave : handleModify}>
        {isEditable ? <SaveIcon /> : <EditIcon />}
      </button>
    </div>
  );
}

export default Note;