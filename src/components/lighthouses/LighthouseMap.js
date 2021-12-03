import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Info from './Info';
import Pins from './Pins';
import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';
import styled, { css } from 'styled-components';
import { mapboxToken } from '../../pages/Lighthouses';
import { respondTo } from '../../utils/StyleUtil';

const Container = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
`;

const Drawer = styled.div`
    background: #fff;
    height: calc(100vh - 110px);
    overflow-y: auto;
    padding: 2rem;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(389px);
    transition: transform 300ms ease-in;
    width: 389px;
    z-index: 3;

    ${respondTo('desktop')`
        transform: translateX(589px);
        width: 589px;
    `}

    ${props => props.isOpen && css`
        transform: translateX(0);

        ${respondTo('desktop')`
            transform: translateX(0);
        `}
    `}
`;

const LighthouseMap = (props) => {
    const { lighthouses } = props;

    const [popupInfo, setPopupInfo] = useState(null);
    const [viewport, setViewport] = useState({
        height: 'calc(100vh - 110px)',
        latitude: 44.912879,
        longitude: -84.7586996,
        width: 'fit',
        zoom: 6
    });

    return (
        <Container>
            <ReactMapGl scrollZoom={false} mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/dark-v10" {...viewport} onViewportChange={nextViewport => setViewport({ ...nextViewport, width: 'fit' })}>
                <Pins data={lighthouses} onClick={setPopupInfo} />
            </ReactMapGl>
            <Drawer
                isOpen={!!popupInfo}
                onClose={setPopupInfo}
            >
                <IconButton aria-label="Close" onClick={() => setPopupInfo(null)}>
                    <CloseIcon />
                </IconButton>
                {popupInfo && <Info info={popupInfo} />}
            </Drawer>
        </Container>
    );
};

export default LighthouseMap;
