import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import Prismic from '@prismicio/client';
import styled, { css } from 'styled-components';
import { DefaultLayout } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { Link } from 'react-router-dom';
import { linkResolver } from '../prismic-configuration';
import { respondTo } from '../utils/StyleUtil';
import { MaxWidthContainer } from '../components/MaxWidthContainer';
import { Title } from './BlogHome';

const ThumbnailTitle = styled.div`
    align-self: center;
    background-color: rgba(65,41,74,.8);
    bottom: 0;
    color: #fff;
    font-size: 26px;
    font-weight: 700;
    left: 0;
    opacity: 0;
    padding-top: calc(50% - 13px);
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    transition: all .5s cubic-bezier(.15,.7,.54,.99);
`;

const ThumbnailImage = styled.img`
    aspect-ratio: 1 / 1;
    transform: scale(1.1);
    transition: all .5s cubic-bezier(.15,.7,.54,.99);
`;

const Thumbnail = styled.div`
    overflow: hidden;
    position: relative;

    &:hover {
        ${ThumbnailTitle} {
            opacity: 1;
        }

        ${ThumbnailImage} {
            transform: scale(1.003);
        }
    }
`;

const PosterList = styled.div`
    display: grid;
    gap: 20px;

    ${respondTo('tablet')`
        grid-template-columns: repeat(2, 1fr);
    `}

    ${respondTo('laptop')`
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    `}
`;

const PosterThumbnail = props => {
    const { thumb } = props;

    return (
        <ThumbnailImage src={thumb.url} alt={thumb.alt} />
    );
};

const StyledPosterLink = styled(Link)`
    ${props => props.bigFeatured && props.featured && css`
        grid-column: 2;
        grid-row: 1 / span 2;
    `}
`;

export const PosterItem = (props) => {
    console.log(props.poster);
    const { featured, poster } = props;
    const title = RichText.asText(poster.data?.title);
    const thumb = poster.data.square;
    const bigFeatured = poster.tags.includes('big');

    return (
        <StyledPosterLink to={linkResolver(poster)} bigFeatured={bigFeatured} featured={featured}>
            <Thumbnail>
                <PosterThumbnail thumb={thumb} />
                <ThumbnailTitle>{title}</ThumbnailTitle>
            </Thumbnail>
        </StyledPosterLink>
    );
};

const Posters = (props) => {
    const { posters } = props;

    return (
        <MaxWidthContainer>
            <PosterList>
                {posters.map((poster) => (
                    <PosterItem poster={poster} key={poster.id} />
                ))}
            </PosterList>
        </MaxWidthContainer>
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
                    { orderings: '[my.post.date desc]', pageSize: 100 }
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
        };

        fetchPrismicData();
    }, []);

    // Return the page if a document was retrieved from Prismic
    if (prismicData.posters) {
        const posters = prismicData.posters;

        return (
            <DefaultLayout seoTitle="Poster Gallery | Jen Harley">
                <Title>
                    Poster Gallery
                </Title>
                <Posters posters={posters} />
            </DefaultLayout>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
};

export default PosterGallery;
