import React from 'react';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { flatten, zip } from 'lodash';
import Hamburger from '../Hamburger';

export const BREAKPOINTS = {
    mobile: 480,
    mobileVertical: 760,
    tablet: 860,
    laptop: 1154,
    desktop: 1472,
    widescreen: 2000,
};

export const respondTo = ( key, direction, dimension) => {
    return (style, ...variables) =>
        `@media (${direction ? direction : 'min'}-${dimension ? dimension : 'width'
        }: ${BREAKPOINTS[key]}px) { ${flatten(zip(style, variables)).join('')} }`;
};

const StyledHeader = styled.header`
    display: grid;
    padding: 0 2rem;
    width: 100%;
`;

const Nav = styled.nav`
    ${respondTo('tablet')`
        display: flex;
        margin-left: auto;
    `}
`;

const NavList = styled.ul`
    display: none;
    justify-content: center;
    row-gap: 1rem;
    padding-top: 1rem;

    ${respondTo('tablet')`
        display: flex;
        column-gap: 1rem;
        padding-top: 0;
    `}

    ${props => props.isNavOpen && css`
        display: grid;
    `}
`;

const NavListItem = styled.li``;

const Toggle = styled.div`
    ${respondTo('tablet')`
        display: none;
    `}
`;

const StyledLink = styled(NavLink)`
    color: #41294a;
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    padding: 2rem 0 2rem 1rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;

    ${respondTo('tablet')`
        text-align: left;
    `}

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

export function isMobileWidth(windowWidth) {
    return windowWidth < 860;
}

const Header = () => {
    useEffect(() => {
        window.addEventListener('resize', throttledHandleWindowResize);
        return () => window.removeEventListener('resize', throttledHandleWindowResize);
    });

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavOpen = () => {
        const isWidthMobile = isMobileWidth(document.documentElement.clientWidth);
        if (isNavOpen && isWidthMobile) {
            setIsNavOpen(false);
            document.body.classList.remove('no-scroll');
        } else if (!isNavOpen && isWidthMobile) {
            setIsNavOpen(true);
            document.body.classList.add('no-scroll');
        } else if (isNavOpen && !isWidthMobile) {
            setIsNavOpen(false);
            document.body.classList.remove('no-scroll');
        } else if (!isNavOpen && !isWidthMobile) {
            document.body.classList.remove('no-scroll');
        }
    };

    const throttledHandleWindowResize = () => {
        const isWidthMobile = isMobileWidth(document.documentElement.clientWidth);
        if (!isWidthMobile) {
            setIsNavOpen(false);
            document.body.classList.remove('no-scroll');
        } else if (isWidthMobile && isNavOpen) {
            document.body.classList.add('no-scroll');
        }
    };

    return (
        <StyledHeader>
            <Nav>
                <Toggle onClick={toggleNavOpen} isNavOpen={isNavOpen} aria-expanded={isNavOpen}><Hamburger isNavOpen={isNavOpen} /></Toggle>
                <NavList isNavOpen={isNavOpen}>
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