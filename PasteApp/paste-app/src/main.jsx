import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import "tailwindcss";
import  { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import store from './store.jsx'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>,
)
