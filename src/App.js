import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import { Home, NoMatch, ShowTix, CreateTix } from "./Pages";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { UseAuth } from "./Hooks";

function App() {
  const { role } = UseAuth();
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route
            path='/show-tix'
            element={
              <ProtectedRoute redirectPath={"/home"}>
                <ShowTix />
              </ProtectedRoute>
            }
          />
          <Route
            path='/create-tix'
            element={
              <ProtectedRoute
                isAllowed={role?.includes("Client")}
                redirectPath={"/home"}
              >
                <CreateTix />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
