import * as React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import FieldGroupRenderApp from './FieldGroupRenderApp';
import OptionsPageRenderApp from './OptionsPageRenderApp';

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
import SDO_DashboardRoute from './routes/sdo/SDO_DashboardRoute';
import SDO_PostTypeDashboardRoute from './routes/sdo/post-type/SDO_PostTypeDashboardRoute';
import SDO_PostTypeCreateRoute from './routes/sdo/post-type/SDO_PostTypeCreateRoute';
import SDO_PostTypeEditRoute from './routes/sdo/post-type/SDO_PostTypeEditRoute';
import SDO_PostTypeDeleteRoute from './routes/sdo/post-type/SDO_PostTypeDeleteRoute';
import SDO_TaxonomyDashboardRoute from './routes/sdo/taxonomy/SDO_TaxonomyDashboardRoute';
import SDO_TaxonomyCreateRoute from './routes/sdo/taxonomy/SDO_TaxonomyCreateRoute';
import SDO_TaxonomyEditRoute from './routes/sdo/taxonomy/SDO_TaxonomyEditRoute';
import SDO_TaxonomyDeleteRoute from './routes/sdo/taxonomy/SDO_TaxonomyDeleteRoute';
import SDO_TaxonomyViewRoute from './routes/sdo/taxonomy/SDO_TaxonomyViewRoute';
import SDO_OptionsPageDashboardRoute from './routes/sdo/options-page/SDO_OptionsPageDashboardRoute';
import SDO_OptionsPageCreateRoute from './routes/sdo/options-page/SDO_OptionsPageCreateRoute';
import SDO_OptionsPageEditRoute from './routes/sdo/options-page/SDO_OptionsPageEditRoute';
import SDO_OptionsPageDeleteRoute from './routes/sdo/options-page/SDO_OptionsPageDeleteRoute';
import SDO_OptionsPageViewRoute from './routes/sdo/options-page/SDO_OptionsPageViewRoute';

/* Grid Routes */
import GridDashboard from './routes/grids/GridDashboard';
import GridCreateRoute from './routes/grids/GridCreateRoute';

import {
  createHashRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

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
        element: <SDO_DashboardRoute />,
        children: [
          {
            path: "post-type",
            element: <SDO_PostTypeDashboardRoute />,
            children: [
              {
                path: "create",
                element: <SDO_PostTypeCreateRoute />,
              },
              {
                path: "edit/:id",
                element: <SDO_PostTypeEditRoute />,
              },
              {
                path: "delete/:id",
                element: <SDO_PostTypeDeleteRoute />,
              },
            ]
          },
          {
            path: "taxonomy",
            element: <SDO_TaxonomyDashboardRoute />,
            children: [
              {
                path: "create",
                element: <SDO_TaxonomyCreateRoute />,
              },
              {
                path: "edit/:id",
                element: <SDO_TaxonomyEditRoute />,
              },
              {
                path: "delete/:id",
                element: <SDO_TaxonomyDeleteRoute />,
              },
              {
                path: "view/:id",
                element: <SDO_TaxonomyViewRoute />,
              },
            ]
          },
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