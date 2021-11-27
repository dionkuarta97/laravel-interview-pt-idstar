import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { getUser } from "../store/actions";
import Home from "./Home";
import Login from "./Login";

function App() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state);
  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    if (access_token) {
      dispatch(getUser());
    }
  }, [login]);
  return (
    <>
      <Routes>
        <Route path="/login" element={!access_token ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={access_token ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
