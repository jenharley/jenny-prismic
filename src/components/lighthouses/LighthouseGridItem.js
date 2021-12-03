import styled from 'styled-components';
import React from 'react';

const Name = styled.h3`
    color: #41294a;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.25em;
`;

const LighthouseGridItem = (props) => {
    const { lighthouse, onClick } = props;
    const { geometry, properties } = lighthouse;
    const { name, image } = properties;

    return (
        <li key={geometry.coordinates[0]} onClick={() => { onClick(lighthouse); }}>
            <img src={image.url} alt={name} />
            <Name>{name}</Name>
        </li>
    );
};

export default LighthouseGridItem;
