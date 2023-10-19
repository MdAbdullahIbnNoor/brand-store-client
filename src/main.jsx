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
import LoginPage from './Pages/Components/LoginPage';
import SignUp from './Pages/Components/SignUp';
import AddProductPage from './Pages/Components/AddProductPage.jsx';
import BrandDetails from './Pages/Components/BrandDetails';
// import ProductDetails from './Pages/Components/ProductDetails';
import UpdateDetails from './Pages/Components/UpdateDetails';
import AuthProvider from './providers/AuthProvider';




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
        path: "/login",
        element: <LoginPage></LoginPage>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/addProduct",
        element: <AddProductPage></AddProductPage>
      },
      {
        path: "/brandDetails/:name",
        element: <BrandDetails></BrandDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/products`)
      },
      {
        path: "/updateDetails/:id",
        element: <UpdateDetails></UpdateDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
