import React from 'react';
import { respondTo } from '../../utils/StyleUtil';
import styled from 'styled-components';
import { mapboxToken } from '../../pages/Lighthouses';
import ReactMapGl, { Marker } from 'react-map-gl';
import { ICON, SIZE } from './Pins';

const ModalInner = styled.div`
    img {
        display: block;
    }
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
    padding: 2rem;

    ${respondTo('laptop', 'max', 'height')`
        grid-column: 1;
        grid-row: 1;
    `}
`;

const LighthousePopup = (props) => {
    const { lighthouse } = props;
    const [viewport, setViewport] = React.useState({
        longitude: lighthouse.geometry.coordinates[0],
        latitude: lighthouse.geometry.coordinates[1],
        zoom: 8
    });

    return (
        <ModalInner>
            <ModalName>{lighthouse.properties.name}</ModalName>
            <ModalMap>
                <ReactMapGl scrollZoom={false} mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/dark-v10" height="150px" width="100%" {...viewport} onViewportChange={setViewport}>
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
            <img src={lighthouse.properties.image.url} alt={lighthouse.properties.name} />
        </ModalInner>
    );
};
export default LighthousePopup;
