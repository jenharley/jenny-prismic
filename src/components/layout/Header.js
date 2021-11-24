import React from 'react';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger';
import { isMobileWidth, respondTo } from '../../utils/StyleUtil';

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
        background: #fff;
        display: grid;
        grid-auto-rows: min-content;
        left: 0;
        min-height: calc(100vh - 56px);
        overflow-y: auto;
        position: absolute;
        right: 0;
        top: 56px;
        z-index: 1;
    `}
`;
const StyledHeader = styled.header`
    display: grid;
    padding: 1rem;
    width: 100%;

    ${respondTo('tablet')`
        padding: 0 2rem;
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
        z-index: 2;

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

const Toggle = styled.div`
    ${respondTo('tablet')`
        display: none;
    `}
`;

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
                    <li>
                        <StyledLink to="/"><span>Home</span></StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/posters"><span>Posters</span></StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/lighthouses"><span>Lighthouse Project</span></StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/blog"><span>Blog</span></StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/shop"><span>Shop</span></StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/about"><span>About</span></StyledLink>
                    </li>
                    <li>
                        <StyledLink to="/contact"><span>Contact</span></StyledLink>
                    </li>
                </NavList>
            </Nav>
        </StyledHeader>
    );
};

export default Header;