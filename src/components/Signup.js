import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'


const Signup = () => {
  const [credentials, setcredentials] = useState({ name:"",email: "", password: "",cpassword:"" })
  let history=useNavigate();
  const handlesubmit = async (e) => {
      e.preventDefault();//prevents reload
      const response = await fetch(
          `http://localhost:5000/auth/Createuser`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({name:credentials.name ,email: credentials.email, password: credentials.password }),
          }
      );
      const json = await response.json();
      console.log(json);
      if(json.success){
          //save auth and redirect
          localStorage.setItem('signtoken',json.authToken);
          history("/login");
      }
      else{
          alert("Invalid credential");
      }

  }

  const onchange = (e) => {
      setcredentials({...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>

        <div className="d-flex">
                <h2>Create Accout -Signup</h2>
        </div>
        <form onSubmit={ handlesubmit }>
        <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name </label>
                <input type="text" className="form-control" id="name" name='name' value={ credentials.name } onChange={ onchange } aria-describedby="emailHelp" placeholder="Enter name" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={ credentials.email } onChange={ onchange } aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={ credentials.password } onChange={ onchange } placeholder="Password" minLength={5} required />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                <input type="password" className="form-control" id="password" name='cpassword' value={ credentials.cpassword } onChange={ onchange } placeholder="Password" minLength={5} required />
            </div>
            <div className="container my-2">
            {credentials.password !==credentials.cpassword && "Confirm password should be same as password"}
            </div>
            <button type="submit" disabled={credentials.password !==credentials.cpassword} className="btn btn-primary my-2" >Submit</button>
        </form>
    </div>
  )
}

export default Signup