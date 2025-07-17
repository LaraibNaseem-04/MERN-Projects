import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Paste from './Components/Paste';
import ViewPastes from './Components/ViewPastes';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <NavBar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <NavBar />
        <ViewPastes />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
