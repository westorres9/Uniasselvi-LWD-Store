/* eslint-disable */


import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "../../../../types/order";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as orderService from "../../../../services/order-service";
import { ToastContainer, toast } from "react-toastify";

export default function AdminOrder() {
  const params = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>();
  const { handleSubmit, formState: { errors }, setValue,register} = useForm<Order>();

  const statusValue = ["PENDENTE", "ENVIADO", "ENTREGUE", "PAGO", "CANCELADO"];

  function handleCancel() {
    navigate("admin/orders");
  }

  useEffect(() => {
    orderService.findById(Number(params.orderId)).then((response) => {
      console.log(response.data);
      setOrder(response.data);
      const data = response.data as Order;
      setValue("id", data.id);
      setValue("client", data.client);
      setValue("items", data.items);
      setValue("status", data.status);
      setValue("total", data.total);
    });
  }, [params.orderId]);

  function onSubmit(order: Order) {
    console.log(order);
    orderService.changeStatus(Number(params.orderId), order)
      .then((response) => {
        console.log(response);
        toastyUpdateSuccess();
      })
      .catch((error) => {
        console.log(error.response);
        toastyUpdateError();
      });
  }

  function toastyUpdateSuccess() {
    toast.info("Status atualizado com sucesso!");
  }

  function toastyUpdateError() {
    toast.error("Erro ao atualizar Status");
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
      <form onSubmit={handleSubmit(onSubmit)} className="admin-order-form-container">
        <h2 className="mb-2">Dados do Pedido</h2>
        <div className="mb-2 admin-form-container-input">
          <h5 className="mb-2">Id do Pedido: Nº 00{order?.id}</h5>
          <h5 className="mb-2">Cliente: {order?.client && order?.client.name}</h5>
          <h5 className="mb-2">Items:</h5>
          <table className="table" style={{ width: "100%", backgroundColor: "#fff" }}>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Preço</th>
                <th>Qtd</th>
              </tr>
            </thead>
            <tbody>
              {order?.items.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <img src={item.imageUrl} alt={item.name} width="30px" />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h5 className="mb-2">Total do Pedido: R$ {order?.total}</h5>
        <div className="mb-2 admin-form-container-input">
          <label className="mb-2">Status do Pedido:</label>
          <select  {...register("status") } name="status">
            {
              statusValue.map( item => (
                <option value={item}>{item}</option>
              ))
            }
      </select>
          <div className="invalid-feedback d-block">{errors.status?.message}</div>

        </div>
        <div className="admin-brand-form-button-container">
          <button className="btn btn-navy text-white">Salvar</button>
          <button onClick={handleCancel} className="btn btn-outline-danger">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}