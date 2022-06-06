//Hooks
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';

//components
import App from './App';

//styles
import styles from './index.module.css';

//actions
import configureStore from './store';
import { setModalMount } from './store/modal';
import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

function Root() {
  const dispatch = useDispatch();
  const modalMountRef = useRef(null);

  useEffect(() => {
    dispatch(setModalMount(modalMountRef.current))
  }, [dispatch])

  return (
    <div className={styles.rootContainer}>
      < App />
      <div className={styles.modalContainer} ref={modalMountRef} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
