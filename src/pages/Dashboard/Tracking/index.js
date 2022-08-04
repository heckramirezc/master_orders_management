import React, { useState, useEffect } from "react"
import { 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  Container, 
  Alert, 
  Spinner
} from "reactstrap"
import PropTypes from 'prop-types'
import { withTranslation } from "react-i18next"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import { useSelector, useDispatch, connect } from "react-redux";
import { withRouter } from "react-router-dom"

import { tracking } from "../../../store/actions";
import user1 from "../../../assets/images/users/avatar-1.png"

const Tracking = props => {
  const dispatch = useDispatch();
  const [reception, setReception] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    if (localStorage.getItem("reception")) {
      const reception = localStorage.getItem("reception")
      setReception(reception)
      if(reception){
        dispatch(tracking(reception));
      }
    }

    if (localStorage.getItem("authUser")) {
      const authUser = JSON.parse(localStorage.getItem("authUser"))
      setUser(authUser)
    }
  }, [props.success])

  const { error } = useSelector(state => ({
    error: state.Tracking.error,
  }));

  const { loading } = useSelector(state => ({
    loading: state.Tracking.loading,
  }));

  const { events } = useSelector(state => ({
    events: state?.Tracking?.tracking,
  }));

  return (
    <React.Fragment>
      {error ? <Alert color="danger">{error}</Alert> : null}
      <section className="section" id="roadmap">
      <Container fluid>
        <Breadcrumbs title="Tracking" breadcrumbItem={`Recepción ${reception?.toUpperCase()}`} />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="text-center">
                    <CardTitle className="mb-5">Tracking</CardTitle>
                  </div>
                  <Row className="align-items-center">
                    <Col xl="8" sm="8">
                      <div className="">
                        {events ? 
                          <ul className="verti-timeline list-unstyled">
                          {events.map((event, key) => (
                            <li key={key} className="event-list">
                              <div className="event-timeline-dot">
                                <i
                                  className={
                                    event?.state?.toUpperCase() === user?.status?.toUpperCase()
                                      ? "bx bx-right-arrow-circle bx-fade-right"
                                      : "bx bx-right-arrow-circle"
                                  }
                                />
                              </div>
                              <div className="d-flex">
                                <div className="me-3">
                                  <i
                                    className={
                                      "bx " + event.icon + " h2 text-primary"
                                    }
                                  />
                                </div>
                                <div className="flex-grow-1">
                                  <div className="event-date">
                                    <h5 className="mb-0">{event.state}</h5>
                                    <div className="text-primary mb-1">
                                      {`El ${event.date} a las ${event.time}`}
                                    </div>
                                    <p className="text-muted">
                                      {event.comment}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        : null}
                      </div>
                    </Col>
                    <Col xl="4" sm="4">
                      <div className="">
                        <Row className="justify-content-center">
                          <Col lg={11}>
                            {user ? 
                              <Card color="dark" className="text-light">
                                <CardBody>
                                  <CardTitle className="mb-2 text-white">
                                    <i className="mdi mdi-alert-circle-outline me-3" />Detalle de recepción
                                  </CardTitle>
                                  <div className="d-flex mb-4">
                                    <div className="me-3">
                                        <img
                                          className="rounded-circle header-profile-user"
                                          src={user1}
                                          alt="Header Avatar"
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                      <div className="text-white">
                                        <h5 className="text-white">{user.name}</h5>
                                        <p className="mb-0">{user.email}</p>
                                        <p className="mb-0">Teléfono: +{user.phones[0].country.code} {user.phones[0].phone}</p>
                                        <p className="mb-0">NIT: {user.billing.nit}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                  <Row className="align-items-center">
                                    <Col sm="7">
                                      <p className="text-white mb-2">Estado de recepción:</p>
                                    </Col>
                                    <Col sm="5">
                                      <h5 className="text-white text-center">{user?.status?.toUpperCase()}</h5>
                                    </Col>
                                  </Row>
                                  </div>
                                </CardBody>
                              </Card>
                            : null}
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  {loading ? 
                    <Row className="justify-content-center">
                      <Spinner className="ms-2" color="info" />
                    </Row>
                  : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

Tracking.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Tracking))
)