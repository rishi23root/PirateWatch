import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import ShowInputValue from './components/ShowInputValue';
import './css/App.css';
import Image from './components/Image';

import { Route, Switch } from "react-router-dom"
import Home from './pages/home';

// create routes 
// setup redux and create different folders to store components 
// add lazy-loading for the images 



function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/admin" component={Admin} />
      <Route path="/fullpost" component={Fullpost} /> */}
      </Switch>
    </React.Fragment>
  )
}

// {SearchValue && <ShowInputValue value={store.getState().magnet} />}
// {SearchValue && <ShowInputValue value={store.getState().updatedAt.toString()} />}
export default App;
