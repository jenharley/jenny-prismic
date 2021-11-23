import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { BlogHome, NotFound, Post, Poster, Preview } from './pages';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<BlogHome />} />
          <Route exact path='/preview' element={<Preview />} />
          <Route exact path='/blog/:uid' element={<Post />} />
          <Route exact path='/posters/:uid' element={<Poster />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;