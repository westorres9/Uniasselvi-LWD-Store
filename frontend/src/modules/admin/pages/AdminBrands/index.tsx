import "./styles.css";
import { Brand } from "../../../../types/brand";
import AdminBrandItem from "../../components/AdminBrandItem";
import { useEffect, useState } from "react";
import * as brandService from '../../../../services/brand-service';
import { useNavigate } from "react-router-dom";
import { SpringPage } from "../../../../types/springpage";
import AdminSearchBar from "../../components/AdminSearchBar";
import DialogConfirmation from "../../components/DialogConfirmation";
import { ToastContainer, toast } from "react-toastify";

type QueryParams = {
  page: number;
  name: string;
};
export default function AdminBrands() {

  const [brandId, setBrandId] =  useState<number>();

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const [brands, setBrands] = useState<Brand[]>([]);

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
    setQueryParams({ ...queryParams, page: 0, name: searchText });
  }

  function addNewBrand() {
    navigate("/admin/brands/create")
  }

  function getBrands() {
    brandService.findAllPaged(queryParams.name, queryParams.page).then(response => {
      console.log(response.data.content)
      setBrands(response.data.content);
      setPage(response.data);
    });
  }

  function handleDeleteClick(id: number) {
    console.log(id);
    setVisible(true);
    setBrandId(id);
  }

  function handleDialogClose() {
    setVisible(false);
  }

  function handleDialogAnswer(answer: boolean, brandId: number) {
    if(answer === false) {
      handleDialogClose()
      console.log(answer, brandId)
    }
    else {
      brandService.remove(brandId).then(response => {
        console.log(response);
        handleDialogClose();
        toastyDeleteSuccess();
        getBrands();
      }).catch(error => {
        handleDialogClose();
        toastyDeleteError();
        console.log(error.response.error);
      })
    }
  }

  useEffect(() => {
    getBrands();
  },[queryParams]);

  function toastyDeleteSuccess() {
    toast.info("Marca deletada com sucesso!" );
  }

  function toastyDeleteError() {
    toast.error("Erro ao deletar marca");
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
      <h1>Marcas</h1>
      <div className="admin-brand-list">
      <AdminSearchBar onSearch={handleSearch}/>
        <div className="admin-brand-add-button-container">
          <button onClick={addNewBrand} className="btn btn-navy text-white">Adicionar</button>
        </div>
        {
          brands.map(brand => (
          <AdminBrandItem key={brand.id} brand={brand} onDeleteClick={() => handleDeleteClick(brand.id)} />
          ))
        }
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
      {
        visible && brandId &&  <DialogConfirmation id={brandId} onDialogAnswer={handleDialogAnswer} />
      }
    </div>
  );
}
