import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE: any = {
  currentUser: JSON.parse(localStorage.getItem("user") || "{}"),
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
