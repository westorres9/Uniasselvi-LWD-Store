import "./styles.css";
import TruckIcon from "../../../../assets/images/caminhao-de-entrega.png";
import SecuryIcon from "../../../../assets/images/negociacao.png";
import MoneyIcon from "../../../../assets/images/pagamento-em-dinheiro.png";
import SuportIcon from "../../../../assets/images/bate-papo-online.png";
import CardIcon from "../CardIcon";

export default function CardIconList() {
  return (
    <div className="container card-container">
      <div className="row">
        <div className="col-sm card-item">
          <CardIcon
            imageUrl={TruckIcon}
            title={"Frete Grátis"}
            subtitle={"Para compras de até R$100,00"}
          />
        </div>
        <div className="col-sm card-item">
          <CardIcon
            imageUrl={SecuryIcon}
            title={"Pagamento seguro"}
            subtitle={"Nós garantimos seu pagamento seguro"}
          />
        </div>
        <div className="col-sm card-item">
          <CardIcon
            imageUrl={MoneyIcon}
            title={"Devolução garantida"}
            subtitle={"30 dias para reembolso"}
          />
        </div>
        <div className="col-sm card-item">
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