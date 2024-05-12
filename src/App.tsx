import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './Game';
import NewGame from './NewGame';
import Welcome from './Welcome';

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/new-game/:id?', loader: NewGame.loader, element: <NewGame /> },
  {
    path: '/game/:id',
    element: <Game />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
