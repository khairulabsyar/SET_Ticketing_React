import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider, DarkModeProvider, DialogProvider } from "./Providers";
import { Provider as ReduxProvider } from "react-redux";
import store from "./Services/Reducers";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ReduxProvider store={store}>
            <AuthProvider>
              <DialogProvider>
                <App />
              </DialogProvider>
            </AuthProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </DarkModeProvider>
  </React.StrictMode>
);

reportWebVitals();
