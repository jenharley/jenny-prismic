import 'mapbox-gl/dist/mapbox-gl.css';
import LighthouseGrid from '../components/lighthouses/LighthouseGrid';
import LighthouseMap from '../components/lighthouses/LighthouseMap';
import LighthouseViewToggle from '../components/lighthouses/LighthouseViewToggle';
import NotFound from './NotFound';
import Prismic from '@prismicio/client';
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { DefaultLayout } from '../components';
import { client } from '../utils/prismicHelpers';
import { toFeatureJson } from '../utils/LighthouseUtil';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
export const mapboxToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Lighthouses = () => {
    const [prismicData, setPrismicData] = useState({ lighthouses: null });
    const [notFound, toggleNotFound] = useState(false);
    const [showGrid, setShowGrid] = useState(false);

    useEffect(() => {
        const fetchPrismicData = async () => {
            try {
                const lighthouses = await client.query(
                    Prismic.Predicates.at('document.type', 'lighthouse'),
                    { orderings: '[my.lighthouse.name]', pageSize: 200 }
                );

                if (lighthouses) {
                    const features = toFeatureJson(lighthouses);
                    setPrismicData({ lighthouses: features });
                } else {
                    console.warn('Blog Home document was not found. Make sure it exists in your Prismic repository');
                    toggleNotFound(true);
                }
            } catch (error) {
                console.error(error);
                toggleNotFound(true);
            }
        };

        fetchPrismicData();
    }, []);

    if (prismicData.lighthouses) {
        return (
            <>
                <DefaultLayout seoTitle="Lighthouse Project" hideFooter={!showGrid}>
                    <LighthouseViewToggle onClick={setShowGrid} showGrid={showGrid} />
                    {!showGrid &&
                        <LighthouseMap lighthouses={prismicData.lighthouses} />
                    }
                    {showGrid &&
                        <LighthouseGrid lighthouses={prismicData.lighthouses} />
                    }
                </DefaultLayout>
            </>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
};

export default Lighthouses;
