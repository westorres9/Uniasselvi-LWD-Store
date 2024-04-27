import "./styles.css";
import CardBanner1 from "../../../../assets/card-banner-1.png";
import CardBanner2 from "../../../../assets/card-banner-2.png";

export default function CardBanner() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-lg card-banner-img">
                    <img src={CardBanner1} alt="" />
                </div>
                <div className="col-sm-12 col-lg card-banner-img">
                    <img src={CardBanner2} alt="" />
                </div>
            </div>
        </div>
    )
}