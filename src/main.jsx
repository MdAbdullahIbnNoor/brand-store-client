import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Pages/layout/Root';
import ErrorPage from './Pages/Components/ErrorPage';
import Home from './Pages/layout/Home';
import LoginPage from './Pages/login';
import AddProductPage from './Pages/Components/AddProductPage.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        // path: "/login",
        // element: <LoginPage></LoginPage>
      },
      {
        // path: "/signup",
        // element: <SignUp></SignUp>
      },
      {
        path: "/addProduct",
        element: <AddProductPage></AddProductPage>
      },
      // {
      //   path: "/gallery",
      //   element: <PrivateRoute><Gallery></Gallery></PrivateRoute>
      // },
      // {
      //   path: "/team",
      //   element: <PrivateRoute><TeamSection></TeamSection></PrivateRoute>
      // }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
