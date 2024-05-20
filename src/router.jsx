import { createBrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layout";
import Index from "./views/Index";
import Hotel from "./views/Hotel";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children: [
            {   
                index: true,
                element: <Index/>
            },
            {
                path: '/:id',
                element: <Hotel/>
            },
        ]
    },
])

export default router;