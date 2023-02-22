import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>{new Date().getFullYear()} © GRUPO MASTER</Col>
            <Col md={6}>
              <div className="text-sm-end d-none d-sm-block">
                <a href="https://grupomaster.com.gt" >grupomaster.com.gt</a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
