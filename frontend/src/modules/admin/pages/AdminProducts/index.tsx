import "./styles.css";
import { useEffect, useState } from "react";
import AdminProductItem from "../../components/AdminProductItem";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/product";
import { SpringPage } from "../../../../types/springpage";
import * as productService from "../../../../services/product-service";
import AdminSearchBar from "../../components/AdminSearchBar";
import DialogConfirmation from "../../components/DialogConfirmation";
import { ToastContainer, toast } from "react-toastify";

type QueryParams = {
  page: number;
  name: string;
};
export default function AdminProducts() {
  const [productId, setProductId] = useState<number>();

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>();

  const [page, setPage] = useState<SpringPage>();

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: "",
  });

  function handleNextPage() {
    setQueryParams({ ...queryParams, name: "", page: queryParams.page + 1 });
  }

  function handlePreviousPage() {
    setQueryParams({ ...queryParams, name: "", page: queryParams.page - 1 });
  }

  function handleSearch(searchText: string) {
    setQueryParams({ ...queryParams, name: searchText, page: 0 });
  }

  function addNewProduct() {
    navigate("/admin/products/create");
  }

  function getProducts() {
    productService
      .findAllPageable(queryParams.page, queryParams.name)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.content);
        setPage(response.data);
      });
  }

  function handleDeleteClick(id: number) {
    console.log(id);
    setVisible(true);
    setProductId(id);
  }

  function handleDialogClose() {
    setVisible(false);
  }

  function handleDialogAnswer(answer: boolean, productId: number) {
    if (answer === false) {
      handleDialogClose();
      console.log(answer, productId);
    } else {
      productService
        .remove(productId)
        .then((response) => {
          console.log(response);
          handleDialogClose();
          toastyDeleteSuccess();
          getProducts();
        })
        .catch((error) => {
          handleDialogClose();
          toastyDeleteError();
          console.log(error.response.error);
        });
    }
  }

  useEffect(() => {
    getProducts();
  }, [queryParams]);

  function toastyDeleteSuccess() {
    toast.info("Produto deletado com sucesso!");
  }

  function toastyDeleteError() {
    toast.error("Erro ao deletar Produto");
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
      <h1>Produtos</h1>
      <div className="admin-product-list">
        <AdminSearchBar onSearch={handleSearch} />
        <div className="admin-product-add-button-container">
          <button onClick={addNewProduct} className="btn btn-navy text-white">
            Adicionar
          </button>
        </div>
        {products?.map((product) => (
          <AdminProductItem
            key={product.id}
            product={product}
            onDeleteClick={handleDeleteClick}
          />
        ))}
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
        {visible && productId && (
          <DialogConfirmation
            id={productId}
            onDialogAnswer={handleDialogAnswer}
          />
        )}
      </div>
    </div>
  );
}
