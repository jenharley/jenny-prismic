import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Prismic from '@prismicio/client';
import { DefaultLayout } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { RichText } from 'prismic-reactjs';
import ReactMapGl, {Marker} from 'react-map-gl'

const mapboxToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Lighthouses = () => {
  const [prismicData, setPrismicData] = useState({ lighthouses: null });
  const [notFound, toggleNotFound] = useState(false);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  // Get the homepage and blog post documents from Prismic
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
  if (prismicData.lighthouses) {
    return (
      <DefaultLayout seoTitle="Lighthouse Project">
        <ReactMapGl mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/streets-v11">
          {prismicData.lighthouses.map(lighthouse => {
            console.log(lighthouse)
            const latitude = lighthouse.data.location.latitude;
            const longitude = lighthouse.data.location.longitude;
            return (
              <Marker latitude={latitude} longitude={longitude} key={lighthouse.id} onViewportChange={nextViewport => setViewport(nextViewport)} {...viewport}>{RichText.asText(lighthouse.data.name)}</Marker> 
            )
          })}
        </ReactMapGl>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
}

export default Lighthouses;
