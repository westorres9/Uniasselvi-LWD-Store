import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Credentials } from "../../../../types/auth";
import { useContext, useState } from "react";
import * as authService from '../../../../services/auth-service';
import { ContextToken } from "../../../../utils/context-token";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const navigate = useNavigate();

  const { setContextTokenPayload } = useContext(ContextToken);

  const [hasError, setHasError] = useState(false);

  function onSubmit(formData: Credentials) {
    authService
    .loginRequest(formData)
    .then((response) => {
      setHasError(false);
      authService.saveAccessToken(response.data.access_token);
      setContextTokenPayload(authService.getAccessTokenPayload());
      console.log(response)
      if (authService.hasAnyRoles(["ROLE_CLIENT"])) {
        navigate("/cart");
      } else if (authService.hasAnyRoles(["ROLE_ADMIN", "ROLE_OPERATOR"])) {
        navigate("/admin");
      }
    })
    .catch((error) => {
      setHasError(true);
      console.log(error);
    });
  }

  return (
    <div className="container ">
      <div className="login-container">
        <h1>Login</h1>
        {hasError && (
          <div className="alert alert-danger alert-dialog">
            Erro ao tentar efetuar o Login
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form-container"
        >
          <div className="mb-4">
            <input
              {...register("username", {
                required: "Campo Obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              type="email"
              placeholder="Email"
              name="username"
              className={`login-form form-control base-input ${
                errors.username ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
          </div>
          <div>
            <input
              {...register("password", {
                required: "Campo Obrigatório",
              })}
              type="password"
              placeholder="Senha"
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
              Fazer Login
            </button>
          </div>
          <div className="register-container">
            <p>Não tem cadastro?</p>
            <Link to="/register">
              <p>Registre-se</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
