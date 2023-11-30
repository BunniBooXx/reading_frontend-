import React, { useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flashMessage, setFlashMessage] = useState('');

    console.log('BACKEND_URL', BACKEND_URL)

    const handleLogin = async () => {
        try {
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

            const response = await fetch(`${BACKEND_URL}/auth/login`, requestOptions);
            const responseData = await response.json();

            if (response.ok) {
                // Handle successful login, e.g., store JWT in local storage
                console.log('Login successful:', responseData);

                localStorage.setItem('auth_token', responseData.token)
            } else {
                // Handle login error
                console.error('Login error:', responseData.message);
                setFlashMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            // Handle other errors, network issues, etc.
            console.error('Login error:', error);
            setFlashMessage('Error during login. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {flashMessage && <p className="text-red-600">{flashMessage}</p>}
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
                    onClick={handleLogin}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

