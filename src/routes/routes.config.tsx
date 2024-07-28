import { ElementType, lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import TicketManagementPage from "pages/TicketManagementPage";

export const RoutesConfig: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        element: <TicketManagementPage />,
        index: true,
      }
    ],
  },
];
