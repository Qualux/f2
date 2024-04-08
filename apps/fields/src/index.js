import * as React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import Dashboard from './routes/Dashboard';
import Fields from './routes/Fields';
import CreateField from './routes/fields/CreateField';

// Field Groups.
import Groups from './routes/Groups';
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
        element: <Fields />,
        children: [
          {
            path: "create",
            element: <CreateField />,
          },
        ],
      },
      {
        path: "groups",
        element: <Groups />,
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
