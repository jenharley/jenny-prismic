import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Default layout wrapper component
 */
const DefaultLayout = ({ wrapperClass, title, children }) => (
  <div className={wrapperClass}>
    <Header />
    {children}
    <Footer />
  </div>
);

export default DefaultLayout;
