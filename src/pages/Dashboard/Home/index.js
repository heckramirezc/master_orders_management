import React, { useState, useEffect } from "react"
import { 
  Row, 
  Col,
  Container, 
  Alert
} from "reactstrap"
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import PropTypes from 'prop-types'
import { withTranslation } from "react-i18next"
import StackGrid, { transitions } from "react-stack-grid";
import { useSelector, useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom"

import { getOffers } from "../../../store/actions";

const Home = props => {
  const dispatch = useDispatch();
  const { scaleDown } = transitions;
  const [offers, setOffers] = useState([]);
  const [photoIndex, setphotoIndex] = useState(0);
  const [isGallery, setisGallery] = useState(false);

  let { error } = useSelector(state => ({
    error: state.Home.error,
  }));

  useEffect(() => {
    error = null
    dispatch(getOffers({type: 0}));
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

  return (
    <React.Fragment>
      {error ? <Alert color="danger">{error}</Alert> : null}
      {loading ? 
        <Row>
          <Col xs="12">
            <div className="text-center text-info mt-5">
                <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                Obteniendo ofertas
            </div>
          </Col>
        </Row> 
      : null }
      <Container fluid>
      {isGallery ? (
            <Lightbox
              mainSrc={offers[photoIndex].image.url}
              nextSrc={offers[(photoIndex + 1) % offers.length].image.url}
              prevSrc={offers[(photoIndex + offers.length - 1) % offers.length].image.url}
              enableZoom={true}
              onCloseRequest={() => {
                setisGallery(false);
              }}
              onMovePrevRequest={() => {
                setphotoIndex((photoIndex + offers.length - 1) % offers.length);
              }}
              onMoveNextRequest={() => {
                setphotoIndex((photoIndex + 1) % offers.length);
              }}
            />
          ) : null}
        <StackGrid
          columnWidth={"30%"}
          gutterWidth={30}
          gutterHeight={30}
          appearDelay={50}
          appear={scaleDown.enter}
          appeared={scaleDown.appeared}
          enter={scaleDown.enter}
          entered={scaleDown.entered}
          leaved={scaleDown.leaved}
          monitorImagesLoaded={true}
        >
          {offers.map((offer, key) => (
            <img
              key={key}
              className="rounded"
              src={offer.image.url}
              onClick={() => {
                setisGallery(true);
                setphotoIndex(0);
              }}
              alt=""
              style={{
                width: '100%',
                resizeMode: 'contain'
              }}
            />
          ))}
        </StackGrid>
      </Container>
    </React.Fragment>
  )
}

Home.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Home))
)