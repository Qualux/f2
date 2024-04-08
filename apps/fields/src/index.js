import * as React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import Dashboard from './routes/Dashboard';

// Field Routes.
import FieldsDashboard from './routes/fields/FieldsDashboard';
import CreateField from './routes/fields/CreateField';
import EditField from './routes/fields/EditField';
import DeleteField from './routes/fields/DeleteField';

// Field Group Routes.
import GroupsDashboard from './routes/groups/GroupsDashboard';
import CreateFieldGroup from './routes/groups/CreateFieldGroup';
import EditFieldGroup from './routes/groups/EditFieldGroup';
import DeleteFieldGroup from './routes/groups/DeleteFieldGroup';

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
        path: "fields",
        element: <FieldsDashboard />,
        children: [
          {
            path: "create",
            element: <CreateField />,
          },
          {
            path: "edit/:fieldId",
            element: <EditField />,
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <Outlet />
  </RouterProvider>
);
