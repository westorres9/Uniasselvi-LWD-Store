import "@popperjs/core";
import "bootstrap/js/dist/carousel";
import { Carousel } from "react-bootstrap";

export default function MainCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1705636206/tool-store-pro/banner/gcyynhch7f2qnxwscmpg.png"
          alt=""
          width="100%"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1705636206/tool-store-pro/banner/mkzzoeq6ps4wcwxytrxo.png"
          alt=""
          width="100%"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1705636206/tool-store-pro/banner/vuitjudkgjtrnu2lugwl.png"
          alt=""
          width="100%"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://res.cloudinary.com/dm6it5mnf/image/upload/v1705636206/tool-store-pro/banner/ufrgfl4gdqlcjr1aa46h.png"
          alt=""
          width="100%"
        />
      </Carousel.Item>
    </Carousel>
  );
}
