import React from "react";
import { Context } from "../store/appContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/login.css";



const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email:"",
    password:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await actions.getLogin(data);
    console.log(response);
    if (response.access_token) {
      Swal.fire({
        title: "Bienvenido/a",
        text: "Inicio de Sesion Exitosa",
        timer: 3000,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/profile');
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email/Password incorrecto!",
        footer: "Por favor, intente nuevamente!",
      });
    }
  };

  useEffect(() => {
    if (store.currentUser !== null) {
      navigate('/profile');
    }
  }, [store.currentUser]);

  return (
    <div className="container-md ">
      <form onSubmit={handleSubmit} id="login-form" className="text-left">
        <div className="login text-center">
          <div className="titulo">Ingresar</div>
          <p>Ingresa tu correo y contraseña</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            value={data.email}
            className="form-control"
            placeholder="Correo electronico"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={data.password}
            className="form-control"
            placeholder="Contraseña"
            onChange={handleChange}
          />
        </div>
        <div className="etc-login-form">
        <div className="form-check mt-4 d-flex justify-content-center">
            <input className="form-check-input me-1" type="checkbox" value="" id="flexCheckDefault"/>
            <label className="form-check-label me-5" htmlFor="flexCheckDefault">
              Recuerdame
            </label>
            <p>
              No tienes cuenta? <a href="/register">Crear cuenta</a>
            </p>
          </div>
        </div>
        <div className="boton mt-4">
          <button onClick={handleSubmit} type="submit" className="login-button">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;