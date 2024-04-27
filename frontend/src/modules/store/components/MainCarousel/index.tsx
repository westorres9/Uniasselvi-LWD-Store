import "./styles.css";
import { Carousel } from "react-bootstrap";
import Banner1 from "../../../../assets/1.png";
import Banner2 from "../../../../assets/2.png";
import Banner3 from "../../../../assets/3.png";
import Banner4 from "../../../../assets/4.png";
import Banner5 from "../../../../assets/5.png";
import Banner6 from "../../../../assets/6.png";
import Banner7 from "../../../../assets/7.png";

export default function MainCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={Banner1} className="carousel-img" alt="Banner1" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner2} className="carousel-img" alt="Banner2" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner3} className="carousel-img" alt="Banner3" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner4} className="carousel-img" alt="Banner4" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner5} className="carousel-img" alt="Banner5" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner6} className="carousel-img" alt="Banner6" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner7} className="carousel-img" alt="Banner7" />
      </Carousel.Item>
    </Carousel>
  );
}
