import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Prismic from '@prismicio/client';
import { DefaultLayout } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { RichText } from 'prismic-reactjs';
import ReactMapGl, { Marker, Popup } from 'react-map-gl'
import mapboxgl from 'mapbox-gl';

const mapboxToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9 C20.1,15.8,20.2,15.8,20.2,15.7z`;
const SIZE = 20;

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
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
          onClick={() => onClick(lighthouse)}
        >
          <path d={ICON} />
        </svg>
      </Marker>
    )
  });
}

function CityInfo(props) {
  const {info} = props;
  const name = info.properties.name;

  return (
    <div>
      <div>
        {name} |{' '}
        <a
          target="_new"
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${name}`}
        >
          Wikipedia
        </a>
      </div>
      <img width={240} src={info.properties.image.url} alt="" />
    </div>
  );
}

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

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

  // Return the page if a document was retrieved from Prismic
  // let data = {};
  if (prismicData.lighthouses) {
    let features = [];
    prismicData.lighthouses.map(lighthouse => {
      const latitude = lighthouse.data.location.latitude;
      const longitude = lighthouse.data.location.longitude;
      const name = RichText.asText(lighthouse.data.name);
      features.push(
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [longitude, latitude]
          },
          "properties": {
            "name": name,
            "image": lighthouse.data.image
          }
        }
      )
      // data = {
      //   "type": "FeatureCollection",
      //   "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      //   "features": features
      // }
      // return data;
      return features;
    });

    return (
      <DefaultLayout seoTitle="Lighthouse Project">
        <ReactMapGl mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/streets-v11" {...viewport} onViewportChange={setViewport}>
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
              <CityInfo info={popupInfo} />
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
