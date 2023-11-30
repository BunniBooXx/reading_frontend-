import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import ReadingList from './ReadingList';
import HomePage from './Home';
import UpdateBook from './UpdateBook'; 

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/reading-list" element={<ReadingList />} />
                        <Route path="/update-book/:bookId" element={<UpdateBook />} /> 
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;




