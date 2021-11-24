import React,
{ Fragment } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  About,
  BlogHome,
  Contact,
  Home,
  Lighthouses,
  NotFound,
  Post,
  Poster,
  Posters,
  Preview,
  Shop
} from './pages';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/blog' element={<BlogHome />} />
          <Route exact path='/blog/:uid' element={<Post />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/lighthouses' element={<Lighthouses />} />
          <Route exact path='/posters' element={<Posters />} />
          <Route exact path='/posters/:uid' element={<Poster />} />
          <Route exact path='/preview' element={<Preview />} />
          <Route exact path='/shop' element={<Shop />} />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;