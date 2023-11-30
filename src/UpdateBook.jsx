import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const UpdateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    const {bookId} = useParams();

    const handleUpdate = async (e) => {


        e.preventDefault();

        try {
            const response = await axios.put(
                `${BACKEND_URL}/book/update_book/${bookId}`,
                {
                    title,
                    author,
                    genre,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Handle success
            console.log('Update successful:', response.data);
        } catch (error) {
            // Handle error
            console.error('Update error:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Book</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-600 mb-1">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-600 mb-1">
                        Genre
                    </label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;

