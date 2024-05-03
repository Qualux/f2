import { createContext } from 'react';
import { DomainContext } from './contexts';
import AppHeader from './components/global/AppHeader';
import {
  createHashRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

function domainContextValues() {

  let isLocal = false;
  if( window.location.hostname === 'localhost' ) {
    isLocal = true;
  }

  let url = window.location.origin;
  if( isLocal ) {
    url = 'http://ds.local/';
  } else {
    url = window.location.origin;
  }

  const val = {
    url,
    api: url + '/wp-json'
  }

  return val;

}

function App() {

  const domainContextValue = domainContextValues();  

  return (
    <DomainContext.Provider value={domainContextValue}>
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex gap-0">
          <Outlet />
        </div>
      </div>
    </DomainContext.Provider>
  );

}

export default App;
