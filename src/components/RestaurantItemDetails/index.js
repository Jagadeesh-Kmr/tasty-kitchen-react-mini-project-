import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantItemsView from '../RestaurantItemsView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class RestaurantItemDetails extends Component {
  state = {
    restaurantBannerDetail: [],
    restaurantItems: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getRestaurantBannerView()
  }

  getRestaurantBannerView = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        name: data.name,
        foodItems: data.food_items,
        cuisine: data.cuisine,
        location: data.location,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        costForTwo: data.cost_for_two,
      }
      const updatedItemsData = data.food_items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        cost: eachItem.cost,
        rating: eachItem.rating,
      }))
      this.setState({
        restaurantBannerDetail: updatedData,
        restaurantItems: updatedItemsData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {restaurantBannerDetail, restaurantItems, quantity} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantBannerDetail

    return (
      <>
        <div className="restaurant-banner-container">
          <div className="restaurant-banner-details-container">
            <img
              src={imageUrl}
              alt="banner"
              className="restaurant-banner-img"
            />
            <div className="restaurant-banner-desc-container">
              <p className="restaurant-banner-name">{name}</p>
              <p className="restaurant-banner-cuisine">{cuisine}</p>
              <p className="restaurant-banner-location">{location}</p>
              <div className="banner-rating-container">
                <div>
                  <div className="ratings-banner-container">
                    <AiFillStar className="banner-star-icon" />
                    <p className="restaurant-banner-rating">{rating}</p>
                  </div>
                  <p className="restaurant-banner-reviews">
                    {reviewsCount}+ratings
                  </p>
                </div>
                <hr className="vr-line" />
                <div>
                  <div className="price-container">
                    <BiRupee className="banner-rupee-icon" />
                    <p className="restaurant-banner-cost">{costForTwo}</p>
                  </div>
                  <p className="restaurant-banner-cost-para">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="restaurant-item-container">
          <ul className="restaurant-ul">
            {restaurantItems.map(restaurantItem => (
              <RestaurantItemsView
                restaurantItem={restaurantItem}
                quantity={quantity}
                key={restaurantItem.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantItemsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  render() {
    return (
      <>
        <Header />
        <div className="restaurant-item-details-container">
          {this.renderRestaurantItemsView()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantItemDetails
