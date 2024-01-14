import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/user/user`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                    },
                });

                if (response && response.data) {
                    setUser(response.data);
                    setBooks(response.data.books?? []);

                    
                } else {
                    setUser(null);
                    setBooks([]);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data.message : error.message);
                setUser(null);
                setBooks([]);
            }
        };

        fetchUserData();
    }, []);

    const deleteBook = async (bookId) => {
        try {
            await axios.delete(`${BACKEND_URL}/book/delete_book/${bookId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                },
            });
            // Update the books state after deleting a book
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        } catch (error) {
            console.error('Error deleting book:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Welcome to My Library</h2>

            {user ? (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Your Reading List</h3>
                    {books.length > 0 ? (
                        <ul>
                            {books.map((book) => (
                                <li key={book.id} className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span>{book.title} by {book.author}</span>
                                        </div>
                                        <div>
                                            <button
                                                className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
                                                onClick={() => deleteBook(book.id)}
                                            >
                                                Delete
                                            </button>
                                            <Link to={`/update-book/${book.id}`}>
                                                <button className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2">
                                                    Update
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No books in your reading list yet. Add some books!</p>
                    )}
                </div>
            ) : (
                <p>Please log in to see your reading list.</p>
            )}
        </div>
    );
};

export default HomePage;
 



