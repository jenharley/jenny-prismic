import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';

import { DefaultLayout, SliceZone } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { useParams } from 'react-router-dom';
import { MaxWidthContainer } from '../components/MaxWidthContainer';
import { Typography } from '../components/Typography';

/**
 * Blog post page component
 */
const Post = () => {
    const [prismicDoc, setPrismicDoc] = useState(null);
    const [notFound, toggleNotFound] = useState(false);

    const { uid } = useParams();

    // Get the blog post document from Prismic
    useEffect(() => {
        const fetchPrismicData = async () => {
            try {
                const doc = await client.getByUID('blog_post', uid);

                if (doc) {
                    setPrismicDoc(doc);
                } else {
                    console.warn('Blog post document was not found. Make sure it exists in your Prismic repository');
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
            <DefaultLayout seoTitle={title}>
                <MaxWidthContainer max={800}>
                    <Typography variant="h1" as="h1">{title}</Typography>
                    <SliceZone sliceZone={prismicDoc.data.body} />
                </MaxWidthContainer>
            </DefaultLayout>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
};

export default Post;
