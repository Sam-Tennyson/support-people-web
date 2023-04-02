import { ROUTE_CONSTANTS } from "../Shared/Routes";
import AddCause from "../Views/Authenticated/AddCause";
import BasicView from "../Views/Authenticated/BasicView";
import MyCause from "../Views/Authenticated/MyCause";

export const PublicRoute = [
    {
        path: ROUTE_CONSTANTS.DASHBOARD,
        element: <BasicView />,
        title: "BasicView",
    },
    {
        path: ROUTE_CONSTANTS.ADD_CAUSE,
        element: <AddCause />,
        title: "Add Cause",
    },
    {
        path: ROUTE_CONSTANTS.MY_CAUSE,
        element: <MyCause />,
        title: "My Cause",
    },
]

