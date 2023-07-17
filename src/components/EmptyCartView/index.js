import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dakmxu3dl/image/upload/v1689230697/Layer_2soup_apduek.png"
      className="cart-empty-img"
      alt="cart empty"
    />

    <h1 className="cart-empty-heading">No Orders Yet!</h1>
    <p className="cart-empty-desc">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
