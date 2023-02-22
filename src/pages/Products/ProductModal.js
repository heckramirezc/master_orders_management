import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
  Form,
  FormGroup,
  Alert,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import { useSelector, useDispatch } from "react-redux";
import { unsetProduct, addToCart, amountUP, amountDown } from "../../store/actions";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getProduct, saveProduct } from "../../store/actions";

const ProductModal = props => {
  const { isOpen, toggle } = props
  
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [percentage, setPercentage] = useState('');
  const [offerPrice, setOfferPrice] = useState(0);
  

  const toggleViewModal = () => {
    setPercentage('')
    setOfferPrice(0)
    setProduct({})
    dispatch(unsetProduct());
    productValidation.resetForm();
    toggle()
  };

  const addHandler = () => {
    const request = {
      product: {
        ...product,
        percentage: percentage * 1,
        offerPrice
      }
    }
    dispatch(saveProduct(request));
  };

  const percentageHandler = (e) => {
    const val = e.target.value;
    setPercentage(val);
    setOfferPrice(product.cost - (product.cost * val)/100);
  }
  
  const { productResponse, productError, loadingProduct, productsError, loadingProductResult, productResult } = useSelector(state => ({
    productResponse: state?.Orders?.product,
    productError: state?.Orders?.productError,
    loadingProduct: state?.Orders?.loadingProduct,
    loading: state?.Orders?.loading,
    error: state?.Orders?.error,
    productsError: state?.Orders?.productsError,
    loadingProductResult: state?.Orders?.loadingProductResult,
    productResult: state?.Orders?.productResult
  }));

  useEffect(() => {
    if(productResult && productResult.code) {
      toggleViewModal()
    }

  }, [loadingProductResult, productResult]);

  useEffect(() => {
    if(productResponse && !productError) {
      setProduct(productResponse)
      if(productResponse.isEdit && productResponse.percentage > 0){
        setPercentage(productResponse.percentage);
        setOfferPrice(productResponse.cost - (productResponse.cost * productResponse.percentage)/100);
      } else {
        setOfferPrice(productResponse.cost)
      }
    }
  }, [productResponse, productError]);

  const productValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      code: '',
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Por favor ingresa el código de fabricante del producto que desea agregar.")
    }),
    onSubmit: (values) => {
      dispatch(getProduct({product: { ...values }}));
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleViewModal}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggleViewModal}>{product.isEdit ? 'Actualizar producto' : 'Agregar producto'}</ModalHeader>
        <ModalBody>
          {/* {error ? <Alert color="danger">{error}</Alert> : null} */}
          <div  className="p-4 border mb-4" hidden={(product && product.isEdit) ?? false}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                productValidation.handleSubmit();
                return false;
              }}
            >
              <FormGroup className="mb-0">
                <Label htmlFor="cardnumberInput">
                  Código de fabricante
                </Label>
                <Input
                  name="code"
                  type="text"
                  className="form-control"
                  // id="cardnumberInput"
                  placeholder="Ingrese el código de fabricante del producto a agregar"
                  onChange={productValidation.handleChange}
                  onBlur={productValidation.handleBlur}
                  value={productValidation.values.code || ""}
                  invalid={
                    productValidation.touched.code && productValidation.errors.code ? true : false
                  }
                />
                {productValidation.touched.code && productValidation.errors.code ? (
                  <FormFeedback type="invalid">{productValidation.errors.code}</FormFeedback>
                ) : null}
                {productError ? (
                  <Row className="mt-4">
                    <Alert color="danger">{productError}</Alert>
                  </Row>
                ) : null}
              </FormGroup>
              <Row className="mt-4 mb-2 justify-content-center">
                <Col xl={5}>
                  {!loadingProduct ? 
                    <Button
                      type="submit"
                      color="info"
                      className="btn"
                    >
                      <i className="bx bx-search-alt me-2" />Buscar producto
                    </Button>
                  :
                    <Button
                      type="submit"
                      color="info"
                      className="btn"
                    >
                      <i className="bx bx-loader bx-spin me-2" />Buscar producto
                    </Button>
                  }
                </Col>
              </Row>
            </Form>
          </div>
          {product && product.code? 
            <>
              <p>
                Código de fabricante: <span className="text-primary">#{product.code}</span>
              </p>
              <div>
                <h5 className="mb-2">Especificaciones:</h5>
                <div className="table-responsive">
                  <Table className="table mb-0 table-bordered">
                    <tbody>
                      {product ? 
                        <>
                          <tr>
                            <th
                              scope="row"
                              style={{ width: "150px" }}
                              className={"text-capitalize"}
                            >
                              Código SAP
                            </th>
                            <td>{product.barcode}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              style={{ width: "150px" }}
                              className={"text-capitalize"}
                            >
                              Descripción
                            </th>
                            <td>{product.description}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              style={{ width: "150px" }}
                              className={"text-capitalize"}
                            >
                              Precio
                            </th>
                            <td>{product.cost}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              style={{ width: "150px" }}
                            >
                              Precio de oferta
                            </th>
                            <td>{offerPrice}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              style={{ width: "150px" }}
                              className={"text-capitalize"}
                            >
                              Existencia
                            </th>
                            <td>{product.stock}</td>
                          </tr>
                        </>
                        : null}
                    </tbody>
                  </Table>
                </div>
                
                
                <Label htmlFor="percentage" className="mt-4">
                  Establecer porcentaje de descuento:
                </Label>
                <Row className=" mb-2 justify-content-center">
                  <Col xl={5}>
                    <div style={{ width: '100%' }}>
                      
                      
                      <Input
                        name="percentage"
                        type="text"
                        className="form-control"
                        id="percentage"
                        placeholder="Ingrese porcentaje"
                        onChange={percentageHandler}
                        onBlur={percentageHandler}
                        value={percentage}
                      />
                      </div>
                  </Col>
                </Row>
              </div>
            </> 
          : 
            null
          }
        </ModalBody>
        <ModalFooter>
          {product && product.toAdd ? 
            (
              !loadingProductResult ? 
                <Button
                  type="button"
                  color="primary"
                  className="btn  mt-2 me-1"
                  onClick={addHandler}
                >
                  Agregar producto
                </Button> : 
                <Button
                  type="button"
                  color="primary"
                  className="btn  mt-2 me-1"
                  onClick={addHandler}
                >
                  <i className="bx bx-loader bx-spin me-2" /> Agregar producto
                </Button>
            )
          :
            (
              !loadingProductResult ? 
                <Button 
                type="button"
                color="primary"
                className="btn  mt-2 me-1"
                onClick={addHandler}
              >
                Actualizar producto
              </Button> :
              <Button 
                type="button"
                color="primary"
                className="btn  mt-2 me-1"
                onClick={addHandler}
              >
                <i className="bx bx-loader bx-spin me-2" /> Actualizar producto
              </Button>
            )
          }
        </ModalFooter>
      </div>
    </Modal>
  )
}

ProductModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ProductModal
