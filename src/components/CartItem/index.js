import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {increaseQuantity, decreaseQuantity} = value
      const {cartItemDetails} = props
      const {name, id, cost, imageUrl, quantity} = cartItemDetails

      const onClickIncrement = () => {
        increaseQuantity(id)
      }

      const onClickDecrement = () => {
        decreaseQuantity(id)
      }

      return (
        <li className="cart-list">
          <div className="cart-list-container">
            <div className="dish-img-container">
              <img src={imageUrl} alt="dish img" className="dish-img" />
              <p className="dish-name">{name}</p>
            </div>
            <div className="mobile-dish-container">
              <div>
                <img
                  src={imageUrl}
                  alt="dish img"
                  className="mobile-dish-img"
                />
              </div>
              <div className="mobile-item-names-view">
                <p>{name}</p>
                <div className="mobile-dish-quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={onClickDecrement}
                  >
                    <BsDashSquare color="#52606D" size={12} />
                  </button>
                  <p className="dish-quantity">{quantity}</p>
                  <button type="button" className="quantity-controller-button">
                    <BsPlusSquare
                      color="#52606D"
                      size={12}
                      onClick={onClickIncrement}
                    />
                  </button>
                </div>
                <div className="mobile-dish-cost-container">
                  <BiRupee className="item-rupee-icon" />
                  <p className="dish-cost">{cost}</p>
                </div>
              </div>
            </div>

            <div className="dish-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="dish-quantity">{quantity}</p>
              <button type="button" className="quantity-controller-button">
                <BsPlusSquare
                  color="#52606D"
                  size={12}
                  onClick={onClickIncrement}
                />
              </button>
            </div>
            <div className="dish-cost-container">
              <BiRupee className="item-rupee-icon" />
              <p className="dish-cost">{cost}</p>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
