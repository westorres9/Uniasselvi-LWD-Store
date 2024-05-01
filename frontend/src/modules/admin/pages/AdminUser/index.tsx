import './styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../../../types/user";
import * as userService from '../../../../services/user-service';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function AdminUser() {
    const params = useParams();

  const isEditing = params.userId !== "create";

  const navigate = useNavigate();

  function handleCancel() {
    navigate("/admin/users");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>();

  useEffect(() => {
    if (isEditing) {
      userService.findById(Number(params.userId)).then((response) => {
        console.log(response.data);
        const user = response.data;
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
        setValue("password", user.password);
        setValue("roles", user.roles);
      });
    }
  }, [params.userId, isEditing]);

  function onSubmit(user: User) {
    if (isEditing) {
      userService
        .update(Number(params.userId), user)
        .then((response) => {
          console.log(response.data);
          toastyUpdateSuccess();
        })
        .catch((error) => {
          console.log(error);
          toastyUpdateError();
        });
    } else {
      userService.insertOperator(user)
        .then((response) => {
          console.log(response.data);
          toastyCreateSuccess();
        })
        .catch((error) => {
          console.log(error);
          toastyCreateError();
        });
    }
  }

  function toastyCreateSuccess() {
    toast.success("Usuário criado com sucesso!" );
  }

  function toastyCreateError() {
    toast.error("Erro ao criar Usuário");
  }

  function toastyUpdateSuccess() {
    toast.info("Usuário atualizado com sucesso!" );
  }

  function toastyUpdateError() {
    toast.error("Erro ao atualizar Usuário");
  }


  return (
    <div className="container admin-dashboard">
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="admin-user-form-container"
      >
        {isEditing ? (
          <h1 className="mb-2">Atualizar Usuário</h1>
        ) : (
          <h1 className="mb-2">Criar Novo Usuário</h1>
        )}
        <div className="mb-2 admin-form-container-input">
          <label className="mb-2">Primeiro Nome</label>
          <input
            {...register("firstName", {
              required: "Campo Obrigatório",
            })}
            type="text"
            placeholder="Primeiro nome"
            name="firstName"
            className={`form-control base-input ${
              errors.firstName ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">{errors.firstName?.message}</div>
        </div>
        <div className="mb-2 admin-form-container-input">
          <label className="mb-2">Sobrenome</label>
          <input
            {...register("lastName", {
              required: "Campo Obrigatório",
            })}
            type="text"
            placeholder="Sobrenome"
            name="lastName"
            className={`form-control base-input ${
              errors.lastName ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">{errors.lastName?.message}</div>
        </div>
        <div className="mb-2 admin-form-container-input">
          <label className="mb-2">Email</label>
          <input
            {...register("email", {
              required: "Campo Obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              }
            })}
            type="text"
            placeholder="email"
            name="email"
            className={`form-control base-input ${
              errors.email ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.email?.message}
          </div>
        </div>
        <div className="admin-user-form-button-container">
          {isEditing ? (
            <button className="btn btn-navy text-white">Atualizar</button>
          ) : (
            <button className="btn btn-outline-success">Salvar</button>
          )}
          <button onClick={handleCancel} className="btn btn-outline-danger">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
