import {Link} from 'react-router-dom'

import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeCartList} = value
      let total = 0
      cartList.forEach(each => {
        total += each.cost * each.quantity
      })
      const onClickOrderPlaced = () => {
        removeCartList()
      }
      return (
        <>
          <div className="dish-summary-container">
            <div className="dish-summary-rupee-container">
              <BiRupee className="item-total-cost-icon" /> {total}
            </div>
            <div>
              <Link to="/Payment">
                <button
                  type="button"
                  className="place-order-button"
                  onClick={onClickOrderPlaced}
                >
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
