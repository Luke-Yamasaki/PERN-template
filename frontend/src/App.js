//Hooks
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//components
import LoginForm from "./components/Authentication/LoginForm";
import SignupForm from "./components/Authentication/SignupForm";
import Modal from "./components/Modal";

//actions
import { restoreUser }from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <BrowserRouter>
      <Modal />
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
