import Dialog from '@mui/material/Dialog';
import LighthouseGridItem from './LighthouseGridItem';
import LighthousePopup from './LighthousePopup';
import MaxWidthContainer from '../MaxWidthContainer';
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
            <Grid>
                {lighthouses.map(lighthouse => (<LighthouseGridItem lighthouse={lighthouse} onClick={handleOpen} key={lighthouse.geometry.coordinates[0]} />))}
            </Grid>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} >
                {!!modalData &&
                    <LighthousePopup lighthouse={modalData} />
                }
            </Dialog>
        </MaxWidthContainer>
    );
};

export default LighthouseGrid;
