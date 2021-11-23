import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import Prismic from '@prismicio/client';
import styled from 'styled-components';
import { DefaultLayout } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { Link } from 'react-router-dom';
import { linkResolver } from '../prismic-configuration';

const PosterThumbnail = props => {
  const { thumb } = props;
  console.log(thumb);

  return (
    <img src={thumb.url} alt={thumb.alt} />
  );
};

const Thumbnail = styled.div`
  max-width: 200px;
`;

const PosterItem = (props) => {
  const { poster } = props;
  const title = RichText.asText(poster.data?.title);
  const thumb = poster.data.thumb

  return (
    <Link to={linkResolver(poster)}>
      <Thumbnail>
        {title}
        <PosterThumbnail thumb={thumb} />
      </Thumbnail>
    </Link>
  );
};

const Posters = (props) => {
  const { posters } = props;

  return (
    <>
      {posters.map((poster) => (
        <PosterItem poster={poster} key={poster.id} />
      ))}
    </>
  );
};

const PosterGallery = () => {
  const [prismicData, setPrismicData] = useState({ posters: null });
  const [notFound, toggleNotFound] = useState(false);

  // Get the homepage and blog post documents from Prismic
  useEffect(() => {
    const fetchPrismicData = async () => {
      try {
        const posters = await client.query(
          Prismic.Predicates.at('document.type', 'poster'),
          { orderings: '[my.post.date desc]' }
        );
  
        if (posters) {
          setPrismicData({ posters: posters.results });
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
  if (prismicData.posters) {
    const posters = prismicData.posters;

    return (
      <DefaultLayout seoTitle="Poster Gallery">
        <h1>
          Poster Gallery
        </h1>
        <Posters posters={posters} />
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
}

export default PosterGallery;
