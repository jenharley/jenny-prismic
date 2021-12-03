import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';

import { DefaultLayout, BackButton } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { useParams } from 'react-router-dom';

const Poster = ({ match }) => {
    const [prismicDoc, setPrismicDoc] = useState(null);
    const [notFound, toggleNotFound] = useState(false);

    const { uid } = useParams();

    useEffect(() => {
        const fetchPrismicData = async () => {
            try {
                const doc = await client.getByUID('poster', uid);

                if (doc) {
                    setPrismicDoc(doc);
                } else {
                    console.warn('Poster document was not found. Make sure it exists in your Prismic repository');
                    toggleNotFound(true);
                }
            } catch (error) {
                console.error(error);
                toggleNotFound(true);
            }
        };

        fetchPrismicData();
    }, [uid]);

    // Return the page if a document was retrieved from Prismic
    if (prismicDoc) {
        const title =
      prismicDoc.data.title.length !== 0
          ? RichText.asText(prismicDoc.data.title)
          : 'Untitled';

        return (
            <DefaultLayout wrapperClass="main" seoTitle={title}>
                <div className="outer-container">
                    <BackButton />
                    <h1>{title}</h1>
                    <img src={prismicDoc.data.full.url} alt={prismicDoc.data.full.alt} />
                </div>
            </DefaultLayout>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
};

export default Poster;
