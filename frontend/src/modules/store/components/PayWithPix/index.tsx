import "./styles.css";
import PixLogo from "../../../../assets/pix.png";

export default function PayWithPix() {
    return (
        <div className="pay-with-pix-content">
            <div className="pay-with-pix-container">
                <p>Pague com</p>
                <img src={PixLogo} alt="" />
            </div>
        </div>
    )
}