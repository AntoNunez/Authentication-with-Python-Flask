import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import "../../styles/register.css";



const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    fetch(
      "https://3001-4geeksacade-reactflaskh-1303kxaynhn.ws-us59.gitpod.io/api/user",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("Success:", response);
        Swal.fire({
          title: "Registro exitoso",
          text: "Sus datos fueron guardados correctamente!",
          confirmButtonText: "Ok",
        })
      })
      navigate("/login")
     
      .catch((error) => console.error("Error:", error));

    console.log(data);
  };

  return (
    <div className="container-md">

      <form onSubmit={handleSubmit(onSubmit)} id="reg-form" className="text-left">

        <div className="login text-center">
          <div className="titulo">Registrar</div>
          <p>Por favor ingresa tus datos.</p>
        </div>

        <div className="form-group">
          <span className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de usuario"
              id="exampleInputname"
              {...register("username", { required: true })}
            />
            {errors.username?.type === "required" && (
              <span
                className="input-group-text bg-white border-start-0"
                id="basic-addon1"
              >
                <AiFillCloseCircle className="fs-4 text-danger" />
              </span>
            )}
          </span>
          {errors.username?.type === "required" && (
            <p className="text-danger mb-0"> El nombre de usuario es requerido </p>
          )}
        </div>

        <div className="form-group">
          <span className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Correo electronico"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register("email", {
                required: true,
                pattern:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              })}
            />
            {errors.email?.type === "required" && (
              <span
                className="input-group-text bg-white border-start-0"
                id="basic-addon1"
              >
                <AiFillCloseCircle className="fs-4 text-danger" />
              </span>
            )}
          </span>
         {errors.email?.type === "pattern" && (
            <p className="text-danger mb-0">El formato de correo no es valido</p>
          )}
          {errors.email?.type === "required" && (
            <p className="text-danger mb-0">
              {" "}
              El correo electronico es requerido{" "}
            </p>
          )}
        </div>

        <div className="form-group">
          <span className="input-group">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              id="exampleInputPassword1"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <span
                className="input-group-text bg-white border-start-0"
                id="basic-addon1"
              >
                <AiFillCloseCircle className="fs-4 text-danger" />
              </span>
            )}
          </span>
          {errors.password?.type === "required" && (
            <p className="text-danger mb-0"> La contraseña es requerida </p>
          )}
        </div>

        <div className="etc-login-form">
          <div className="form-check mt-4 d-flex justify-content-center">
            <input className="form-check-input me-1" type="checkbox" value="" id="flexCheckDefault" {...register("is_active")} />
            <label className="form-check-label me-4" htmlFor="flexCheckDefault">
              Acepto los <a href="/Terminos">Terminos</a>
            </label>
            <p>
              Ya tienes cuenta? <a href="/login">Ingresa aqui</a>
            </p>
          </div>
        </div>

        <div className="boton mt-4">
          <button onClick={handleSubmit} type="submit" className="reg-button">
            Registrar
          </button>
          <button type="reset" className="reg-button">
            Cancelar
          </button>

        </div>
      </form>

    </div>
  );
};

export default Register;