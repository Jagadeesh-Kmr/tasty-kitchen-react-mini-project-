import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header-container">
        <Link to="/" className="home-link">
          <img
            src="https://res.cloudinary.com/dakmxu3dl/image/upload/v1688404056/Group_7420kitchenLogo_vfwpue.png"
            className="header-logo"
            alt="website logo"
          />
        </Link>

        <div className="header-desc">
          <div>
            <p className="header-kitchen-name">Tasty Kitchens</p>
          </div>
          <div>
            <Link to="/" className="home-link">
              Home
            </Link>
            <Link to="/cart" className="cart-link">
              Cart
            </Link>
          </div>
        </div>
        <button type="button" onClick={onClickLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </>
  )
}

export default withRouter(Header)
