import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.div`
    cursor: pointer;
    padding: 0.5rem 1rem;

    ${props => props.isActive && css`
        background-color: #eee;
        font-weight: 700;
    `}

    &:not(:last-child) {
        border-right: 1px solid #111;
    }

    &:first-child {
        border-radius: 4px 0 0 4px;
    }

    &:last-child {
        border-radius: 0 4px 4px 0;
    }
`;

const ViewOptions = styled.div`
    background: #fff;
    border: 2px solid #111;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    top: 160px;
    left: 30px;
    z-index: 1;
`;

const LighthouseViewToggle = (props) => {
    const { showGrid, onClick } = props;

    return (
        <ViewOptions>
            <Button isActive={showGrid} onClick={() => onClick(true)}>Grid</Button>
            <Button isActive={!showGrid} onClick={() => onClick(false)}>Map</Button>
        </ViewOptions>
    );
};

export default LighthouseViewToggle;
