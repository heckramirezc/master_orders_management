import React, { useState, useEffect, useRef } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types'
import BootstrapTable from "react-bootstrap-table-next";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  UncontrolledTooltip,
  Card,
  Alert,
  CardBody
} from "reactstrap"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { useSelector, useDispatch, connect } from "react-redux";
import { withTranslation } from "react-i18next"
import { getProducts, setProduct, removeProduct } from "../../store/actions";
import { withRouter, Link } from "react-router-dom"
import ProductModal from "./ProductModal";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Products = (props) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { SearchBar } = Search;
  const [products, setProducts] = useState([]);
  
  const pageOptions = {
    sizePerPage: 10,
    totalSize: products.length,
    custom: true,
  };

  let { productsError, productsResult, loadingProducts, productResult, removeProductResult } = useSelector(state => ({
    productsError: state?.Orders?.productsError,
    productsResult: state?.Orders?.products,
    loadingProducts: state?.Orders?.loadingProducts,
    productResult: state?.Orders?.productResult,
    removeProductResult: state?.Orders?.removeProductResult
  }));

  useEffect(() => {
    productsError = null
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if(productResult && productResult.code && productResult.code == 1) {
      dispatch(getProducts());
    }

  }, [productResult]);

  useEffect(() => {
    if(removeProductResult && removeProductResult.code && removeProductResult.code == 1) {
      dispatch(getProducts());
    }

  }, [removeProductResult]);

  useEffect(() => {
    if(productsResult && productsResult.length && productsResult.length > 0){
      setProducts(productsResult)
    } else{
      setProducts([])
    }
  }, [productsResult]);

  const { offersResponse } = useSelector(state => ({
    offersResponse: state?.Home?.offers,
  }));
  
  useEffect(() => {
    if(offersResponse && offersResponse.length && offersResponse.length > 0) {
      setOffers(offersResponse)
    }
  }, [offersResponse]);

  const toggleViewModal = () => {
    setModal(!modal)
    if(modal){
      productsError = null
    }
  };
  
  const handleProductClick = (product) => {
    const productEdit= {
      ...product,
      cost: product.price,
      isEdit: true
    }

    dispatch(setProduct(productEdit));
    toggleViewModal();
  };

  const onClickDelete = (product) => {
    dispatch(removeProduct({product}));
  }

  const defaultSorted = [
    {
      dataField: "code",
      order: "desc",
    },
  ];

  var node = useRef();

  const ProductsColumns = () => [
    {
      dataField: "code",
      text: "Código de producto",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.code}
        </Link>
      ),
    },
    {
      dataField: "barcode",
      text: "Código de fabricante",
      sort: true
    },
    {
      dataField: "description",
      text: "Descripción",
      sort: true
    },
    {
      dataField: "price",
      text: "Precio",
      sort: true
    },
    {
      dataField: "percentage",
      text: "Porcentaje de descuento",
      sort: true
    },
    // {
    //   dataField: "paymentMethod",
    //   isDummyField: true,
    //   text: "Payment Method",
    //   sort: true,
    //   // eslint-disable-next-line react/display-name
    //   formatter: (cellContent, row) => (
    //     <>
    //       <i
    //         className={
    //           row.paymentMethod !== "COD"
    //             ? "fab fa-cc-" + toLowerCase1(row.paymentMethod) + " me-1"
    //             : "fab fas fa-money-bill-alt me-1"
    //         }
    //       />{" "}
    //       {row.paymentMethod}
    //     </>
    //   ),
    // },
    // {
    //   dataField: "view",
    //   isDummyField: true,
    //   text: "View Details",
    //   sort: true,
    //   // eslint-disable-next-line react/display-name
    //   formatter: () => (
    //     <Button
    //       type="button"
    //       color="primary"
    //       className="btn-sm btn-rounded"
    //       onClick={toggleViewModal}
    //     >
    //       View Details
    //     </Button>
    //   ),
    // },
    {
      dataField: "action",
      isDummyField: true,
      text: "Acciones",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, product) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleProductClick(product)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Editar
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => onClickDelete(product)}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Eliminar
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <React.Fragment>
      <ProductModal isOpen={modal} toggle={toggleViewModal} />
      <div className="page-content">
        <MetaTags>
          <title>Gestión de Productos | GRUPO MASTER</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Gestión de productos" breadcrumbItem="Productos" />
          {/* {error ? <Alert color="danger">{error}</Alert> : null} */}
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="code"
                    columns={ProductsColumns(toggleViewModal)}
                    data={products}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="code"
                        data={products}
                        columns={ProductsColumns(toggleViewModal)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} placeholder="Buscar"/>
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={()=> {
                                      toggleViewModal()
                                    }}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                      Agregar nuevo producto
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            {productsError ? <Alert color="danger">{productsError}</Alert> : null}
                            {productResult && productResult.code && productResult.code > 1 ? <Alert color="danger">{productResult.message}</Alert> : null}
                            {removeProductResult && removeProductResult.code && removeProductResult.code > 1 ? <Alert color="danger">{removeProductResult.message}</Alert> : null}
                            {loadingProducts ? 
                              <Row className="mb-5">
                                <Col xs="12">
                                  <div className="text-center text-info mt-5">
                                      <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                                      Obteniendo datos
                                  </div>
                                </Col>
                              </Row> 
                            : null }
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="code"
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Products.propTypes = {
  history: PropTypes.object,
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Products))
)