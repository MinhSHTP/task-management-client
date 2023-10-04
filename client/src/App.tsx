import { Login, Dashboard } from "@pages";
import { Routes, Route } from "react-router-dom";
import { APP_PATH } from "@utils";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={APP_PATH.LOGIN_ROUTE} element={<Login />} />
        <Route path={APP_PATH.DASHBOARD_ROUTE} element={<Dashboard />} />
        <Route path="/*" element={<>404-Not found</>} />
      </Routes>
    </>
  );
}

export default App;
