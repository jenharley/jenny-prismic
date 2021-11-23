import React from 'react';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../../../prismic-configuration';
import { customLink } from '../../../utils/prismicHelpers';

/**
 * Text slice component
 */
const Text = ({ slice }) => {
  return (
    <div className="post-part single container">
      <RichText
        render={slice.primary.blog_post_body}
        linkResolver={linkResolver}
        serializeHyperlink={customLink}
      />
    </div>
  )
};

export default Text;
