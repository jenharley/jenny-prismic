import React, { useEffect, useState } from 'react';
import { respondTo } from '../utils/StyleUtil';
import 'mapbox-gl/dist/mapbox-gl.css';
import NotFound from './NotFound';
import Pins from '../components/lighthouses/Pins';
import Info from '../components/lighthouses/Info';
import Prismic from '@prismicio/client';
import ReactMapGl from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { DefaultLayout } from '../components';
import { RichText } from 'prismic-reactjs';
import { client } from '../utils/prismicHelpers';
import styled, { css } from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const mapboxToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Button = styled.div`
    cursor: pointer;
    padding: 0.5rem 1rem;

    ${props => props.isActive && css`
        background-color: #eee;
        font-weight: 700;
    `}

    &:not(:last-child) {
        border-right: 1px solid #111;
    }

    &:first-child {
        border-radius: 4px 0 0 4px;
    }

    &:last-child {
        border-radius: 0 4px 4px 0;
    }
`;

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

const LighthouseGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding-top: 100px;

    li {
        list-style: none;
    }
`;

const ViewOptions = styled.div`
    background: #fff;
    border: 2px solid #111;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: absolute;
    top: 160px;
    left: 30px;
    z-index: 1;
`;

const Lighthouses = () => {
    const [prismicData, setPrismicData] = useState({ lighthouses: null });
    const [notFound, toggleNotFound] = useState(false);
    const [popupInfo, setPopupInfo] = useState(null);
    const [showGrid, setShowGrid] = React.useState(false)
    const [viewport, setViewport] = useState({
        height: 'calc(100vh - 110px)',
        latitude: 44.912879,
        longitude: -84.7586996,
        width: "fit",
        zoom: 6
    });

    useEffect(() => {
        const fetchPrismicData = async () => {
            try {
                const lighthouses = await client.query(
                Prismic.Predicates.at('document.type', 'lighthouse'),
                    { orderings: '[my.post.date desc]', pageSize: 100 }
                );
        
                if (lighthouses) {
                    let features = [];
                    lighthouses.results.map(lighthouse => {
                        const latitude = lighthouse.data.location.latitude;
                        const longitude = lighthouse.data.location.longitude;
                        const name = RichText.asText(lighthouse.data.name);
                        const description = RichText.asText(lighthouse.data.description);
                        const colors = ['#f0b8b8', '#aecdc2', '#665191', '#a05195', '#88c9d4', '#d45087', '#f95d6a', '#ff7c43', '#ffa600' ];
                        const fill = colors[Math.floor(Math.random() * colors.length)];

                        features.push(
                            {
                                "type": "Feature",
                                "geometry": {
                                "type": "Point",
                                "coordinates": [longitude, latitude]
                                },
                                "properties": {
                                    "name": name,
                                    "image": lighthouse.data.image,
                                    "description": description,
                                    "fill": fill
                                }
                            }
                        )
                        return features;
                    })
                    setPrismicData({ lighthouses: features });
                } else {
                    console.warn('Blog Home document was not found. Make sure it exists in your Prismic repository');
                    toggleNotFound(true);
                    }
            } catch (error) {
                console.error(error);
                toggleNotFound(true);
            }
        }

        fetchPrismicData();
    }, []);

    if (prismicData.lighthouses) {
        return (
            <>
                <DefaultLayout seoTitle="Lighthouse Project" hideFooter={!showGrid}>
                    <ViewOptions>
                        <Button isActive={showGrid} onClick={() => setShowGrid(true)}>Grid</Button>
                        <Button isActive={!showGrid} onClick={() => setShowGrid(false)}>Map</Button>
                    </ViewOptions>
                    {!showGrid &&
                        <Container>
                            <ReactMapGl scrollZoom={false} mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/dark-v10" {...viewport} onViewportChange={nextViewport => setViewport({ ...nextViewport, width: "fit" })}>
                                <Pins data={prismicData.lighthouses} onClick={setPopupInfo} />
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
                    }
                    {showGrid &&
                        <LighthouseGrid>
                            {prismicData.lighthouses.map(lighthouse => {
                                const { geometry, properties } = lighthouse;
                                const { name, image } = properties;

                                return (
                                    <li key={geometry.coordinates[0]}>
                                        <img src={image.url} alt={name} />
                                        {name}
                                    </li>
                                )
                            })}

                        </LighthouseGrid>
                    }
                </DefaultLayout>
            </>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
}

export default Lighthouses;
