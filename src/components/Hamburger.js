import * as React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    display: inline-grid;
    margin: 0;
    outline: 0;
    padding: 2rem 0;
    text-transform: none;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
    transition-timing-function: linear;

    &:hover {
        opacity: 0.9;
    }

    ${props => props.isNavOpen && css`
        ${Inner} {
            transform: translate3d(0, -10px, 0) rotate(-45deg);
            transition-delay: 0.22s;
            transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        ${Inner}::after {
            top: 0;
            opacity: 0;
            transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333), opacity 0.1s 0.22s linear;
        }

        ${Inner}::before {
            top: 0;
            transform: rotate(-90deg);
            transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333), transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        ${Inner},
        ${Inner}::before,
        ${Inner}::after {
            background-color: #333;
        }
    `};
`;

const Box = styled.span`
    display: inline-grid;
    height: 24px;
    position: relative;
    width: 30px;
`;

const Inner = styled.span`
    background-color: #333;
    border-radius: 4px;
    bottom: 0;
    display: block;
    height: 4px;
    margin-top: -2px;
    position: absolute;
    top: auto;
    transition-delay: 0.13s;
    transition-duration: 0.13s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    width: 30px;

    &::before,
    &::after {
        background-color: #333;
        border-radius: 4px;
        height: 4px;
        position: absolute;
        width: 30px;
    }

    &::before,
    &::after {
        content: " ";
        display: block;
    }

    &::before {
        transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        top: -10px;
    }

    &::after {
        transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1), opacity 0.1s linear;
        top: -20px;
    }
`;

const Hamburger = props => {
    return (
        <Button type="button" {...props}>
            <Box>
                <Inner />
            </Box>
        </Button>
    );
};

export default Hamburger;
