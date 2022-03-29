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
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <SnackbarProvider>
          <AuthProvider>
            <Router>
              <CustomSnackBar />
              <Routes />
            </Router>
          </AuthProvider>
        </SnackbarProvider>

      </ThemeProvider>
    </div>
  );
}

export default App;
