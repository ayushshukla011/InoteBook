import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const Addnote = () => {

    const context=useContext(noteContext);
    const {addNote}=context;

    const [note, setnote] = useState({title:" ",description:" ",tag:"default "})

    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    }
    const change=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})//triple dot indicates jo pahle se hai usko rahne do uske aage se sab aur add kar do
    }

  return (
    <div className="container my-3 ">
      <h2>Add Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
             Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name="title"
            onChange={change}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={change}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={change}
          />
        </div>
  
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Add note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
