import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
