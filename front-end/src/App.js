import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <LoginProvider>
            <Route path="/login" component={LoginPage} />
          </LoginProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
