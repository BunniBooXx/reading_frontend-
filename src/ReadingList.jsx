import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadingList = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    const [shouldRefetch, setShouldRefetch] = useState(false);



    useEffect(() => {
        const fetchReadingList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/all`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                    },
                });

                if (response && response.data) {
                    setBooks(response.data.books);

                    setShouldRefetch(false);
                }
            } catch (error) {
                console.error('Error fetching reading list:', error.response ? error.response.data.message : error.message);
            }
        };

        fetchReadingList();
    }, [shouldRefetch]);

    const addBook = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/book/new`,
                {
                    title,
                    author,
                    genre
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response && response.data && response.status === 201) {
                // Refresh the reading list after adding a book
                setShouldRefetch(true);
            }
        } catch (error) {
            console.error('Error adding book:', error.response ? error.response.data.message : error.message);
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/book/delete_book/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                },
            });

            // Refresh the reading list after deleting a book
            setShouldRefetch(true);
        } catch (error) {
            console.error('Error deleting book:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Reading List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id} className="mb-2 flex justify-between items-center">
                        <span>{book.title} by {book.author}</span>
                        <button
                            onClick={() => deleteBook(book.id)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Add a Book</h3>
                <label className="block text-sm font-medium text-gray-600 mb-1">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-md py-2 px-3 mb-2"
                />
                <label className="block text-sm font-medium text-gray-600 mb-1">Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border rounded-md py-2 px-3 mb-4"
                />
                <label className="block text-sm font-medium text-gray-600 mb-1">Genre:</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full border rounded-md py-2 px-3 mb-4"
                />
                <button
                    onClick={addBook}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Add Book
                </button>
            </div>
        </div>
    );
};

export default ReadingList;


