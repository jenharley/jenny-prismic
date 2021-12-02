import React, { useEffect, useState } from 'react';
import NotFound from './NotFound';
import Prismic from '@prismicio/client';
import { DefaultLayout } from '../components';
import { Link } from 'react-router-dom';
import { RichText } from 'prismic-reactjs';
import { client } from '../utils/prismicHelpers';
import { linkResolver } from '../prismic-configuration';
import { isMobileWidth } from '../utils/StyleUtil';
import styled from 'styled-components';
import moment from 'moment';
import Masonry from '@mui/lab/Masonry';

const Date = styled.span`
    color: #ff2c54;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: -.02em;
    text-transform: uppercase;
    white-space: nowrap;
`;

const Dateline = styled.div`
    align-items: baseline;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;

    div {
        align-items: baseline;
        display: flex;
        column-gap: 0.5rem;
    }
`;

const ReadMore = styled(Link)`
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

const PostList = styled.ul`
    display: grid;
    margin: 0 auto;
    max-width: 1100px;
`;

const StyledTagList = styled.ul`
    color: #bababa;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
`;

const truncate = (string, useLength) => {
    const LENGTH = 155;
    const length = useLength ? useLength : LENGTH;

    return string.length > length ? string.substring(0, length - 3) + `…` : string;
};

const PostItem = (props) => {
    const { post } = props;
    const { data } = post;
    const { body, publish_date, tags, thumbnail, title } = data;
    const blog_title = RichText.asText(title);
    const description = RichText.asText(body[0].primary.blog_post_body);
    const date = moment(publish_date).format("MMM D, YYYY")

    return (
        <Post to={linkResolver(post)}>
            {thumbnail.url && <img src={thumbnail.url} alt={title} />}
            <h2>{blog_title}</h2>
            <p>{truncate(description)}</p>
            <Dateline>
                <div>
                    <Date>{date}</Date>
                    {tags && <TagList tags={tags} />}
                </div>
                <ReadMore to={linkResolver(post)}>Read More</ReadMore> 
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
    }

    return (
        <PostList>
            <Masonry columns={columns} spacing={5}>
                {posts.map((post) => (
                    <PostItem post={post} key={post.id} />
                ))}
            </Masonry>
        </PostList>
    );
};

const TagList = (props) => {
    const { tags } = props;
    const array = tags.map(tag => tag.tag);
    const tagList = array.join(", ").toString();

    return (
        <StyledTagList>
            {truncate(tagList, 20)}
        </StyledTagList>
    )
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
        }

        fetchPrismicData();
    }, []);

    // Return the page if a document was retrieved from Prismic
    if (prismicData.blog_posts) {
        const blog_posts = prismicData.blog_posts;

        return (
        <DefaultLayout seoTitle={"Blog"}>
            Blog
            <BlogPosts posts={blog_posts} />
        </DefaultLayout>
        );
    } else if (notFound) {
        return <NotFound />;
    }

    return null;
}

export default BlogHome;
