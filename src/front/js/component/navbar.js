import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="container-fluid m-0 p-0 ">
      <nav className="navbar bg-dark">
        <div className="container d-flex">
          <Link to="/">
            <span className="navbar-brand mb-0 h1 text-white">Home</span>
          </Link>

          <ul className="navbar-nav">

            {store.currentUser === null ? (
              <Link to="/register" className="nav-link active text-white " href="/register">
                Registrate
              </Link>
            ) : (
              <Link to="/profile" className="nav-link active text-white " href="/profile">
                Perfil
              </Link>
            )}
            <li>
              {store.currentUser === null ? (
                <Link to="/login" className="nav-link active text-white" href="/login">
                  Ingresa
                </Link>
              ) : (
                <Link to="/" className="nav-link active text-white" onClick={() => actions.getlogout()}>
                  Cerrar sesion
                </Link>
              )}
            </li>
            <Link to="/demo" className="nav-link active text-white" href="/demo">
              Check the Context in action
            </Link>

          </ul>

        </div>
      </nav>
    </div>
  );
};
