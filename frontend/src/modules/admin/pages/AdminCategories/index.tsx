import "./styles.css";
import AdminCategoryItem from "../../components/AdminCategoryItem";
import AdminSearchBar from "../../components/AdminSearchBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../../types/category";
import { SpringPage } from "../../../../types/springpage";
import * as categoryService from "../../../../services/category-service";
import DialogConfirmation from "../../components/DialogConfirmation";
import { ToastContainer, toast } from "react-toastify";

type QueryParams = {
  page: number;
  name: string;
};

export default function AdminCategories() {
  const [categoryId, setCategoryId] = useState<number>();

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

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

  function addNewCategory() {
    navigate("/admin/categories/create");
  }

  function getCategories() {
    categoryService
      .findAllPageable(queryParams.name, queryParams.page)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.content);
        setPage(response.data);
      })
      .catch((error) => {
        console.log(error.data.error);
      });
  }

  function handleDeleteClick(id: number) {
    console.log(id);
    setVisible(true);
    setCategoryId(id);
  }

  function handleDialogClose() {
    setVisible(false);
  }

  function handleDialogAnswer(answer: boolean, categoryId: number) {
    if (answer === false) {
      handleDialogClose();
      console.log(answer, categoryId);
    } else {
      categoryService
        .remove(categoryId)
        .then((response) => {
          console.log(response);
          handleDialogClose();
          toastyDeleteSuccess();
          getCategories();
        })
        .catch((error) => {
          handleDialogClose();
          toastyDeleteError();
          console.log(error.data.error);
        });
    }
  }

  useEffect(() => {
    getCategories();
  }, [queryParams]);

  function toastyDeleteSuccess() {
    toast.info("Categoria deletada com sucesso!");
  }

  function toastyDeleteError() {
    toast.error("Erro ao deletar Categoria");
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
      <h1>Categorias</h1>
      <div className="admin-category-list">
        <AdminSearchBar onSearch={handleSearch} />
        <div className="admin-category-add-button-container">
          <button onClick={addNewCategory} className="btn btn-navy text-white">
            Adicionar
          </button>
        </div>
        {categories.map((cat) => (
          <AdminCategoryItem
            key={cat.id}
            category={cat}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
      <nav className="page-navigation">
        <ul className="pagination">
          <li className="page-item bg-white">
            {page && (
              <button
                onClick={handlePreviousPage}
                className={`page-link  ${
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
      {visible && categoryId && (
        <DialogConfirmation
          id={categoryId}
          onDialogAnswer={handleDialogAnswer}
        />
      )}
    </div>
  );
}
