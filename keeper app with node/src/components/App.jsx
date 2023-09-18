import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios';


function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/notes")
    .then((data) => {
      setNotes(data?.data);
    })
    .catch( (err) => console.log(err));
  }, []);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id, _id, title, content) {
    axios.delete(`http://localhost:5000/notes/${id}`,
    {data: {
      title: title,
      content: content
    }}
    )
    .then((response) => {
      console.log(response);
      console.log(response.data);
    });

    setNotes(prevNotes => {
      return notes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  } // function deleteNote()

  function modifyNote(id, _id, title, content, oldTitle, oldContent) {
    axios.put(`http://localhost:5000/notes/${id}`,
     {
       title: title,
       content: content,
       oldTitle: oldTitle,
       oldContent: oldContent
     }
     )
     .then((response) => {
       console.log(response);
       console.log(response.data);
     });

     const noteItem = {
      title: title,
      content: content,
      _id: ""
     };

    setNotes(prevNotes => {
      return notes.fill(noteItem, id, id+1); 
    });
  } // function modifyNote()

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            _id={noteItem._id}
            onDelete={deleteNote}
            onModify={modifyNote}
          />
        );
      })}
      <Footer />
    </div>
  );

} // function App()

export default App;