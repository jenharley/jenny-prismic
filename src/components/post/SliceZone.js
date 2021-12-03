import React from 'react';
import { BlogBody } from './slices';

/**
 * Post slice zone component
 */
const SliceZone = ({ sliceZone }) => (
    sliceZone.map((slice, index) => {
        switch (slice.slice_type) {
        case ('blog_body'):
            return <BlogBody slice={slice} key={`slice-${index}`} />;
        default:
            return null;
        }
    })
);

export default SliceZone;
