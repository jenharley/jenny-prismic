import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const DefaultLayout = ({ wrapperClass, seoTitle, children }) => (
    <>
        <Helmet>
            <title>{seoTitle}</title>
        </Helmet>
        <div className={wrapperClass}>
            <Header />
            {children}
            <Footer />
        </div>
    </>
);

export default DefaultLayout;
