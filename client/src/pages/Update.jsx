import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/books/${bookId}`);
                console.log('Fetched book data:', res.data); // Check if data is fetched correctly
                setBook(res.data);
                console.log('State after setting book:', book); // Check if state is updating correctly
            } catch (err) {
                console.log('Error fetching book:', err);
            }
        };
        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/books/${bookId}`, book);
            navigate("/");
        } catch (err) {
            console.log('Error updating book:', err);
        }
    };

    return (
        <div className='form'>
            <h1>Update Book</h1>
            <input type='text' value={book.title} placeholder='Title Here' onChange={handleChange} name='title' />
            <input type='text' value={book.desc} placeholder='Description Here' onChange={handleChange} name='desc' />
            <input type='number' value={book.price} placeholder='Price Here' onChange={handleChange} name='price' />
            <input type='text' value={book.cover} placeholder='Cover Here' onChange={handleChange} name='cover' />
            <button className='update' onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;
