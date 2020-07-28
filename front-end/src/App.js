import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AppProvider>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </AppProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
