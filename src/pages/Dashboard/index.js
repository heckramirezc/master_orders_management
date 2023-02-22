import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import Tracking from "./Home/index"

import {
  Container,
} from "reactstrap"

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
          <title>Pedidos | GRUPO MASTER</title>
          </MetaTags>
          <Container fluid>
            <Tracking />
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard;
