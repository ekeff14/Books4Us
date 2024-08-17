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

const [cover, setCover] = useState(null); // New state for the file

const navigate = useNavigate()

const handleChange = (e)=>{
  setBook((prev) =>({ ...prev, [e.target.name]: e.target.value}));
};

const handleFileChange = (e) => {
  setCover(e.target.files[0]); // Store the selected file in state
};


const handleClick = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", book.title);
  formData.append("desc", book.desc);
  formData.append("price", book.price);
  formData.append("cover", cover); // Attach the file to the form data

  try {
      await axios.post("http://localhost:8800/books", formData, {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      });
      navigate("/");
  } catch (err) {
      console.log(err);
  }
};


console.log(book)

  return (
    <div className='form'>
    <h1>Add New Book</h1>
    <input type='text' placeholder='Title Here' onChange={handleChange} name='title'/>
    <input type='text' placeholder='Description Here' onChange={handleChange} name='desc'/>
    <input type='number' placeholder='Price Here' onChange={handleChange} name='price'/>
    <input type='file' onChange={handleFileChange} name='cover' /> {/* New file input for cover */}

    <button className='add' onClick={handleClick}>
      Add
    </button>

    </div>
  )
}

export default Add