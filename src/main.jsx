import { StrictMode } from 'react';;
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Accueil from './page/dashboard/Accueil.jsx';
import Inscription from './page/inscription/Inscription.jsx';
import Connexion from './page/connexion/Connexion.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
// Creation de l'objet BrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Accueil />
  },
  {
    path: '/inscription',
    element: <Inscription />
  },
  {
    path: '/connexion',
    element: <Connexion />
  }

])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router = {router} ></RouterProvider>
    </QueryClientProvider>

  </StrictMode>
)
