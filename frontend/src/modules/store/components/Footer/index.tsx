import "./styles.css";
import LetsEncript from "../../../../assets/images/lets_encrypt.png";
import GoogleSafe from "../../../../assets/images/googlesafe.png";
import American from "../../../../assets/images/american.png";
import Elo from "../../../../assets/images/elo.png";
import Dinners from "../../../../assets/images/diners.png";
import Visa from "../../../../assets/images/visa.png";
import Boleto from "../../../../assets/images/boleto.png";
import MasterCard from "../../../../assets/images/mastercard.png";
import Pix from "../../../../assets/images/pix.png";

export default function Footer() {
  return (
    <footer className="page-footer font-small bg-dark text-white pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-3 mt-md-0 mt-3">
            <h5 className="text-uppercase">LWD Store</h5>
            <p className="text-primary font-bold mt-3">Atendimento</p>
            <p>De Segunda a Sexta das 08:00 as 18:00</p>
            <p>Aos Sábados de 08:00 a 12:00</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-primary font-bold mt-3 mb-3">Minha Conta</h5>
            <ul className="list-unstyled">
              <li className="mb-1">
                <a href="#!">Meu Carrinho</a>
              </li>
              <li className="mb-1">
                <a href="#!">Meus Pedidos</a>
              </li>
              <li className="mb-1">
                <a href="#!">Login</a>
              </li>
              <li className="mb-1">
                <a href="#!">Registrar</a>
              </li>
              <li className="mb-1">
                <a href="#!">Fale Conosco</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-primary font-bold mt-3 mb-3">Quem Somos</h5>
            <ul className="list-unstyled">
              <li className="mb-1">
                <a href="#!">
                  <p>Política de Garantia</p>
                </a>
              </li>
              <li className="mb-1">
                <a href="#!">
                  <p>Troca e Devoluções</p>
                </a>
              </li>
              <li className="mb-1">
                <a href="#!">
                  <p>Segurança e Privacidade</p>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-primary font-bold mt-3 mb-3">Site Seguro</h5>
            <ul className="list-unstyled">
              <li className="mb-1">
                <div className="row footer-icons">
                  <img src={LetsEncript} alt="" />
                  <img src={GoogleSafe} alt="" />
                </div>
              </li>
              <h5 className="text-primary font-bold mt-3 mb-3">
                Formas de Pagamento
              </h5>
              <li className="mb-1">
                <div className="row footer-icons">
                  <img src={American} alt="" />
                  <img src={Dinners} alt="" />
                  <img src={Elo} alt="" />
                  <img src={MasterCard} alt="" />
                </div>
              </li>
              <li className="mb-1">
                <div className="row footer-icons">
                  <img src={Visa} alt="" />
                  <img src={Boleto} alt="" />
                  <img src={Pix} alt="" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
