import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

const StyledLink = styled(NavLink)`
    color: #41294a;
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 2rem 0 2rem 1rem;
    text-decoration: none;
    text-transform: uppercase;

    &.active span::before {
        height: 10px;
    }

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
                        <StyledLink to="/" text="Home">
                            <span>Home</span>
                        </StyledLink>
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
                        <StyledLink to="/posters"><span>Poster</span></StyledLink>
                    </NavListItem>
                    <NavListItem>
                        <StyledLink to="/lighthouses"><span>Lighthouse Project</span></StyledLink>
                    </NavListItem>
                    <NavListItem>
                        <StyledLink to="/blog"><span>Blog</span></StyledLink>
                    </NavListItem>
                    <NavListItem>
                        <StyledLink to="/shop"><span>Shop</span></StyledLink>
                    </NavListItem>
                    <NavListItem>
                        <StyledLink to="/about"><span>About</span></StyledLink>
                    </NavListItem>
                    <NavListItem>
                        <StyledLink to="/contact"><span>Contact</span></StyledLink>
                    </NavListItem>
                </NavList>
            </Nav>
        </StyledHeader>
    )
}

export default Header;