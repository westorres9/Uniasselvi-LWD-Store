import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Category } from "../../../../types/category";
import { useForm } from "react-hook-form";
import * as categoryService from "../../../../services/category-service";
import { ToastContainer, toast } from "react-toastify";

export default function AdminCategory() {
  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.categoryId !== "create";

  function handleCancel() {
    navigate("/admin/categories");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Category>();

  useEffect(() => {
    if (isEditing) {
      categoryService.findById(Number(params.categoryId)).then((response) => {
        console.log(response.data);
        const category = response.data;
        setValue("name", category?.name);
        setValue("imageUrl", category.imageUrl);
      });
    }
  }, [params.categoryId, isEditing]);

  function onSubmit(category: Category) {
    if (isEditing) {
      categoryService
        .update(Number(params.categoryId), category)
        .then((response) => {
          console.log(response.data);
          toastyUpdateSuccess();
        })
        .catch((error) => {
          console.log(error.response.error);
          toastyUpdateError();
        });
    } else {
      categoryService
        .insert(category)
        .then((response) => {
          console.log(response.data);
          toastyCreateSuccess();
        })
        .catch((error) => {
          console.log(error.response.error);
          toastyCreateError();
        });
    }
  }

  function toastyCreateSuccess() {
    toast.success("Categoria criada com sucesso!" );
  }

  function toastyCreateError() {
    toast.error("Erro ao criar Categoria");
  }

  function toastyUpdateSuccess() {
    toast.info("Categoria atualizada com sucesso!" );
  }

  function toastyUpdateError() {
    toast.error("Erro ao atualizar Categoria");
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
        className="admin-category-form-container"
      >
        {isEditing ? (
          <h1 className="mb-2">Atualizar Categoria</h1>
        ) : (
          <h1 className="mb-2">Criar Nova Categoria</h1>
        )}
        <div className="mb-2 admin-form-container-input">
          <label className="mb-2">Nome da Categoria</label>
          <input
            {...register("name", {
              required: "Campo Obrigatório",
            })}
            type="text"
            placeholder="Nome da Categoria"
            name="name"
            className={`form-control base-input ${
              errors.name ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">{errors.name?.message}</div>
        </div>
        <div className="mb-2 admin-form-container-input">
          <label className="mb-2">URL da imagem</label>
          <input
            {...register("imageUrl", {
              required: "Campo Obrigatório",
            })}
            type="text"
            placeholder="URL da imagem"
            name="imageUrl"
            className={`form-control base-input ${
              errors.imageUrl ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback d-block">
            {errors.imageUrl?.message}
          </div>
        </div>
        <div className="admin-category-form-button-container">
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
