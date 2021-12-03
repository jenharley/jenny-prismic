import React from 'react';
import { Typography } from '../Typography';
import { respondTo } from '../../utils/StyleUtil';
import Link from '@mui/material/Link';
import styled from 'styled-components';

const LighthouseImage = styled.img`
    max-width: 100%;

    ${respondTo('desktop')`
        max-width: 400px;
    `}
`;

const StyledInfo = styled.div`
    display: grid;
    padding: 10px;
    row-gap: 2rem;
    width: 325px;

    ${respondTo('desktop')`
        width: 525px;
    `}
`;

const Info = (props) => {
    const { info } = props;
    const { description, image, name } = info.properties;

    return (
        <StyledInfo>
            <Typography variant="h1" component="h1">{name}</Typography>
            <LighthouseImage src={image.url} alt="" />
            <Typography variant="bodyMedium">{description}</Typography>
            <Link
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${name}`}
                target="_new"
                underline="hover"
            >
                Learn more
            </Link>
        </StyledInfo>
    );
};

export default Info;
