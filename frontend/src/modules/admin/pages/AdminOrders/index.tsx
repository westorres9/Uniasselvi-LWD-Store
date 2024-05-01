import './styles.css';
import { useEffect, useState } from "react";
import AdminOrderItem from "../../components/AdminOrderItem"
import { Order } from "../../../../types/order";
import { SpringPage } from "../../../../types/springpage";
import * as orderService from "../../../../services/order-service";

type QueryParams = {
    page: number;
};
export default function AdminOrders() {

  const [orders, setOrders] = useState<Order[]>([]);

  const [page, setPage] = useState<SpringPage>();

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0
  });

  function handleNextPage() {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  function handlePreviousPage() {
    setQueryParams({ ...queryParams, page: queryParams.page - 1 });
  }

  function getOrders() {
    orderService
      .findAllPaged(queryParams.page)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data.content);
        setPage(response.data);
      })
      .catch((error) => {
        console.log(error.data.error);
      });
  }


  useEffect(() => {
    getOrders();
  }, [queryParams]);

  return (
    <div className="container admin-dashboard">
      <h1>Pedidos</h1>
      <div className="admin-order-list">
        <div className="admin-order-add-button-container">
        </div>
        {orders.map((order) => (
          <AdminOrderItem
            key={order.id}
            order={order}
          />
        ))}
      </div>
      <nav className="page-navigation">
        <ul className="pagination">
          <li className="page-item bg-white">
            {page && (
              <button
                onClick={handlePreviousPage}
                className={`page-link ${
                  page.first ? "disabled text-dark" : "bg-navy text-white"
                }`}
              >
                Anterior
              </button>
            )}
          </li>
          <li className="page-item bg-white">
            <a className="page-link disabled" href="#">
              {"#"}
            </a>
          </li>
          <li className="page-item">
            {page && (
              <button
                onClick={handleNextPage}
                className={`page-link ${
                  page.last ? "disabled text-dark" : "bg-navy text-white"
                }`}
              >
                Próxima
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
