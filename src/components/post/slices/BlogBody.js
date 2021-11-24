import React from 'react';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../../../prismic-configuration';
import { customLink } from '../../../utils/prismicHelpers';
import styled from 'styled-components';

const StyledBlogBody = styled.div`
    h1, h2, h3,
    h4, h5, h6 {
        -webkit-font-feature-settings: 'dlig' 1, 'liga' 1, 'lnum' 1, 'kern' 1;
        -moz-font-feature-settings: 'dlig' 1, 'liga' 1, 'lnum' 1, 'kern' 1;
        -o-font-feature-settings: 'dlig' 1, 'liga' 1, 'lnum' 1, 'kern' 1;
        color: #2E2E2E;
        line-height: 1.15em;
        margin: 0 0 0.4em 0;
        font-family: "Open Sans", sans-serif;
    }

    h1 {
        font-size: 5rem;
        letter-spacing: -2px;
        text-indent: -3px;
    }

    h2 {
        font-size: 3.6rem;
        letter-spacing: -1px;
    }

    h3 {
        font-size: 3rem;
    }

    h4 {
        font-size: 2.5rem;
    }

    h5 {
        font-size: 2rem;
    }

    h6 {
        font-size: 2rem;
    }

    a {
        color: #4A4A4A;
        transition: color ease 0.3s;
    }

    a:hover {
        color: #111;
    }

    p, ul, ol, dl {
        -webkit-font-feature-settings: 'liga' 1, 'onum' 1, 'kern' 1;
        -moz-font-feature-settings: 'liga' 1, 'onum' 1, 'kern' 1;
        -o-font-feature-settings: 'liga' 1, 'onum' 1, 'kern' 1;
        margin: 0 0 1.75em 0;
    }

    ol, ul {
        padding-left: 3rem;
    }

    ol ol, ul ul,
    ul ol, ol ul {
        margin: 0 0 0.4em 0;
        padding-left: 2em;
    }

    dl dt {
        float: left;
        width: 180px;
        overflow: hidden;
        clear: left;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
        margin-bottom: 1em;
    }

    dl dd {
        margin-left: 200px;
        margin-bottom: 1em
    }

    li {
        margin: 0.4em 0;
    }

    li li {
        margin: 0;
    }

`;

const BlogBody = ({ slice }) => {
    return (
        <StyledBlogBody>
        <RichText
            render={slice.primary.blog_post_body}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
        />
        </StyledBlogBody>
    )
    };

export default BlogBody;
