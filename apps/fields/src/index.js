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

// Field Routes.
import FieldDashboardRoute from './routes/fields/FieldDashboardRoute';
import CreateFieldRoute from './routes/fields/CreateFieldRoute';
import ViewFieldRoute from './routes/fields/ViewFieldRoute';
import EditFieldRoute from './routes/fields/EditFieldRoute';
import DeleteFieldRoute from './routes/fields/DeleteFieldRoute';

// Field Group Routes.
import GroupsDashboard from './routes/groups/GroupsDashboard';
import CreateFieldGroup from './routes/groups/CreateFieldGroup';
import EditFieldGroup from './routes/groups/EditFieldGroup';
import DeleteFieldGroup from './routes/groups/DeleteFieldGroup';

// Form Routes. 
import FormDashboardRoute from './routes/forms/FormDashboardRoute';
import FormCreateRoute from './routes/forms/FormCreateRoute';
import FormEditRoute from './routes/forms/FormEditRoute';
import FormDeleteRoute from './routes/forms/FormDeleteRoute';

// SDO Routes. 
import SDO_MenuRoute from './routes/sdo/SDO_MenuRoute';
import SDO_OptionsPageDashboardRoute from './routes/sdo/options-page/SDO_OptionsPageDashboardRoute';
import SDO_OptionsPageCreateRoute from './routes/sdo/options-page/SDO_OptionsPageCreateRoute';
import SDO_OptionsPageEditRoute from './routes/sdo/options-page/SDO_OptionsPageEditRoute';
import SDO_OptionsPageDeleteRoute from './routes/sdo/options-page/SDO_OptionsPageDeleteRoute';
import SDO_OptionsPageViewRoute from './routes/sdo/options-page/SDO_OptionsPageViewRoute';

/* SDO Automated */
import querySDO from '../../../data/sdo/query.json';
import postTypeSDO from '../../../data/sdo/post_type.json';
import taxonomySDO from '../../../data/sdo/taxonomy.json';
import optionsPageSDO from '../../../data/sdo/options_page.json';
import SDO_DashboardRoute from './routes/sdo/SDO_DashboardRoute';
import SDO_CreateRoute from './routes/sdo/SDO_CreateRoute';
import SDO_EditRoute from './routes/sdo/SDO_EditRoute';
import SDO_DeleteRoute from './routes/sdo/SDO_DeleteRoute';
import SDO_ViewRoute from './routes/sdo/SDO_ViewRoute';

/* Grid Routes */
import GridDashboard from './routes/grids/GridDashboard';
import GridCreateRoute from './routes/grids/GridCreateRoute';

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

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      queryRoutes,
      postTypeRoutes,
      taxonomyRoutes,
      optionsPageRoutes,
      {
        path: "grid",
        element: <GridDashboard />,
        children: [
          {
            path: "create",
            element: <GridCreateRoute />,
          },
        ]
      },
      {
        path: "sdo",
        element: <SDO_MenuRoute />,
        children: [
          {
            path: "options-page",
            element: <SDO_OptionsPageDashboardRoute />,
            children: [
              {
                path: "create",
                element: <SDO_OptionsPageCreateRoute />,
              },
              {
                path: "edit/:id",
                element: <SDO_OptionsPageEditRoute />,
              },
              {
                path: "delete/:id",
                element: <SDO_OptionsPageDeleteRoute />,
              },
              {
                path: "view/:id",
                element: <SDO_OptionsPageViewRoute />,
              },
            ]
          },
        ],
      },
      {
        path: "forms",
        element: <FormDashboardRoute />,
        children: [
          {
            path: "create",
            element: <FormCreateRoute />,
          },
          {
            path: "edit/:formId",
            element: <FormEditRoute />,
          },
          {
            path: "delete/:formId",
            element: <FormDeleteRoute />,
          },
        ],
      },
      {
        path: "fields",
        element: <FieldDashboardRoute />,
        children: [
          {
            path: "create",
            element: <CreateFieldRoute />,
          },
          {
            path: "view/:fieldId",
            element: <ViewFieldRoute />,
          },
          {
            path: "edit/:fieldId",
            element: <EditFieldRoute />,
          },
          {
            path: "delete/:fieldId",
            element: <DeleteFieldRoute />,
          },
        ],
      },
      {
        path: "groups",
        element: <GroupsDashboard />,
        children: [
          {
            path: "create",
            element: <CreateFieldGroup />,
          },
          {
            path: "edit/:groupId",
            element: <EditFieldGroup />,
          },
          {
            path: "delete/:groupId",
            element: <DeleteFieldGroup />,
          },
        ],
      }
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