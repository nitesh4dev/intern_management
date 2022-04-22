import "./App.css";
import { customTheme } from "./theme/Theme";
import { ThemeProvider } from "@material-ui/core";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvide from "./Context/DataContext";
import Routes from "./routes/Routes";
import AuthProvider from "./Context/AuthContext";
import SnackbarProvider from "./Context/SnackbarContext";
import CustomSnackBar from "./common/CustomSnackbar";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "rgb(250, 251, 251)" }}>
      <ThemeProvider theme={customTheme}>
        {/* SnackbarProvider gives access to the states of the custom snackbar, so that we can change its state from anywhere inside our app.  */}
        <SnackbarProvider>
          <Router>
            {/* AuthProvider is a component which contains a context that provides access to user informations and other authentication methods like login, signup etc*/}
            <AuthProvider>
              {/* Custom Snackbar is a material ui component used to show alert messages with timer and other configuration*/}
              <CustomSnackBar />

              {/* App routes are defined here */}
              <Routes />
            </AuthProvider>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
