import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import "./darkMode/dark.scss";
import { useContext } from "react";
import { createContext, useReducer } from "react";
import DarkModeReducer from "./context/darkModeReducer";
import { AuthContext } from "./context/authContext";

const INITIAL_STATE: any = {
  darkMode: false,
  dispatch: null,
};

export const DarkModeContext = createContext(INITIAL_STATE);

function App() {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }: any) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      <div className={state.darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />

              <Route path="users">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <List />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <RequireAuth>
                      <Single />
                    </RequireAuth>
                  }
                />
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <New inputs={userInputs} title="Add New User" />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="products">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <List />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":productId"
                  element={
                    <RequireAuth>
                      <Single />
                    </RequireAuth>
                  }
                />
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <New inputs={productInputs} title={"Add New Product"} />
                    </RequireAuth>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
