import "./styles.css";
import { useEffect, useState } from "react";
import * as userService from '../../../../services/user-service';
import { useNavigate } from "react-router-dom";
import { SpringPage } from "../../../../types/springpage";
import AdminSearchBar from "../../components/AdminSearchBar";
import DialogConfirmation from "../../components/DialogConfirmation";
import { User } from "../../../../types/user";
import AdminUserItem from "../../components/AdminUserItem";
import { ToastContainer, toast } from "react-toastify";

type QueryParams = {
  page: number;
  name: string;
};
export default function AdminUsers() {

  const [userId, setUserId] =  useState<number>();

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

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

  function addNewUser() {
    navigate("/admin/users/create")
  }

  function getUsers() {
    userService.findAllPageable(queryParams.name, queryParams.page).then(response => {
      console.log(response.data.content)
      setUsers(response.data.content);
      setPage(response.data);
    });
  }

  function handleDeleteClick(id: number) {
    console.log(id);
    setVisible(true);
    setUserId(id);
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
      userService.remove(brandId).then(response => {
        console.log(response);
        handleDialogClose();
        toastyDeleteSuccess();
        getUsers();
      }).catch(error => {
        handleDialogClose();
        toastyDeleteError();
        console.log(error.response.error);
      })
    }
  }

  useEffect(() => {
    getUsers();
  },[queryParams]);

  function toastyDeleteSuccess() {
    toast.info("Usuário deletado com sucesso!" );
  }

  function toastyDeleteError() {
    toast.error("Erro ao deletar Usuário");
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
      <h1>Usuários</h1>
      <div className="admin-user-list">
      <AdminSearchBar onSearch={handleSearch}/>
        <div className="admin-user-add-button-container">
          <button onClick={addNewUser} className="btn btn-navy text-white">Adicionar</button>
        </div>
        {
          users.map(user => (
          <AdminUserItem key={user.id} user={user} onDeleteClick={() => handleDeleteClick(user.id)} />
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
        visible && userId &&  <DialogConfirmation id={userId} onDialogAnswer={handleDialogAnswer} />
      }
    </div>
  );
}
