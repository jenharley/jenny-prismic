import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

const DefaultLayout = ({ children, seoTitle, hideFooter, wrapperClass }) => (
    <>
        <Helmet>
            <title>{seoTitle}</title>
        </Helmet>
        <div className={wrapperClass}>
            <Header />
            {children}
            {!hideFooter && <Footer />}
        </div>
    </>
);

export default DefaultLayout;
