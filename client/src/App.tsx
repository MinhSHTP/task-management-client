import { Login, Dashboard, Tasks, Groups } from "@pages";
import { Routes, Route } from "react-router-dom";
import { APP_PATH } from "@utils";
import RequireAuth from "./route/RequireAuth";

import { CommonLayout } from "@components";

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
              <CommonLayout>
                <Dashboard />
              </CommonLayout>
            </RequireAuth>
          }
        />
        <Route
          path={APP_PATH.TASKS_ROUTE}
          element={
            <RequireAuth>
              <CommonLayout>
                <Tasks />
              </CommonLayout>
            </RequireAuth>
          }
        />
        <Route
          path={APP_PATH.GROUPS_ROUTE}
          element={
            <RequireAuth>
              <CommonLayout>
                <Groups />
              </CommonLayout>
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
