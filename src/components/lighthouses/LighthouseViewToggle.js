import React from 'react';
import { respondTo } from '../../utils/StyleUtil';
import styled, { css } from 'styled-components';

const Button = styled.div`
    cursor: pointer;
    padding: 1rem 2rem;
    text-align: center;

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

    ${respondTo('desktop')`
        padding: 0.5rem 1rem;
    `}
`;

const ViewOptions = styled.div`
    background: #fff;
    border: 2px solid #111;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 20px;
    position: absolute;
    width: calc(100% - 40px);
    z-index: 1;

    ${respondTo('tablet')`
        max-width: 400px;
        top: 160px;
        left: 30px;
        width: auto;
    `}
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
