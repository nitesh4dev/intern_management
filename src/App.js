import "./App.css";
import { customTheme } from "./theme/Theme";
import { ThemeProvider } from "@material-ui/core";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvide from "./Context/DataContext";
import Routes from "./routes/Routes";
import AuthProvider from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <DataProvide>
        <AuthProvider>
          <ThemeProvider theme={customTheme}>
            <Router>
              <Dashboard />
              <Routes />
            </Router>
          </ThemeProvider>
        </AuthProvider>
      </DataProvide>
    </div>
  );
}

export default App;
