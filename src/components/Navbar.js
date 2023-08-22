import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Navbar() {
  let location = useLocation();
  let navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem('token');
      navigate('/login');
  }

  return (

    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand" to="/">Inotebook</Link >
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse  justify-content-between" id="navbarCollapse">
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <Link className={ `nav-link ${location.pathname === "/" ? "active" : ""}` } to="/">Home</Link >
            </li>
            <li className="nav-item">
              <Link className={ `nav-link ${location.pathname === "/about" ? "active" : ""}` } to="/about">about</Link >
            </li>

          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
          <Link className="btn btn-primary mx-2" to="/login" >Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup" >Signup</Link>
          </form>: <button className='btn btn-primary' onClick={handlelogout}>logout</button>}
        </div>

      </nav>
    </div>

  )
}

export default Navbar


