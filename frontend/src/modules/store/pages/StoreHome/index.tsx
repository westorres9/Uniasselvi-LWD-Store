import Highligths from "../../components/Highligths";
import InfoPaymentShippingBuys from "../../components/InfoPaymentShippingBuys";
import MainCarousel from "../../components/MainCarousel";

export default function StoreHome() {
  return (
    <>
      <MainCarousel />
      <InfoPaymentShippingBuys />
      <Highligths title="Mais Vendidos" id={1}/>
      <img
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748238/tool-store-pro/categories/pag2ydwvypo5txnduktc.png"
        width="100%"
        alt=""
      />
      <Highligths title="Seleçao Especial" id={2}/>
      <img
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748237/tool-store-pro/categories/dm5hcvs0tfort4vailcb.png"
        width="100%"
        alt=""
      />
      <Highligths title="Destaques" id={3}/>
      <img
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748237/tool-store-pro/categories/rsmnwcbjh7bq59vfxtxo.png"
        width="100%"
        alt=""
      />
      <Highligths title="Lançamentos" id={4}/>
      <img
        src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1704748238/tool-store-pro/categories/zfdq27mmskqqilq6l82k.png"
        width="100%"
        alt=""
      />
    </>
  );
}
