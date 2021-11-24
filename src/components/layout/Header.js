import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    {/* <li>
                        Work
                        <ul>
                            <li>
                                <Link to="/posters">
                                    Posters
                                </Link>
                            </li>
                            <li>
                                <Link to="/lighthouses">
                                    Lighthouse Project
                                </Link>
                            </li>
                        </ul>
                    </li> */}
                    <li>
                        <Link to="/posters">
                            Posters
                        </Link>
                    </li>
                    <li>
                        <Link to="/lighthouses">
                            Lighthouse Project
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/shop">
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;