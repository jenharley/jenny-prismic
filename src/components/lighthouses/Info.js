import React from 'react';
import { Typography } from '../Typography';
import { respondTo } from '../../utils/StyleUtil';
import Link from '@mui/material/Link';
import styled from 'styled-components';

const LighthouseImage = styled.img`
    background: #eee;
    height: 260px;
    width: 260px;

    ${respondTo('mobile')`
        height: 425px;
        width: 425px;
    `}
`;

const StyledInfo = styled.div`
    display: grid;
    padding: 10px;
    row-gap: 2rem;
    width: calc(100% - 20px);

    ${respondTo('mobile')`
        width: calc(100% - 80px);
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
