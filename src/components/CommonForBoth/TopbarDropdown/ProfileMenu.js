import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap"
import { withTranslation } from "react-i18next"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import user1 from "../../../assets/images/users/avatar-1.png"

const ProfileMenu = props => {
  const [menu, setMenu] = useState(false)

  const [username, setUsername] = useState("")
  const [nit, setNIT] = useState("")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setUsername(obj?.name)
      setNIT(obj?.billing?.nit)
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        {/* <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <div className="d-flex align-items-center">
            <div className="me-3">
              <img
                className="rounded-circle header-profile-user"
                src={user1}
                alt="Header Avatar"
              />
            </div>
            <div className="flex-grow">
              <div className="text-white">
                <p className="mb-0">{username}</p>
                <p className="mb-0">NIT: {nit}</p>
              </div>
            </div>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
          </div>
        </DropdownToggle> */}
        <DropdownMenu className="dropdown-menu-end">
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
            <span>{props.t("Salir")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
