import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"

import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
} from "../../store/actions"

import { useSelector, useDispatch } from "react-redux"
import Header from "./Header"
import Footer from "./Footer"
const Layout = (props) => {

  const dispatch = useDispatch()

  const {
    topbarTheme, layoutWidth, isPreloader
  } = useSelector(state => ({
    topbarTheme: state.Layout.topbarTheme,
    layoutWidth: state.Layout.layoutWidth,
    isPreloader: state.Layout.isPreloader,
  }))

  useEffect(() => {
    const title = props.location.pathname
    let currentage = title.charAt(1).toUpperCase() + title.slice(2)

    document.title =
      currentage + " | Pedidos | GRUPO MASTER"
  }, [props.location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

    const hideRightbar = (event) => {
      var rightbar = document.getElementById("right-bar");
      if (rightbar && rightbar.contains(event.target)) {
        return;
      }
    };

  useEffect(() => {
    dispatch(changeLayout("horizontal"));
  }, [dispatch]);

  useEffect(() => {
     document.body.addEventListener("click", hideRightbar, true);

    if (isPreloader === true) {
      document.getElementById("preloader").style.display = "block"
      document.getElementById("status").style.display = "block"

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none"
        document.getElementById("status").style.display = "none"
      }, 2500)
    } else {
      document.getElementById("preloader").style.display = "none"
      document.getElementById("status").style.display = "none"
    }
  }, [isPreloader])

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [dispatch, topbarTheme]);

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth));
    }
  }, [dispatch, layoutWidth]);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner-chase">
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div>

      <div id="layout-wrapper">
        <Header
          theme={topbarTheme}
          isMenuOpened={isMenuOpened}
          openLeftMenuCallBack={openMenu}
        />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

Layout.propTypes = {
  changeLayout: PropTypes.func,/*  */
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  topbarTheme: PropTypes.any
}

export default withRouter(Layout);