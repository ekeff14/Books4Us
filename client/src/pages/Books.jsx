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
    <div className='App semibg'>
        <div class="page-header">
    <h1>Books4Us</h1>
    </div>

    <div className='intro'>
    <h2>Welcome to Jeffrey Books4Us, your gateway to a world of captivating stories and thought-provoking reads! As an avid reader and passionate author, I've curated a special selection of my favorite books, updated weekly for you to explore and discover. Whether you're searching for your next great adventure or looking to dive into a story that resonates, our collection is designed to inspire and entertain.</h2>
    </div>

    <div>
        <p className='header2'>My Selections</p>
        </div>
        <div className='books'>
            {books.map(book=>(
                <div className="book" key={book.id}>
                    {book.cover && <img src={`http://localhost:8800/uploads/${book.cover}`} alt='Cover Not Available' />} 
                    <h3 className='title'>{book.title}</h3>
                    <p className="desc">{book.desc}</p>
                    <span className="price">£{book.price}</span>
                    <button className="delete" onClick={()=>handleDelete(book.id)}>Delete

                    </button>
                    <button className="update">
                        <Link to={`/update/${book.id}`}>Update</Link>
                    </button>
                </div>
            ))}
        </div>
        <button className="add">
    <Link to="/add">Add Book</Link>
    </button>

    </div>
  )
}

export default Books