import "./styles.css";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as brandService from "../../../../services/brand-service";
import { Brand } from "../../../../types/brand";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function AdminBrand() {
  const params = useParams();

  const isEditing = params.brandId !== "create";

  const navigate = useNavigate();

  function handleCancel() {
    navigate("/admin/brands");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Brand>();

  useEffect(() => {
    if (isEditing) {
      brandService.findById(Number(params.brandId)).then((response) => {
        console.log(response.data);
        const brand = response.data;
        setValue("name", brand.name);
        setValue("imageUrl", brand.imageUrl);
      });
    }
  }, [params.brandId, isEditing]);

  function onSubmit(brand: Brand) {
    if (isEditing) {
      brandService
        .update(Number(params.brandId), brand)
        .then((response) => {
          console.log(response.data);
          toastyUpdateSuccess();
          setTimeout(() => {
            navigate("/admin/brands")
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          toastyUpdateError();
        });
    } else {
      brandService
        .insert(brand)
        .then((response) => {
          console.log(response.data);
          toastyCreateSuccess();
          setTimeout(() => {
            navigate("/admin/brands")
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
          toastyCreateError();
        });
    }
  }

  function toastyCreateSuccess() {
    toast.success("Marca criada com sucesso!" );
  }

  function toastyCreateError() {
    toast.error("Erro ao criar marca");
  }

  function toastyUpdateSuccess() {
    toast.info("Marca atualizada com sucesso!" );
  }

  function toastyUpdateError() {
    toast.error("Erro ao atualizar marca");
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
        className="admin-brand-form-container"
      >
        {isEditing ? (
          <h1 className="mb-2">Atualizar Marca</h1>
        ) : (
          <h1 className="mb-2">Criar Nova Marca</h1>
        )}
        <div className="mb-2 admin-form-container-input">
          <label className="mb-2">Nome da Marca</label>
          <input
            {...register("name", {
              required: "Campo Obrigatório",
            })}
            type="text"
            placeholder="Nome da Marca"
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
        <div className="admin-brand-form-button-container">
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
