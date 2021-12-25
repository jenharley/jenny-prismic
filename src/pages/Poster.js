import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';

import { DefaultLayout } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import MaxWidthContainer from '../components/MaxWidthContainer';
import moment from 'moment';

const PosterContainer = styled.div`
`;

const Title = styled.div`
    color: #41294a;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -.06em;
`;

const Date = styled.div`
    color: #ff2c54;
    font-size: 1rem;
    font-weight: 700;
`;

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
        const date = moment(prismicDoc.data.date).format('MMMM D, YYYY');
        const title = prismicDoc.data.title.length !== 0 ? RichText.asText(prismicDoc.data.title) : 'Untitled';

        return (
            <DefaultLayout wrapperClass="main" seoTitle={title}>
                <MaxWidthContainer>
                    <Grid container spacing={{ xs: 3, md: 4 }}>
                        <Grid container item xs={12} sx={{ display: { md: 'none' } }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Title>{title}</Title>
                                </Grid>
                                <Grid item xs={12}>
                                    <Date>{date}</Date>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <PosterContainer>
                                <img src={prismicDoc.data.full.url} alt={prismicDoc.data.full.alt} />
                            </PosterContainer>
                        </Grid>
                        <Grid container item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Title>{title}</Title>
                                </Grid>
                                <Grid item xs={12}>
                                    <Date>{date}</Date>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MaxWidthContainer>
            </DefaultLayout>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
};

export default Poster;
