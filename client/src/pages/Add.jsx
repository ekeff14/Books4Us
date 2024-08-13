import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Add = () => {

const[book,setBook] = useState({
  title:"",
  desc:"",
  price:null,
  cover:"",
})

const navigate = useNavigate()

const handleChange = (e)=>{
  setBook((prev) =>({ ...prev, [e.target.name]: e.target.value}));
};

const handleClick = async e =>{
  e.preventDefault()
  try {
    await axios.post("http://localhost:8800/books", book)
    navigate("/")
  } catch (err) {
    console.log(err)
  }
};

console.log(book)

  return (
    <div className='form'>
    <h1>Add New Book</h1>
    <input type='text' placeholder='Title Here' onChange={handleChange} name='title'/>
    <input type='text' placeholder='Description Here' onChange={handleChange} name='desc'/>
    <input type='number' placeholder='Price Here' onChange={handleChange} name='price'/>
    <input type='text' placeholder='Cover Here' onChange={handleChange} name='cover'/>

    <button className='add' onClick={handleClick}>
      Add
    </button>

    </div>
  )
}

export default Add