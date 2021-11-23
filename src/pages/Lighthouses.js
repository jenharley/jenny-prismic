import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import NotFound from './NotFound';
import Pins from '../components/lighthouses/Pins';
import Info from '../components/lighthouses/Info';
import Prismic from '@prismicio/client';
import ReactMapGl, { Popup } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { DefaultLayout } from '../components';
import { RichText } from 'prismic-reactjs';
import { client } from '../utils/prismicHelpers';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const mapboxToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Lighthouses = () => {
  const [prismicData, setPrismicData] = useState({ lighthouses: null });
  const [notFound, toggleNotFound] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 44.912879,
    longitude: -84.7586996,
    width: '100vw',
    height: '100vh',
    zoom: 6
  });

  useEffect(() => {
    const fetchPrismicData = async () => {
      try {
        const lighthouses = await client.query(
          Prismic.Predicates.at('document.type', 'lighthouse'),
          { orderings: '[my.post.date desc]' }
        );
  
        if (lighthouses) {
          setPrismicData({ lighthouses: lighthouses.results });
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
    let features = [];
    prismicData.lighthouses.map(lighthouse => {
      const latitude = lighthouse.data.location.latitude;
      const longitude = lighthouse.data.location.longitude;
      const name = RichText.asText(lighthouse.data.name);
      const description = RichText.asText(lighthouse.data.description);
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
            "description": description
          }
        }
      )
      return features;
    });

    return (
      <DefaultLayout seoTitle="Lighthouse Project">
        <ReactMapGl mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/dark-v10" {...viewport} onViewportChange={setViewport}>
          <Pins data={features} onClick={setPopupInfo} />
          {popupInfo && (
            <Popup
              tipSize={5}
              anchor="top"
              longitude={popupInfo.geometry.coordinates[0]}
              latitude={popupInfo.geometry.coordinates[1]}
              closeOnClick={false}
              onClose={setPopupInfo}
            >
              <Info info={popupInfo} />
            </Popup>
          )}
        </ReactMapGl>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
}

export default Lighthouses;
