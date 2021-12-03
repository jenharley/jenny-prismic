import React, { useEffect, useState } from 'react';
import { ICON, SIZE } from '../components/lighthouses/Pins';
import { respondTo } from '../utils/StyleUtil';
import 'mapbox-gl/dist/mapbox-gl.css';
import NotFound from './NotFound';
import Pins from '../components/lighthouses/Pins';
import Info from '../components/lighthouses/Info';
import Prismic from '@prismicio/client';
import ReactMapGl, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { DefaultLayout } from '../components';
import { RichText } from 'prismic-reactjs';
import { client } from '../utils/prismicHelpers';
import styled, { css } from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import MaxWidthContainer from '../components/MaxWidthContainer';

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

const ModalInner = styled.div`
    background: #fff;
    border-radius: 10px;
    display: grid;
    left: 50%;
    max-height: 100vh;
    max-width: 480px;
    overflow-y: auto;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    img {
        display: block;
        border-radius: 0 0 10px 10px;

        ${respondTo('laptop', 'max', 'height')`
            grid-column: 2;
            grid-row: 1 / 3;
        `}
    }

    ${respondTo('desktop')`
        max-width: 580px;
    `}

    ${respondTo('laptop', 'max', 'height')`
        grid-template-columns: 1fr 400px;
        grid-template-rows: 1fr 200px;
        max-width: 880px;
    `}
`;

const Name = styled.h3`
    color: #41294a;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.25em;
`;

const ModalMap = styled.div`
    ${respondTo('laptop', 'max', 'height')`
        grid-column: 1;
        grid-row: 2;
    `}
`;

const ModalName = styled(Name)`
    padding: 2rem;

    ${respondTo('laptop', 'max', 'height')`
        grid-column: 1;
        grid-row: 1;
    `}
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
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                        <MaxWidthContainer>
                            <LighthouseGrid>
                                {prismicData.lighthouses.map(lighthouse => {
                                    const { geometry, properties } = lighthouse;
                                    const { name, image } = properties;

                                    return (
                                        <li key={geometry.coordinates[0]} onClick={() => {handleOpen(); setModalData(lighthouse);}}>
                                            <img src={image.url} alt={name} />
                                            <Name>{name}</Name>
                                        </li>
                                    )
                                })}
                            </LighthouseGrid>
                        </MaxWidthContainer>
                    }
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>
                            {!!modalData &&
                                <Content lighthouse={modalData} />
                            }
                        </>
                    </Modal>
                </DefaultLayout>
            </>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
}

const Content = (props) => {
    const { lighthouse } = props;
    const [viewport, setViewport] = React.useState({
        longitude: lighthouse.geometry.coordinates[0],
        latitude: lighthouse.geometry.coordinates[1],
        zoom: 12
    });

    return (
        <ModalInner>
            <ModalName>{lighthouse.properties.name}</ModalName>
            <ModalMap>
                <ReactMapGl mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/dark-v10" height="300px" width="100%" {...viewport} onViewportChange={setViewport}>
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

export default Lighthouses;
