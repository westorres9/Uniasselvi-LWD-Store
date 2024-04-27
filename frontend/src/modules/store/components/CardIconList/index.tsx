
import "./styles.css";
import TruckIcon from "../../../../assets/caminhao-de-entrega.png";
import SecuryIcon from "../../../../assets/negociacao.png";
import MoneyIcon from "../../../../assets/pagamento-em-dinheiro.png";
import SuportIcon from "../../../../assets/bate-papo-online.png";
import CardIcon from "../CardIcon";

export default function CardIconList() {
  return (
    <div className="container card-container">
      <div className="row">
        <div className="col col-sm-6 col-lg-3 card-item">
          <CardIcon
            imageUrl={TruckIcon}
            title={"Frete Grátis"}
            subtitle={"Para compras de até R$100,00"}
          />
        </div>
        <div className="col col-sm-6 col-lg-3 card-item">
          <CardIcon
            imageUrl={SecuryIcon}
            title={"Pagamento seguro"}
            subtitle={"Nós garantimos seu pagamento seguro"}
          />
        </div>
        <div className="col col-sm-6 col-lg-3 card-item">
          <CardIcon
            imageUrl={MoneyIcon}
            title={"Devolução garantida"}
            subtitle={"30 dias para reembolso"}
          />
        </div>
        <div className="col col-sm-6 col-lg-3 card-item">
          <CardIcon
            imageUrl={SuportIcon}
            title={"Suporte online"}
            subtitle={"24hrs de suporte dedicado"}
          />
        </div>
      </div>
    </div>
  );
}
