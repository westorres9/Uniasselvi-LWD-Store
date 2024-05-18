import "./styles.css";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../../types/product";
import { useEffect, useState } from "react";
import * as productService from "../../../../services/product-service";
import * as brandService from "../../../../services/brand-service";
import * as categoryService from "../../../../services/category-service";
import Select from "react-select";
import { Brand } from "../../../../types/brand";
import { Category } from "../../../../types/category";
import CurrencyInput from "react-currency-input-field";
import { ToastContainer, toast } from "react-toastify";

export default function AdminProduct() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    categoryService.findAll().then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    brandService.findAll().then((response) => {
      setBrands(response.data);
      console.log(response.data);
    });
  }, []);

  const params = useParams();

  const navigate = useNavigate();

  const isEditing = params.productId !== "create";

  function handleCancel() {
    navigate("/admin/products");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      productService.findById(Number(params.productId)).then((response) => {
        console.log(response.data);
        const data = response.data as Product;
        setValue("name", data.name);
        setValue("sku", data.sku);
        setValue("price", data.price);
        setValue("imageUrl", data.imageUrl);
        setValue("description", data.description);
        setValue("specs", data.specs);
        setValue("available", data.available);
        setValue("saleOff", data.saleOff);
        setValue("category", data.category);
        setValue("brand", data.brand);

      });
    }
  }, [params.brandId, isEditing]);

  function onSubmit(product: Product) {
    if (isEditing) {
      const data = {...product, price: Number(String(product.price).replace(',','.'))}
      productService
        .update(Number(params.productId), data)
        .then((response) => {
          console.log(response.data);
          toastyUpdateSuccess();
        })
        .catch((error) => {
          console.log(error);
          toastyUpdateError();
        });
    } else {
      const data = {...product, price: Number(String(product.price).replace(',','.'))}
      console.log(data)
      productService.insert(data).then((response) => {
        console.log(response.data);
        toastyCreateSuccess();
      }).catch(error => {
        console.log(error.response);
        toastyCreateError();
      })
    }
  }

  function toastyCreateSuccess() {
    toast.success("Produto criado com sucesso!" );
  }

  function toastyCreateError() {
    toast.error("Erro ao criar Produto");
  }

  function toastyUpdateSuccess() {
    toast.info("Produto atualizado com sucesso!" );
  }

  function toastyUpdateError() {
    toast.error("Erro ao atualizar Produto");
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
        className="admin-product-form-container"
      >
         {isEditing ? <h1 className='mb-2'>Atualizar Produto</h1> : <h1 className='mb-2'>Criar Novo Produto</h1>}
        <div className="admin-form-content-container">
          <div className="admin-form-left-container">
            <div className="mb-2 admin-form-container-input">
              <label className="mb-2">Código SKU</label>
              <input
                {...register("sku", {
                  required: "Campo Obrigatório",
                })}
                type="text"
                placeholder="Código SKU"
                name="sku"
                className={`form-control base-input ${
                  errors.name ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>
            <div className="mb-2 admin-form-container-input">
              <label className="mb-2">Nome do Produto</label>
              <input
                {...register("name", {
                  required: "Campo Obrigatório",
                })}
                type="text"
                placeholder="Nome do Produto"
                name="name"
                className={`form-control base-input ${
                  errors.name ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>
            <div className="mb-2 admin-form-container-input">
              <label className="mb-2">Preço Produto</label>
              <Controller 
                name="price" 
                rules={{required: true, min: 0}} 
                control={control}
                render={({field}) => (
                  <CurrencyInput
                    placeholder="Preço"
                    className={`form-control base-input ${
                      errors.price ? "is-invalid" : ""
                    }`}
                    disableGroupSeparators={true}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
                />
              <div className="invalid-feedback d-block">
                {errors.price?.message}
              </div>
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
            <div className="mb-2 admin-form-container-input">
              <label className="mb-2">Marca</label>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    options={brands}
                    getOptionLabel={(brand: Brand) => brand.name}
                    getOptionValue={(brand: Brand) => String(brand.id)}
                  />
                )}
                control={control}
                name="brand"
                rules={{ required: true }}
              />
              <div className="invalid-feedback d-block">
                {errors.brand?.message}
              </div>
            </div>
            <div className="mb-2 admin-form-container-input">
              <label className="mb-2">Categoria</label>
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categories}
                    getOptionLabel={(category: Category) => category.name}
                    getOptionValue={(category: Category) => String(category.id)}
                  />
                )}
                control={control}
                name="category"
                rules={{ required: true }}
              />
              <div className="invalid-feedback d-block">
                {errors.category?.message}
              </div>
            </div>
            <div className="mb-2 admin-form-container-input">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  {...register("available")}
                  id="flexSwitchCheckDefault"
                />
                <label className="form-check-label">
                  Está Disponível?
                </label>
              </div>
              <div className="invalid-feedback d-block">
                {errors.available?.message}
              </div>
            </div>
            <div className="mb-2 admin-form-container-input">
            <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  {...register("saleOff")}
                  id="flexSwitchCheckDefault"
                />
                <label className="form-check-label">
                  Está em Promoção?
                </label>
              </div>
            </div>
          </div>
          <div className="admin-form-right-container">
            <div className="mb-2 admin-form-container-input">
              <label className="mb-2">Descrição</label>
              <textarea
                rows={8}
                placeholder="Descrição do produto"
                {...register("description", {
                  required: "Campo Obrigatório",
                })}
                className={`form-control base-input h-auto ${
                  errors.description ? "is-invalid" : ""
                }`}
                name="description"
              />
              <div className="invalid-feedback d-block">
                {errors.description?.message}
              </div>
            </div>
            <div className="mb-2 admin-form-container-input">
              <label className="mb-2">Specs</label>
              <textarea
                {...register("specs", {
                  required: "Campo Obrigatório",
                })}
                rows={8}
                placeholder="Especificação do produto"
                name="specs"
                className={`form-control base-input ${
                  errors.specs ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback d-block">
                {errors.specs?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="admin-product-form-button-container">
          <button onClick={handleCancel} className="btn btn-outline-danger">
            Cancelar
          </button>
          {isEditing ? (
            <button className="btn btn-navy text-white">Atualizar</button>
          ) : (
            <button className="btn btn-success">Salvar</button>
          )}
        </div>
      </form>
    </div>
  );
}
