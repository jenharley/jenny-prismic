import React from 'react';
import { respondTo } from '../../utils/StyleUtil';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import { mapboxToken } from '../../pages/Lighthouses';
import ReactMapGl, { Marker } from 'react-map-gl';
import { ICON, SIZE } from './Pins';

const Close = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px 20px 0 0;
`;

const Lighthouse = styled.img`
    display: block;
    max-width: 100%;
    min-width: 320px;
`;

const ModalInner = styled.div`
    align-self: center;
    max-width: 442px;
    width: 100%;
`;

const ModalMap = styled.div`
    ${respondTo('laptop', 'max', 'height')`
        grid-column: 1;
        grid-row: 2;
    `}
`;

const ModalName = styled.h3`
    color: #41294a;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.25em;
    padding: 1rem 2rem 2rem;

    ${respondTo('laptop', 'max', 'height')`
        grid-column: 1;
        grid-row: 1;
    `}
`;

const LighthousePopup = (props) => {
    const { lighthouse, onClick } = props;
    const [viewport, setViewport] = React.useState({
        longitude: lighthouse.geometry.coordinates[0],
        latitude: lighthouse.geometry.coordinates[1],
        zoom: 8
    });
    const url = `${lighthouse.properties.image.url} 2x`;

    return (
        <>
            <ModalInner>
                <Close>
                    <IconButton aria-label="Close" onClick={onClick}>
                        <CloseIcon />
                    </IconButton>
                </Close>
                <ModalName>{lighthouse.properties.name}</ModalName>
                <ModalMap>
                    <ReactMapGl scrollZoom={false} mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/dark-v10" height="150px" width="442px" {...viewport} onViewportChange={setViewport}>
                        <Marker longitude={lighthouse.geometry.coordinates[0]} latitude={lighthouse.geometry.coordinates[1]}>
                            <svg height={SIZE}
                                viewBox="0 0 24 24"
                                style={{
                                    cursor: 'pointer',
                                    fill: 'green',
                                    stroke: 'none',
                                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                                }}
                            >
                                <path d={ICON} stroke="#000" strokeOpacity="0.7" strokeWidth="2" />
                            </svg>
                        </Marker>
                    </ReactMapGl>
                </ModalMap>
                <Lighthouse src={url} alt={lighthouse.properties.name} />
            </ModalInner>
        </>
    );
};
export default LighthousePopup;
