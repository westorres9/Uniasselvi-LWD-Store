import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../../../types/user";
import { useState } from "react";
import * as userService from '../../../../services/user-service';
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  function onSubmit(user: User) {
    userService.register(user).then(response => {
      console.log(response);
      toastyRegisterSuccess();
      setTimeout(() =>{
        navigate("/login");
      }, 5000)
    }).catch(error => {
      setHasError(true);
      console.log(error);
      toastyRegisterError("Erro ao tentar registrar")
    })
  }

  function toastyRegisterSuccess() {
    toast.info("Parabens!, sua conta foi criada com sucesso!");
  }

  function toastyRegisterError(message: string) {
    toast.error(message);
  }

  return (
    <div className="container ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="login-container">
        <h1>Registrar</h1>
        {hasError && (
          <div className="alert alert-danger alert-dialog">
            Erro ao tentar fazer o cadastro!
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form-container"
        >
          <div className="mb-4">
            <input
              {...register("firstName", {
                required: "Campo Obrigatório",
              })}
              type="text"
              placeholder="Nome"
              name="firstName"
              className={`login-form form-control base-input ${
                errors.firstName ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback d-block">
              {errors.firstName?.message}
            </div>
          </div>
          <div className="mb-4">
            <input
              {...register("lastName", {
                required: "Campo Obrigatório",
              })}
              type="text"
              placeholder="Sobrenome"
              name="lastName"
              className={`login-form form-control base-input ${
                errors.lastName ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback d-block">
              {errors.lastName?.message}
            </div>
          </div>
          <div className="mb-4">
            <input
              {...register("email", {
                required: "Campo Obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="text"
              placeholder="Email"
              name="email"
              className={`login-form form-control base-input ${
                errors.email ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback d-block">
              {errors.email?.message}
            </div>
          </div>
          <div className="mb-4">
            <input
              {...register("password", {
                required: "Campo Obrigatório",
              })}
              type="password"
              placeholder="Senha com 6 caracteres"
              name="password"
              className={`login-form form-control base-input ${
                errors.password ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
          </div>
          <div className="recover-container">
            <Link to="/recover">Esqueci a senha</Link>
          </div>
          <div className="login-form-button-container">
            <button className="btn btn-primary login-form-button">
              Registrar
            </button>
          </div>
          <div className="register-container">
            <p>Ja tem cadastro?</p>
            <Link to="/login">
              <p>Faça Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
