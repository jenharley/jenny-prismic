import React, { useEffect, useState } from 'react';
import NotFound from './NotFound';
import Prismic from '@prismicio/client';
import { DefaultLayout } from '../components';
import { Link } from 'react-router-dom';
import { RichText } from 'prismic-reactjs';
import { client } from '../utils/prismicHelpers';
import { linkResolver } from '../prismic-configuration';

const PostItem = (props) => {
  const { post } = props;
  const title = RichText.asText(post.data?.title);

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

const BlogHome = () => {
  const [prismicData, setPrismicData] = useState({ homeDoc: null, posters: null, blog_posts: null });
  const [notFound, toggleNotFound] = useState(false);

  // Get the homepage and blog post documents from Prismic
  useEffect(() => {
    const fetchPrismicData = async () => {
      try {
        const blog_posts = await client.query(
          Prismic.Predicates.at('document.type', 'blog_post'),
          { orderings: '[my.post.date desc]' }
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
