import { Login, Dashboard } from "@pages";
import { Routes, Route } from "react-router-dom";
import { APP_PATH } from "@utils";
import RequireAuth from "./route/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={APP_PATH.LOGIN_ROUTE} element={<Login />} />

        <Route
          path={APP_PATH.DASHBOARD_ROUTE}
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/*" element={<>404-Not found</>} />
      </Routes>
    </>
  );
}

export default App;
