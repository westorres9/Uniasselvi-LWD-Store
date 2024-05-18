import { useForm } from "react-hook-form";
import "./styles.css";
import * as newsletterService from '../../../../services/newsletter-service';
import { NewsletterForm } from "../../../../types/newsletter";
import { ToastContainer, toast } from "react-toastify";


export default function Newsletter() {

  const {
    register,
    handleSubmit,
  } = useForm<NewsletterForm>();

  function onSubmit(form: NewsletterForm) {
   newsletterService.registerOnNewsletter(form).then(() => {
    toastyUpdateSuccess();
   }).catch(() => {
    toastyUpdateError();
   })
  }

  function toastyUpdateSuccess() {
    toast.info("Registro concluído com successo! Agora você receberá novidades em seu email!" );
  }

  function toastyUpdateError() {
    toast.error("O email informado já existe!");
  }
  return (
    <div className="bg-primary">
      <div className="container newsletter-container">
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
        <h2>Assine nossa Newsletter.</h2>
        <p>Cadastre-se e fique por dentro das novidades</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="newsletter-form">
            <input
              className="newsletter-input form-control base-input"
              {...register("email",{
                required: "Campo Obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
              name="email"
              type="email"
              placeholder="name@example.com"
            />
            <button className="btn btn-dark newsletter-button">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
