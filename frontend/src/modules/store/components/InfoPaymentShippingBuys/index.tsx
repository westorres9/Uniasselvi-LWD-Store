import "./styles.css";
import FastShipping from "../../../../assets/images/fast-ship.png";
import EasyExchange from "../../../../assets/images/easy-exchange.png";
import ParceledBuy from "../../../../assets/images/parceled.png";
import BestBrands from "../../../../assets/images/best-brands.png";
import InfoCart from "../InfoCard";

export default function InfoPaymentShippingBuys() {
  return (
    <div className=" info-payment-shipping-buys-container">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            <InfoCart image={FastShipping} message="Entrega Rápida" />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <InfoCart image={EasyExchange} message="Troca Fácil" />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <InfoCart image={ParceledBuy} message="10x sem juros" />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <InfoCart image={BestBrands} message="Melhores Marcas" />
          </div>
        </div>
      </div>
    </div>
  );
}
