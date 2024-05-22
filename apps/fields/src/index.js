import * as React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import FieldGroupRenderApp from './FieldGroupRenderApp';
import OptionsPageRenderApp from './OptionsPageRenderApp';
import {
  createHashRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

/* Standard App. */

import Dashboard from './routes/Dashboard';

// SDO Routes. 
import SDO_MenuRoute from './routes/sdo/SDO_MenuRoute';

/* SDO Automated */
import querySDO from '../../../data/sdo/query.json';
import postTypeSDO from '../../../data/sdo/post_type.json';
import taxonomySDO from '../../../data/sdo/taxonomy.json';
import optionsPageSDO from '../../../data/sdo/options_page.json';
import gridSDO from '../../../data/sdo/grid.json';
import formSDO from '../../../data/sdo/form.json';
import fieldSDO from '../../../data/sdo/field.json';
import fieldGroupSDO from '../../../data/sdo/field_group.json';
import SDO_DashboardRoute from './routes/sdo/SDO_DashboardRoute';
import SDO_CreateRoute from './routes/sdo/SDO_CreateRoute';
import SDO_EditRoute from './routes/sdo/SDO_EditRoute';
import SDO_DeleteRoute from './routes/sdo/SDO_DeleteRoute';
import SDO_ViewRoute from './routes/sdo/SDO_ViewRoute';

import Test from './routes/Test';

/* Make SDO Route Set. */
function makeSDO_Routes( sdo ) {

  const routes = {
    path: sdo.routeBase,
    element: <SDO_DashboardRoute sdo={sdo} />,
    children: [
      {
        path: "create",
        element: <SDO_CreateRoute sdo={sdo} />,
      },
      {
        path: "edit/:id",
        element: <SDO_EditRoute sdo={sdo} />,
      },
      {
        path: "delete/:id",
        element: <SDO_DeleteRoute sdo={sdo} />,
      },
      {
        path: "view/:id",
        element: <SDO_ViewRoute sdo={sdo} />,
      },
    ]
  }
  return routes;

}

/* Query Routes */
const queryRoutes = makeSDO_Routes( querySDO );
const postTypeRoutes = makeSDO_Routes( postTypeSDO );
const taxonomyRoutes = makeSDO_Routes( taxonomySDO );
const optionsPageRoutes = makeSDO_Routes( optionsPageSDO );
const gridRoutes = makeSDO_Routes( gridSDO );
const formRoutes = makeSDO_Routes( formSDO );
const fieldRoutes = makeSDO_Routes( fieldSDO );
const fieldGroupRoutes = makeSDO_Routes( fieldGroupSDO );


const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "test",
        element: <Test />
      },
      queryRoutes,
      postTypeRoutes,
      taxonomyRoutes,
      optionsPageRoutes,
      gridRoutes,
      formRoutes,
      fieldRoutes,
      fieldGroupRoutes,
      {
        path: "sdo",
        element: <SDO_MenuRoute />
      },
    ],
  },
]);

/* Rendering */

if ( document.getElementById("root") ) {
  createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
  );
}

if ( document.getElementById("f3-fg") ) {
  const tag = document.getElementById("f3-fg");
  const fieldGroupId = tag.getAttribute('data-field-group');
  createRoot(document.getElementById("f3-fg")).render(
    <FieldGroupRenderApp fieldGroupId={fieldGroupId} />
  );
}

if ( document.getElementById("f3-options-fields") ) {
  const tag = document.getElementById("f3-options-fields");
  const fieldGroupId = tag.getAttribute('data-field-group');
  createRoot(document.getElementById("f3-options-fields")).render(
    <OptionsPageRenderApp fieldGroupId={fieldGroupId} />
  );
}