import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import './index.css'

const RestaurantNames = props => {
  const {restaurantName} = props
  const {id, imageUrl, name, cuisine, rating, totalReviews} = restaurantName

  return (
    <>
      <Link to={`/restaurant/${id}`} className="link">
        <li className="restaurant-names-li ">
          <div className="restaurant-names-container">
            <img
              src={imageUrl}
              alt="restaurant name"
              className="restaurant-img"
            />
            <div className="restaurants-desc-container">
              <div>
                <h1 className="restaurant-name">{name}</h1>
              </div>
              <p className="restaurant-cuisine">{cuisine}</p>
              <div className="restaurant-ratings-container">
                <AiFillStar className="star-icon" /> {rating}
                <span className="restaurant-total-reviews">
                  ({totalReviews}+ratings)
                </span>
              </div>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default RestaurantNames
