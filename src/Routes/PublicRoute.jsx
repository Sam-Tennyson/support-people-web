import { ROUTE_CONSTANTS } from "../Shared/Routes";
import AddCause from "../Views/Authenticated/AddCause";
import BasicView from "../Views/Authenticated/BasicView";

export const PublicRoute = [
    {
        path: ROUTE_CONSTANTS.DASHBOARD,
        element: <BasicView />,
        title: "BasicView",
    },
    {
        path: ROUTE_CONSTANTS.ADD_CAUSE,
        element: <AddCause />,
        title: "AddCause",
    },
]

