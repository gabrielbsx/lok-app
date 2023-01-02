import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/main.css';
import './assets/css/global.css';
import 'flowbite';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { Flowbite } from 'flowbite-react';
import Theme from './utils/Theme';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.min.css';

// #585858
document.body.className = 'bg-[#181818] dark:text-neutral-200 max-w-screen';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Flowbite theme={Theme}>
          {/* <img
            src="https://images5.alphacoders.com/861/861521.jpg"
            alt="Imperial"
            className="fixed top-0 left-0 w-full h-full object-cover -z-10 filter blur-2xl opacity-30"
          /> */}
          <App />
        </Flowbite>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
