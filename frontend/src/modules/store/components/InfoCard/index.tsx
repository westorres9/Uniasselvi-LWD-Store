import "./styles.css";

type Props = {
  image: string;
  message: string;
};
export default function InfoCart({ image, message }: Props) {
  return (
    <div className="info-card-container">
      <div className="info-card-img-container">
        <img src={image} alt="" />
      </div>
      <div className="info-card-description-container">
        <h4>{message}</h4>
      </div>
    </div>
  );
}
