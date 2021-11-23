import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { BlogHome, NotFound, Home, Lighthouses, Post, Poster, PosterGallery, Preview } from './pages';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/preview' element={<Preview />} />
          <Route exact path='/blog' element={<BlogHome />} />
          <Route exact path='/blog/:uid' element={<Post />} />
          <Route exact path='/lighthouses' element={<Lighthouses />} />
          <Route exact path='/posters' element={<PosterGallery />} />
          <Route exact path='/posters/:uid' element={<Poster />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;