import PropTypes from "prop-types";
import React from "react";
import MetaTags from 'react-meta-tags';
import { withRouter, Link } from "react-router-dom";
import { Col, Container, Form, Row, Input, Label, FormFeedback, Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "./CarouselPage";

import { loginUser } from "../../store/actions";

const Login = props => {
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      code: '',
      nit: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Por favor ingresa el código de la recepción que deseas consultar"),
      nit: Yup.string().required("Por favor ingresa el NIT asociado a la recepción"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    }
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

  const { loading } = useSelector(state => ({
    loading: state.Login.loading,
  }));

  return (
    <React.Fragment>
      <div>
        <MetaTags>
          <title>Tracking de Taller | GRUPO MASTER</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/" className="d-block auth-logo">
                        <img
                          src={logodark}
                          alt=""
                          height="45"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Tracking de Taller</h5>
                        <p className="text-muted">
                          Introduce el código de la recepción y el NIT correspondiente para validar el seguimiento de la misma.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          {error ? <Alert color="danger">{error}</Alert> : null}
                          <div className="mb-3">
                            <Label className="form-label">Código de recepción</Label>
                            <Input
                              name="code"
                              className="form-control"
                              placeholder="Ingresa el código de tu recepción"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.code || ""}
                              invalid={
                                validation.touched.code && validation.errors.code ? true : false
                              }
                            />
                            {validation.touched.code && validation.errors.code ? (
                              <FormFeedback type="invalid">{validation.errors.code}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">NIT</Label>
                            <Input
                              name="nit"
                              value={validation.values.nit || ""}
                              type="text"
                              placeholder="Ingresa tu NIT"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.nit && validation.errors.nit ? true : false
                              }
                            />
                            {validation.touched.nit && validation.errors.nit ? (
                              <FormFeedback type="invalid">{validation.errors.nit}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mt-3 d-grid">
                            {!loading ? 
                              <button
                                className="btn btn-primary btn-block "
                                type="submit"
                              >
                                Verificar
                              </button>
                            : 
                              <button
                                type="button"
                                className="btn btn-primary "
                              >
                                <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                                Verificar
                              </button>
                            }
                          </div>

                        </Form>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} GRUPO MASTER
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
