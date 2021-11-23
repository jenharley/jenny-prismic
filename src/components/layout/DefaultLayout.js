import React from 'react';
import Footer from './Footer';

/**
 * Default layout wrapper component
 */
const DefaultLayout = ({ wrapperClass, title, children }) => (
  <div className={wrapperClass}>
    {children}
    <Footer />
  </div>
);

export default DefaultLayout;
