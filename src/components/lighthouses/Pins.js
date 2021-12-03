import * as React from 'react';
import { Marker } from 'react-map-gl'

export const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9 C20.1,15.8,20.2,15.8,20.2,15.7z`;
export const SIZE = 20;

function Pins(props) {
    const {data, onClick} = props;

    return data.map((lighthouse, index) => {
    const latitude = lighthouse.geometry.coordinates[1];
    const longitude = lighthouse.geometry.coordinates[0];

    return (
        <Marker key={`marker-${index}`} longitude={longitude} latitude={latitude}>
            <svg
                height={SIZE}
                viewBox="0 0 24 24"
                style={{
                cursor: 'pointer',
                fill: lighthouse.properties.fill,
                stroke: 'none',
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                }}
                onClick={() => onClick(lighthouse)}
            >
                <path d={ICON} stroke="#000" strokeOpacity="0.7" strokeWidth="2" />
            </svg>
        </Marker>
    )
    });
}

export default React.memo(Pins);
