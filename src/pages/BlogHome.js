import Masonry from '@mui/lab/Masonry';
import NotFound from './NotFound';
import Prismic from '@prismicio/client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { DefaultLayout } from '../components';
import { Link } from 'react-router-dom';
import { RichText } from 'prismic-reactjs';
import { client } from '../utils/prismicHelpers';
import { isMobileWidth, respondTo } from '../utils/StyleUtil';
import { linkResolver } from '../prismic-configuration';
import { MaxWidthContainer } from '../components/MaxWidthContainer';

export const Title = styled.h1`
    color: #41294a;
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -.06em;
    padding: 60px 0 120px;
    text-align: center;

    ${respondTo('desktop')`
        font-size: 8rem;
    `}
`;

export const Date = styled.span`
    color: #ff2c54;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: -.02em;
    text-transform: uppercase;
    white-space: nowrap;
`;

export const Dateline = styled.div`
    align-items: baseline;
    column-gap: 0.5rem;
    display: grid;
    grid-template-columns: 80px minmax(0, 1fr) 76px;
    justify-content: space-between;
    margin-top: 1rem;
    width: 100%;
`;

const Image = styled.img`
    aspect-ratio: 1/1;
`;

export const ReadMore = styled.span`
    color: #ff2c54;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: -.02em;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
`;

const Post = styled(Link)`
    color: #111;
    text-decoration: none;

    ${respondTo('desktop', 'max')`
        && {
            margin-bottom: 60px;
        }
    `}

    h2 {
        font-size: 1.625rem;
        font-weight: 400;
        line-height: 1.35;
        margin-bottom: 0.5rem;
        margin-top: 1rem;
    }

    p {
        font-weight: 300;
        line-height: 1.55;
    }
`;

const StyledTagList = styled.div`
    span {
        color: #bababa;
        display: block;
        font-size: 0.75rem;
        font-weight: 700;
        overflow: hidden;
        text-transform: uppercase;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 99%;
    }
`;

export const truncate = (string, useLength) => {
    const LENGTH = 155;
    const length = useLength || LENGTH;

    return string.length > length ? string.substring(0, length - 3) + '…' : string;
};

const PostItem = (props) => {
    const { post } = props;
    const { data } = post;
    const { body, publish_date, tags, thumbnail, title } = data;
    const blog_title = RichText.asText(title);
    const description = RichText.asText(body[0].primary.blog_post_body);
    const date = moment(publish_date).format('MMM D, YYYY');

    return (
        <Post to={linkResolver(post)}>
            {thumbnail.url && <Image src={thumbnail.url} alt={title} />}
            <h2>{blog_title}</h2>
            <p>{truncate(description)}</p>
            <Dateline>
                <Date>{date}</Date>
                {tags && <TagList tags={tags} />}
                <ReadMore>Read More</ReadMore>
            </Dateline>
        </Post>
    );
};

const BlogPosts = (props) => {
    useEffect(() => {
        window.addEventListener('resize', throttledHandleWindowResize);
        return () => window.removeEventListener('resize', throttledHandleWindowResize);
    });

    const [columns, setColumns] = useState(isMobileWidth(document.documentElement.clientWidth) ? 1 : 3);
    const { posts } = props;

    const throttledHandleWindowResize = () => {
        const isWidthMobile = isMobileWidth(document.documentElement.clientWidth);
        const columns = isWidthMobile ? 1 : 3;
        setColumns(columns);
    };

    return (
        <MaxWidthContainer>
            <Masonry
                columns={columns}
                spacing={5}
                defaultHeight={2545}
                defaultColumns={3}
                defaultSpacing={5}
            >
                {posts.map((post) => (
                    <PostItem post={post} key={post.id} />
                ))}
            </Masonry>
        </MaxWidthContainer>
    );
};

export const TagList = (props) => {
    const { tags } = props;
    const array = tags.map(tag => tag.tag);
    const tagList = array.join(', ').toString();

    return (
        <StyledTagList>
            <span>{truncate(tagList, 23)}</span>
        </StyledTagList>
    );
};

const BlogHome = () => {
    const [prismicData, setPrismicData] = useState({ homeDoc: null, posters: null, blog_posts: null });
    const [notFound, toggleNotFound] = useState(false);

    // Get the homepage and blog post documents from Prismic
    useEffect(() => {
        const fetchPrismicData = async () => {
            try {
                const blog_posts = await client.query(
                    Prismic.Predicates.at('document.type', 'blog_post'),
                    { orderings: '[my.blog_post.publish_date desc]' }
                );

                if (blog_posts) {
                    setPrismicData({ blog_posts: blog_posts.results });
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
    if (prismicData.blog_posts) {
        const blog_posts = prismicData.blog_posts;

        return (
            <DefaultLayout seoTitle={'Blog | Jen Harley'}>
                <MaxWidthContainer>
                    <Title>Blog Posts</Title>
                </MaxWidthContainer>
                <BlogPosts posts={blog_posts} />
            </DefaultLayout>
        );
    } else if (notFound) {
        return <NotFound />;
    }

    return null;
};

export default BlogHome;
