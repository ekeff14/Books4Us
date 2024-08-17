import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
    });

const [cover, setCover] = useState(null); // New state for the file

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
            await axios.put(`http://localhost:8800/books/${bookId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
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
            <input type='file' onChange={handleFileChange} name='cover' /> {/* New file input for cover */}
            <button className='update' onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;
