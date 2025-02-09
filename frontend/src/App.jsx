import {
  createBrowserRouter,
  /*Navigate,*/
  RouterProvider,
} from "react-router-dom";
//import './App.css';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import Signin from './pages/Signin';
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "model",
        element: <FileUpload />,
      },
      {
        path: "dashboards",
        element: <Dashboard />,
      },
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
