import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './Game';
import NewGame from './NewGame';
import { store } from './store';
import Welcome from './Welcome';

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/new-game/:id?', loader: NewGame.loader, element: <NewGame /> },
  {
    path: '/game/:id',
    element: <Game />,
    loader: Game.loader,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
