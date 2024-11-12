import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Pages/layout/Root';
import Home from './Pages/layout/Home';
import PrivateRoute from './Pages/Routes/PrivateRoutes';
import ErrorPage from './Pages/ErrorPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignUp from './Pages/SignUp.jsx';
import AddProductPage from './Pages/AddProductPage.jsx.jsx';
import ProductDetails from './Pages/ProductDetails.jsx';
import MyCart from './Components/Shared/MyCart.jsx';
import BrandDetails from './Pages/BrandDetails.jsx';
import UpdateDetails from './Pages/UpdateDetails.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
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
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: "/myCart",
        element: <PrivateRoute><MyCart></MyCart></PrivateRoute>,
        loader: () => fetch("http://localhost:3000/cartProducts")
      },
      {
        path: "/brandDetails/:brand",
        element: <BrandDetails></BrandDetails>,
        loader: ({ params }) => fetch(`http://localhost:3000/brand/${params?.brand}`)
      },
      {
        path: "/updateDetails/:id",
        element: <UpdateDetails></UpdateDetails>,
        loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`)
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
