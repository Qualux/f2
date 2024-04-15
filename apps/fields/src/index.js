import * as React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import FieldGroupRenderApp from './FieldGroupRenderApp';

/* Standard App. */

import Dashboard from './routes/Dashboard';
import Settings from './routes/Settings';

// Field Routes.
import FieldsDashboard from './routes/fields/FieldsDashboard';
import CreateFieldRoute from './routes/fields/CreateFieldRoute';
import ViewField from './routes/fields/ViewField';
import EditFieldRoute from './routes/fields/EditFieldRoute';
import DeleteField from './routes/fields/DeleteField';

// Field Group Routes.
import GroupsDashboard from './routes/groups/GroupsDashboard';
import CreateFieldGroup from './routes/groups/CreateFieldGroup';
import EditFieldGroup from './routes/groups/EditFieldGroup';
import DeleteFieldGroup from './routes/groups/DeleteFieldGroup';

// Form Route.
import FormRoute from './routes/FormRoute';

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
        path: 'form',
        element: <FormRoute />
      },
      {
        path: "fields",
        element: <FieldsDashboard />,
        children: [
          {
            path: "create",
            element: <CreateFieldRoute />,
          },
          {
            path: "view/:fieldId",
            element: <ViewField />,
          },
          {
            path: "edit/:fieldId",
            element: <EditFieldRoute />,
          },
          {
            path: "delete/:fieldId",
            element: <DeleteField />,
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
      },
      {
        path: "settings",
        element: <Settings />
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

if ( document.getElementById("zero-fg") ) {
  const tag = document.getElementById("zero-fg");
  const fieldGroupId = tag.getAttribute('data-field-group');
  createRoot(document.getElementById("zero-fg")).render(
    <FieldGroupRenderApp fieldGroupId={fieldGroupId} />
  );
}