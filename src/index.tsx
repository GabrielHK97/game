import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import CreateAccountPage from "./pages/createAccount/CreateAccountPage";
import HomePage from "./pages/home/HomePage";
import Application from "./components/application/Application";
import ApplicationProvider from "./providers/ApplicationProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApplicationProvider>
      <BrowserRouter>
      <Application/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/createAccount" element={<CreateAccountPage />} />
        </Routes>
      </BrowserRouter>
  </ApplicationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
