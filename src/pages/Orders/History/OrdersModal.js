import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unsetOrderDetailResult } from "../../../store/actions";

const OrdersModal = props => {
  const dispatch = useDispatch();
  const { isOpen, toggle } = props
  const [order, setOrder] = useState(null);

  const { ordersResult, orderDetail } = useSelector(state => ({
    orderDetail: state?.Orders?.orderDetail,
    ordersResult: state?.Orders?.orders
  }));

  useEffect(() => {
    if(orderDetail && orderDetail.order && orderDetail.products && orderDetail.products.length && orderDetail.products.length > 0) {
      const orderTemp = ordersResult.find(o => o.code == orderDetail?.order)

      setOrder({
        ...orderDetail,
        name: orderTemp?.name,
        total: orderTemp?.total
      })
    }
  }, [ordersResult, orderDetail])

  const toggleViewModal = () => {
    setOrder(null)
    dispatch(unsetOrderDetailResult());
    toggle()
  };

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
        <ModalHeader toggle={toggleViewModal}>Detalle de pedido</ModalHeader>
        <ModalBody>
          <p className="mb-2">
            Identificador de pedido: <span className="text-primary">#{order?.order?.toLocaleString('en-US', {minimumIntegerDigits: 5, useGrouping:false})}</span>
          </p>
          <p className="mb-4">
            Nombre: <span className="text-primary">{order?.name}</span>
          </p>

          <div className="table-responsive">
            <Table className="table align-middle table-nowrap">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>
                {order?.products.map((product, key) => (
                    <tr key={key}>
                      <th scope="row">
                        <div>
                        <Link to="#" className="text-body fw-bold">
                          {product?.barcode}
                        </Link>
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            {product?.description}
                          </h5>
                          <p className="text-muted mb-0">GTQ {product?.price} x {product?.amount}</p>
                        </div>
                      </td>
                      <td>GTQ {(product?.price*product?.amount)}</td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-end">Total:</h6>
                  </td>
                  <td>GTQ {order?.total}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggleViewModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

OrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default OrdersModal
