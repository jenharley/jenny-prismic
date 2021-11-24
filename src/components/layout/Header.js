import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    display: flex;
    padding: 0 2rem;
    width: 100%;
`;

const Nav = styled.nav`
    display: flex;
    margin-left: auto;
`;

const NavList = styled.ul`
    display: flex;
    column-gap: 1rem;
`;

const NavListItem = styled.li``;

const NavLink = styled(Link)`
    color: #41294a;
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 2rem 0 2rem 1rem;
    text-decoration: none;
    text-transform: uppercase;

    span {
        position: relative;

        &::before {
            background-color: #ff2c54;
            bottom: -3px;
            content: '';
            height: 0;
            left: -3px;
            position: absolute;
            transition: all .25s ease;
            width: calc(100% + 6px);
            z-index: -1;
        }

        &:hover::before {
            height: 10px;
        }
    }
`;

const Header = () => {
    return (
        <StyledHeader>
            <Nav>
                <NavList>
                    <NavListItem>
                        <NavLink to="/">
                            <span>Home</span>
                        </NavLink>
                    </NavListItem>
                    {/* <NavListItem>
                        Work
                        <NavList>
                            <NavListItem>
                                <NavLink to="/posters">
                                    Posters
                                </NavLink>
                            </NavListItem>
                            <NavListItem>
                                <NavLink to="/lighthouses">
                                    Lighthouse Project
                                </NavLink>
                            </NavListItem>
                        </NavList>
                    </NavListItem> */}
                    <NavListItem>
                        <NavLink to="/posters">
                            <span>Posters</span>
                        </NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink to="/lighthouses">
                            <span>Lighthouse Project</span>
                        </NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink to="/blog">
                            <span>Blog</span>
                        </NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink to="/shop">
                            <span>Shop</span>
                        </NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink to="/about">
                            <span>About</span>
                        </NavLink>
                    </NavListItem>
                    <NavListItem>
                        <NavLink to="/contact">
                            <span>Contact</span>
                        </NavLink>
                    </NavListItem>
                </NavList>
            </Nav>
        </StyledHeader>
    )
}

export default Header;