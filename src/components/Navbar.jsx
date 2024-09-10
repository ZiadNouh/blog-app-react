import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export const Navbar = () => {
  const { user, isLoggedIn, login, logout } = useAuthContext();

  return (
    <header className="px-4 sticky top-0 z-50 bg-slate-600">
      <div className="navbar ">
        <div className="navbar-start ">
          <Link to="/" className="btn ">
            Home
          </Link>
        </div>
        <div></div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <>
              <button onClick={logout} className="btn btn-error">
                Logout
              </button>
            </>
          ) : (
            <Link to={"/login"}>
              <button onClick={login} className="btn btn-primary">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
