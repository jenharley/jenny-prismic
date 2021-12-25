import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BottomShadow = styled.span`
    background-color: #41ebdf;
    bottom: -5px;
    height: calc(100% + 5px);
    position: absolute;
    right: -5px;
    transition: all .6s ease-out .1s;
    width: calc(100% + 5px);
`;

const ButtonText = styled.span`
    background-color: inherit;
    padding: 16px 52px;
    position: relative;
    z-index: 2;
`;

const TopShadow = styled.span`
    background-color: #ff2c54;
    height: calc(100% + 5px);
    left: -5px;
    position: absolute;
    top: -5px;
    transition: all .4s ease-out;
    width: calc(100% + 5px);
    z-index: 1;
`;

const StyledLink = styled(Link)`
    background-color: #41294a;
    color: #fff;
    display: inline-grid;
    font-family: Montserrat,sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: .03em;
    line-height: 1.5em;
    outline: 0;
    position: relative;
    text-decoration: none;
    text-transform: uppercase;
    vertical-align: middle;

    &:hover {
        ${BottomShadow} {
            transform: translate(-5px,-5px);
        }

        ${TopShadow} {
            transform: translate(5px,5px);
        }
    }
`;

export const Button = (props) => {
    const { text, to } = props;

    return (
        <StyledLink to={to}>
            <TopShadow />
            <ButtonText>{text}</ButtonText>
            <BottomShadow />
        </StyledLink>
    );
};
