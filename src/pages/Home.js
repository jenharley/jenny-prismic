import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import Prismic from '@prismicio/client';
import styled from 'styled-components';
import { DefaultLayout } from '../components';
import NotFound from './NotFound';
import { client } from '../utils/prismicHelpers';
import { Link } from 'react-router-dom';
import { linkResolver } from '../prismic-configuration';
import { PosterItem } from './Posters';
import { respondTo } from '../utils/StyleUtil';
import { MaxWidthContainer } from '../components/MaxWidthContainer';
import { Button } from '../components/button';
import { Grid } from '@mui/material';
import moment from 'moment';
import { Date, Dateline, ReadMore, TagList, truncate } from './BlogHome';

const Post = styled(Link)`
    text-decoration: none;
`;

const BlogDescription = styled.p`
    color: #41294a;
    font-size: 18px;
    line-height: 1.55;
`;

const BlogTitle = styled.h2`
    color: #41294a;
    font-size: 32px;
    font-weight: 500;
`;

const PostItem = (props) => {
    const { post } = props;
    const { data } = post;
    const { body, publish_date, tags, title } = data;
    const blog_title = RichText.asText(title);
    const description = RichText.asText(body[0].primary.blog_post_body);
    const date = moment(publish_date).format('MMM D, YYYY');

    return (
        <Post to={linkResolver(post)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BlogTitle>{blog_title}</BlogTitle>
                </Grid>
                <Grid item xs={12}>
                    <BlogDescription>{truncate(description, 120)}</BlogDescription>
                </Grid>
                <Grid item xs={12}>
                    <Dateline>
                        <Date>{date}</Date>
                        {tags && <TagList tags={tags} />}
                        <ReadMore to={linkResolver(post)}>Read More</ReadMore>
                    </Dateline>
                </Grid>
            </Grid>
        </Post>
    );
};

const FeaturedBlog = styled.div`
    align-items: flex-end;
    display: grid;
    gap: 3rem;
    margin-top: 8rem;

    ${respondTo('tablet')`
        grid-template-columns: repeat(3, 1fr);
    `}
`;

const FeaturedBlogTitle = styled.div`
    align-self: center;
    color: #ff2c54;
    font-family: Montserrat,sans-serif;
    font-size: 120px;
    font-weight: 700;
    letter-spacing: -.04em;
    line-height: .833em;
    margin-bottom: 20px;
`;

const BlogPosts = (props) => {
    const { posts } = props;

    return (
        <FeaturedBlog>
            <FeaturedBlogTitle>
                Blog
            </FeaturedBlogTitle>
            {posts.slice(0, 2).map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </FeaturedBlog>
    );
};

const PosterGrid = styled.div`
    display: grid;
    gap: 1.5rem;

    ${respondTo('tablet')`
        grid-template-columns: 1fr 2.1fr 1fr;
        grid-template-rows: repeat(2, 1fr);

        a:nth-child(3) {
            grid-column: 2;
            grid-row: 1 / span 2;
        }
    `}
`;

const FeaturedPosters = (props) => {
    const { posters } = props;

    return (
        <PosterGrid>
            {posters.map((poster) => (
                <PosterItem poster={poster} key={poster.id} />
            ))}
        </PosterGrid>
    );
};

const Home = () => {
    const [prismicData, setPrismicData] = useState({ homeDoc: null, posters: null, blog_posts: null });
    const [notFound, toggleNotFound] = useState(false);

    // Get the homepage and blog post documents from Prismic
    useEffect(() => {
        const fetchPrismicData = async () => {
            try {
                const homeDoc = await client.getSingle('page');
                const blogPosts = await client.query(
                    Prismic.Predicates.at('document.type', 'blog_post'),
                    { orderings: '[my.post.date desc]' }
                );
                const posters = await client.query(
                    Prismic.Predicates.at('document.tags', ['featured'],
                        { orderings: '[my.post.date desc]' })
                );

                if (homeDoc) {
                    setPrismicData({ homeDoc, posters: posters.results, blog_posts: blogPosts.results });
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
    if (prismicData.homeDoc) {
        const homeDoc = prismicData.homeDoc;
        const blogPosts = prismicData.blog_posts;
        const posters = prismicData.posters;
        const title = RichText.asText(homeDoc.data.title);

        return (
            <DefaultLayout seoTitle={title}>
                <MaxWidthContainer>
                    <FeaturedPosters posters={posters} />
                    <Grid container spacing={5} justifyContent={'center'}>
                        <Grid item sx={{ marginY: '3rem' }}>
                            <Button to={'/posters'} text={'View more'} />
                        </Grid>
                    </Grid>
                    <BlogPosts posts={blogPosts} />
                </MaxWidthContainer>
                <img src="/separator-img.png" alt="decoration" style={{ margin: '10rem 0' }} />
            </DefaultLayout>
        );
    } else if (notFound) {
        return <NotFound />;
    }
    return null;
};

export default Home;
