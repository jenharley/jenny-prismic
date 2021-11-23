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
                    <li>
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
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;