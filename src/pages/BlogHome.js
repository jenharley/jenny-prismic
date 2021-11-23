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

const PostItem = (props) => {
  const { post } = props;
  const title = RichText.asText(post.data?.title);
  console.log(post)

  return (
    <Link to={linkResolver(post)}>
      <h2>{title}</h2>
    </Link>
  );
};

const BlogPosts = (props) => {
  const { posts } = props;

  return (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </>
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

const BlogHome = () => {
  const [prismicData, setPrismicData] = useState({ homeDoc: null, posters: null, blog_posts: null });
  const [notFound, toggleNotFound] = useState(false);

  // Get the homepage and blog post documents from Prismic
  useEffect(() => {
    const fetchPrismicData = async () => {
      try {
        const homeDoc = await client.getSingle('page');
        const blog_posts = await client.query(
          Prismic.Predicates.at('document.type', 'blog_post'),
          { orderings: '[my.post.date desc]' }
        );
        const posters = await client.query(
          Prismic.Predicates.at('document.type', 'poster'),
          { orderings: '[my.post.date desc]' }
        );
  
        if (homeDoc) {
          setPrismicData({ homeDoc, posters: posters.results, blog_posts: blog_posts.results });
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
  if (prismicData.homeDoc) {
    const homeDoc = prismicData.homeDoc;
    const blog_posts = prismicData.blog_posts;
    const posters = prismicData.posters;
    const title = RichText.asText(homeDoc.data.title);

    return (
      <DefaultLayout seoTitle={title}>
        {title}
        <Posters posters={posters} />
        <BlogPosts posts={blog_posts} />
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
}

export default BlogHome;
