const { render } = wp.element;
import './main.css';
import App from './App';
import {
  createHashRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

/* Gutenberg Blocks. */
import './blocks/dynamic-text-field';
import './blocks/dynamic-image-field';
import './blocks/query';

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

// Settings Route.
import SettingsRoute from './routes/SettingsRoute';

import Test from './routes/Test';

/* Make SDO Route Set. */
function makeSDO_Routes( sdo ) {

  const routes = {
    path: sdo.route_base,
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
        path: "sdo",
        element: <SDO_MenuRoute />
      },
      {
        path: "test",
        element: <Test />
      },
      {
        path: "settings",
        element: <SettingsRoute />
      },
      queryRoutes,
      postTypeRoutes,
      taxonomyRoutes,
      optionsPageRoutes,
      gridRoutes,
      formRoutes,
      fieldRoutes,
      fieldGroupRoutes, 
    ],
  },
]);

document.addEventListener('DOMContentLoaded', () => {
    const renderEl = document.getElementById('f3-admin');
    if (renderEl) {
        render(
            <RouterProvider router={router}>
                <Outlet />
            </RouterProvider>, 
            renderEl
        );
    }
});


