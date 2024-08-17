import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const Books = () => {

const [books,setBooks] = useState([])

useEffect(()=>{
    const fetchAllBooks = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/books");
            console.log(res.data);
            setBooks(res.data);
        }catch(err){
            console.log(err);
        }
    }
    fetchAllBooks()
},[])

    console.log(books);

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1>Jeff's Book Store</h1>
        <div className='books'>
            {books.map(book=>(
                <div className="book" key={book.id}>
                    {book.cover && <img src={`http://localhost:8800/uploads/${book.cover}`} alt='Cover Not Available' />} 
                    <h2>{book.title}</h2>
                    <p className="desc">{book.desc}</p>
                    <span className="price">£{book.price}</span>
                    <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className="update">
                        <Link to={`/update/${book.id}`}>Update</Link>
                    </button>
                </div>
            ))}
        </div>
        <button className="add">
    <Link to="/add">Add New Book</Link>
    </button>

    </div>
  )
}

export default Books