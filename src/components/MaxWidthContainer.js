import React from 'react';
import styled, { css } from 'styled-components';
import { respondTo } from '../utils/StyleUtil';

const Container = styled.div`
    display: grid;
    padding: 0 2rem;
    max-width: 1300px;
    width: 100%;

    ${props => props.max && css`
        max-width: ${props.max}px;
    `}

    ${respondTo('tablet')`
        margin-left: auto;
        margin-right: auto;
    `}
`;

export const MaxWidthContainer = (props) => {
    const { max } = props;

    return (
        <Container max={max}>
            {props.children}
        </Container>
    );
};
