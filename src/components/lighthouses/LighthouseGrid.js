import Dialog from '@mui/material/Dialog';
import LighthouseGridItem from './LighthouseGridItem';
import LighthousePopup from './LighthousePopup';
import { MaxWidthContainer } from '../MaxWidthContainer';
import React, { useState } from 'react';
import styled from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';
import { respondTo } from '../../utils/StyleUtil';
import { useTheme } from '@mui/material/styles';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-top: 100px;

    ${respondTo('mobile')`
        grid-template-columns: repeat(2, 1fr);
    `}

    ${respondTo('laptop')`
        grid-template-columns: repeat(3, 1fr);
    `}

    ${respondTo('desktop')`
        grid-template-columns: repeat(4, 1fr);
    `}

    li {
        cursor: pointer;
        list-style: none;
    }
`;

const Title = styled.h1`
    color: #41294a;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -.06em;
    padding: 5em 0 2em;
    text-align: center;

    ${respondTo('tablet')`
        font-size: 4rem;
    `}

    ${respondTo('desktop')`
        font-size: 8rem;
        padding: 2em 0 1em;
    `}
`;

const LighthouseGrid = (props) => {
    const { lighthouses } = props;
    const [modalData, setModalData] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = (lighthouse) => { setOpen(true); setModalData(lighthouse); };
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <MaxWidthContainer>
            <Title>Lighthouse Project</Title>
            <Grid>
                {lighthouses.map(lighthouse => (<LighthouseGridItem lighthouse={lighthouse} onClick={handleOpen} key={lighthouse.geometry.coordinates[0]} />))}
            </Grid>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
                {!!modalData &&
                    <LighthousePopup lighthouse={modalData} onClick={handleClose} />
                }
            </Dialog>
        </MaxWidthContainer>
    );
};

export default LighthouseGrid;
