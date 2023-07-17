import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'
import './index.css'

const RestaurantItemsView = props => (
  <CartContext.Consumer>
    {value => {
      const {addCartItem} = value
      const {restaurantItem, quantity} = props
      const {name, imageUrl, cost, rating} = restaurantItem

      const onClickAddCartItem = () => {
        addCartItem({...restaurantItem, quantity})
      }

      return (
        <>
          <li className="restaurant-items-list">
            <div className="restaurant-details-container">
              <img src={imageUrl} alt={name} className="restaurant-items-img" />
              <div className="restaurant-items-desc-container">
                <div className="restaurant-items-name-container">
                  <p className="restaurant-items-name">{name}</p>
                </div>
                <div className="restaurant-items-cost-container">
                  <BiRupee />
                  {cost}
                </div>
                <div className="restaurant-items-rating-container">
                  <AiFillStar className="restaurant-items-star-icon" /> {rating}
                </div>
                <button
                  type="button"
                  className="add-btn"
                  onClick={onClickAddCartItem}
                >
                  Add
                </button>
              </div>
            </div>
          </li>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default RestaurantItemsView
