import React, { useState, useEffect } from "react"
import { Col } from "reactstrap"
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { getOffers } from "../../store/actions";

const CarouselPage = () => {
  const dispatch = useDispatch();

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    dispatch(getOffers({type: 2}));
  }, [])

  const { loading } = useSelector(state => ({
    loading: state.Home.loading,
  }));

  const { offersResponse } = useSelector(state => ({
    offersResponse: state?.Home?.offers,
  }));
  
  useEffect(() => {
    if(offersResponse && offersResponse.length && offersResponse.length > 0) {
      setOffers(offersResponse)
    }
  }, [offersResponse]);

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
                {offers.map((offer, key) => (
                  <div className="slider-container" key={key}>
                    <picture>
                      <img src={offer?.image?.url} alt="" />
                    </picture>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
