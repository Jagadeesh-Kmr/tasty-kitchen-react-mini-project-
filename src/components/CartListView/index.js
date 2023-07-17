import CartContext from '../../context/CartContext'

import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeCartList} = value
      const showEmptyCartView = cartList.length === 0

      const onclickRemoveCartItems = () => {
        removeCartList()
      }
      return (
        <>
          {showEmptyCartView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-bg-container">
              <div className="cart-container">
                <div>
                  <p>Item</p>
                </div>
                <div>
                  <p>Quantity</p>
                </div>
                <div>
                  <p>Price</p>
                </div>
              </div>
              <ul className="cart-list-view-ul">
                {cartList.map(eachItem => (
                  <CartItem key={eachItem.id} cartItemDetails={eachItem} />
                ))}
              </ul>
              <button
                type="button"
                className="remove-all-btn"
                onClick={onclickRemoveCartItems}
              >
                Remove All
              </button>
              <hr className="cart-hr-line" />
              <div className="order-total-container">
                <p className="order-total-para">Order Total : </p>
                <CartSummary />
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
