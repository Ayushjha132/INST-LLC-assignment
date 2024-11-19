import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.tsx'
import ErrorPage from './pages/404.tsx';

// setup the book route and 404 page
const router = createBrowserRouter([
  {
    path: "/books",
    element: <App />,
    // children: [
    //   {
    //     path: '/books/:id',
    //     element: <App/>
    //   }
    // ],
    errorElement: <ErrorPage />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
