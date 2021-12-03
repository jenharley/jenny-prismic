import * as React from 'react';
import { Marker } from 'react-map-gl';
import { ICON, SIZE } from './Pins';

function Pin (props) {
    const { lighthouse } = props;
    const latitude = lighthouse.geometry.coordinates[1];
    const longitude = lighthouse.geometry.coordinates[0];

    return (
        <Marker longitude={longitude} latitude={latitude}>
            <svg height={SIZE}
                viewBox="0 0 24 24"
                style={{
                    cursor: 'pointer',
                    fill: lighthouse.properties.fill,
                    stroke: 'none',
                    transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
            >
                <path d={ICON} stroke="#000" strokeOpacity="0.7" strokeWidth="2" />
            </svg>
        </Marker>
    );
};

export default React.memo(Pin);
