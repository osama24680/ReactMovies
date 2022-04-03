import React, { useState } from 'react'
import axios from "axios"
import joi from 'joi';
import { useNavigate } from 'react-router-dom'


export default function Registor() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: ""
  })

  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  let navigate=useNavigate()

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

  async function submitRegister(e) {
    setIsLoading(true)
    e.preventDefault()
    let validResult = validateForm(user)

    if (validResult.error) {
     
      setErrorList(validResult.error.details)
      console.log(validResult)
      setIsLoading(false)

    } else {
      let { data } = await axios.post(`https://routeegypt.herokuapp.com/signup`, user)
      let lastIndex = data.message.lastIndexOf(":")
      let errorString = data.message.slice(lastIndex + 1)
      if (data.message === "success") {
        setIsLoading(false)
        navigate("/login")
        setError("")
      } else {
        setError(errorString)
        setIsLoading(false)
      }
    }

  }

  function validateForm(user) {
    let schema = joi.object({
      first_name: joi.string().alphanum().min(3).max(8).required(),
      last_name: joi.string().alphanum().min(3).max(8).required(),
      age: joi.number().min(18).max(80).required(),
      email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: joi.string().pattern(/[A-Za-z0-9]{5}$/)
    })
    return schema.validate(user, { abortEarly: false })
  }


  return (
    <div>
      <form onSubmit={submitRegister}>
        <h2 className="my-3">Registor Now</h2>
        {errorList.map((error, index) => {
          if (index === 4 ) {
            return <div key={index} className="alert alert-primary" >password invalid</div>
          } else {
            return <div key={index} className="alert alert-warning">{error.message}</div>
          }
          }
        )}

        {error? <div className="alert alert-danger ">{error}</div> :"" }

        <label htmlFor="first_name">First Name</label>
        <input onChange={getUser} type="text" className="form-control my-3" name="first_name" id="first_name" />

        <label htmlFor="last_name">Last Name</label>
        <input onChange={getUser} type="text" className="form-control my-3" name="last_name" id="last_name" />

        <label htmlFor="age">Age</label>
        <input onChange={getUser} type="number" className="form-control my-3" name="age" id="age" />

        <label htmlFor="email">Email</label>
        <input onChange={getUser} type="email" className="form-control my-3" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input onChange={getUser} type="password" className="form-control my-3" name="password" id="password" />

        <button className="btn btn-outline-info">
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Registor"}
        </button>
      </form>
    </div>
  )
}
