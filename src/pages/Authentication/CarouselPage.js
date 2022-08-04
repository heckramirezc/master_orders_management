import React from "react"
import { Col } from "reactstrap"
import Slider from "react-slick";

const CarouselPage = () => {

  const bannerSettings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    infinite: true,
    pauseOnHover: false,
    initialSlide: 1,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg">
          <div className="w-100">
            <div className="banner">
              <Slider {...bannerSettings}>
                <div className="slider-container">
                  <picture>
                    <img src="https://grupomaster.com.gt/wp-content/uploads/2019/06/Whatsapp-2560x1324-1.jpg" alt="" />
                  </picture>
                </div>
                <div className="slider-container">
                  <picture>
                    <img src="https://grupomaster.com.gt/wp-content/uploads/2019/06/Banner-Web-2560x1324-1.jpg" alt="" />
                  </picture>
                </div>
                <div className="slider-container">
                  <picture>
                    <img src="https://grupomaster.com.gt/wp-content/uploads/2019/06/Enactus-2560x1324-1.jpg" alt="" />
                  </picture>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
