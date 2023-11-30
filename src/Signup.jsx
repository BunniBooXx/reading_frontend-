import React, { useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flashMessage, setFlashMessage] = useState('');

    const handleSignup = async () => {
        try {
            console.log('BACKEND_URL:', BACKEND_URL);

            // Fetch options including headers
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            };

            const response = await fetch(`${BACKEND_URL}/auth/register`, requestOptions);
            const responseData = await response.json();

            if (response.ok) {
                // Set a success flash message
                setFlashMessage('Signup successful!');
    
                // Handle successful signup, e.g., redirect to login page
                console.log('Signup successful:', responseData);
    
                // Assuming the backend sends an auth token, store it in local storage
                localStorage.setItem("auth_token", responseData.auth_token);
            } else {
                // Set an error flash message
                setFlashMessage('Signup failed. Please try again.');
    
                // Handle signup error
                console.error('Signup error:', responseData);
            }
        } catch (error) {
            // Set an error flash message
            setFlashMessage('Signup failed. Please try again.');
    
            // Handle other errors, network issues, etc.
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            {flashMessage && <p className={flashMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}>{flashMessage}</p>}
            <form>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSignup}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;


