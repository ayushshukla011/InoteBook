import { useState } from "react";
import Notecontext from "./notes/noteContext";

const NoteState = (props) => {
  // const host="https://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all note
  const getNotes = async () => {
    //API CALL
    const response = await fetch("http://localhost:5000/notes/fetchallnotes", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYjFjZWQxMWJiYzM5OTE2MjM3NzM5In0sImlhdCI6MTY5MjA5OTU4Mn0.4lXsXUUPcwwhV-UtQjDythsDNDjGvh3AMABHOeig4nQ",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },


    });
    const json = await response.json();
    console.log(json);
    setNotes(json);

  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch("http://localhost:5000/notes/addnote", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYjFjZWQxMWJiYzM5OTE2MjM3NzM5In0sImlhdCI6MTY5MjA5OTU4Mn0.4lXsXUUPcwwhV-UtQjDythsDNDjGvh3AMABHOeig4nQ",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    
    const note= await response.json();
    setNotes(notes.concat(note));

  };


  //delete a note
  const deleteNote = async (id) => {

    const response = await fetch(
      `http://localhost:5000/notes/deletenode/${id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYjFjZWQxMWJiYzM5OTE2MjM3NzM5In0sImlhdCI6MTY5MjA5OTU4Mn0.4lXsXUUPcwwhV-UtQjDythsDNDjGvh3AMABHOeig4nQ",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const json = await response.json();
    console.log(json);

    console.log("deleting a note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(
      "http://localhost:5000/notes/updatenote/64db6d026e78655b0a29708e",
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYjFjZWQxMWJiYzM5OTE2MjM3NzM5In0sImlhdCI6MTY5MjA5OTU4Mn0.4lXsXUUPcwwhV-UtQjDythsDNDjGvh3AMABHOeig4nQ",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      }
    );

    response.json();

    //Logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <Notecontext.Provider value={ { notes, addNote, deleteNote, editNote, getNotes } }>
      { props.children }
    </Notecontext.Provider>
  );
};
export default NoteState;
