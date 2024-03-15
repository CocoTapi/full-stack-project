import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ActivitiesRootLayout from './pages/ActivitiesRootLayout';
import ActivitiesPage from './pages/ActivitiesPage';
import MyPage from './pages/MyPage';
import AuthenticationPage from './pages/Authentication';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: 'activities',
        element: <ActivitiesRootLayout />,
        children: [
          { index: true, element: <ActivitiesPage />}
        ]
      },
      {
        path: 'auth',
        element: <AuthenticationPage />
      },
      {
        path: 'my-page',
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <MyPage /> }
        ]
      },
      {
        path: 'logout',
      }
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
