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
import ProductDetails from './Pages/Components/ProductDetails';
import UpdateDetails from './Pages/Components/UpdateDetails';
import AuthProvider from './providers/AuthProvider';
import MyCart from './Pages/Components/myCart';
import PrivateRoute from './Pages/Routes/PrivateRoutes';


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
        path: "/productDetails/:id",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) => fetch(`https://brand-store-server-rouge.vercel.app/products/${params.id}`)
      },
      {
        path: "/myCart",
        element: <PrivateRoute><MyCart></MyCart></PrivateRoute>,
        loader: () => fetch("https://brand-store-server-rouge.vercel.app/cartProducts")
      },
      {
        path: "/brandDetails/:brand",
        element: <BrandDetails></BrandDetails>,
        loader: ({ params }) => fetch(`https://brand-store-server-rouge.vercel.app/brand/${params?.brand}`)
      },
      {
        path: "/updateDetails/:id",
        element: <UpdateDetails></UpdateDetails>,
        loader: ({ params }) => fetch(`https://brand-store-server-rouge.vercel.app/products/${params.id}`)
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
