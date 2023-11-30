import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <a className="text-white text-lg font-bold" href="/">
                    📚 Cute Reading List
                </a>
                <div className="ml-auto">
                    <ul className="flex space-x-4">
                        <li>
                            <a className="text-white" href="/home">
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="text-white" href="/reading-list">
                                Reading List
                            </a>
                        </li>
                        <li>
                            <a className="text-white" href="/login">
                                Login
                            </a>
                        </li>
                        <li>
                            <a className="text-white" href="/signup">
                                Sign Up
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

