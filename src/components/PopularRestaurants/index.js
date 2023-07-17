import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

import RestaurantNames from '../RestaurantNames'
import SortByOption from '../SortByOption'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class PopularRestaurants extends Component {
  state = {
    restaurantNames: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionValue: sortByOptions[0].value,
    totalPages: 0,
    activePage: 1,
  }

  componentDidMount() {
    this.getRestaurantsName()
  }

  getRestaurantsName = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {activePage, activeOptionValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeOptionValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const totalRestaurants = fetchedData.total
      const totalPages = Math.ceil(totalRestaurants / limit)
      const updatedData = fetchedData.restaurants.map(eachData => ({
        name: eachData.name,
        id: eachData.id,
        cuisine: eachData.cuisine,
        imageUrl: eachData.image_url,
        rating: eachData.user_rating.rating,
        totalReviews: eachData.user_rating.total_reviews,
      }))
      this.setState({
        restaurantNames: updatedData,
        apiStatus: apiStatusConstants.success,
        totalPages,
      })
    }
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsName,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsName,
      )
    }
  }

  renderSuccessView = () => {
    const {restaurantNames, activePage, totalPages} = this.state

    return (
      <>
        <div className="restaurant-name-details-container">
          <ul className="restaurant-name-ul">
            {restaurantNames.map(eachData => (
              <RestaurantNames key={eachData.id} restaurantName={eachData} />
            ))}
          </ul>
          <div className="restaurant-arrow-container">
            <button
              type="button"
              className="arrow-controller-button"
              onClick={this.onClickLeftArrow}
            >
              <IoIosArrowBack color="#52606D" size={12} />
            </button>
            <p className="arrow-num">
              {activePage} of {totalPages}
            </p>
            <button
              type="button"
              className="arrow-controller-button"
              onClick={this.onClickRightArrow}
            >
              <IoIosArrowForward color="#52606D" size={12} />
            </button>
          </div>
        </div>
      </>
    )
  }

  onChangeOption = activeOptionValue =>
    this.setState({activeOptionValue}, this.getRestaurantsName)

  renderSortByOptions = () => {
    const {activeOptionValue} = this.state

    return (
      <>
        <SortByOption
          sortByOptions={sortByOptions}
          activeOptionValue={activeOptionValue}
          onChangeOption={this.onChangeOption}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantsNameView = () => {
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

  render() {
    return (
      <>
        <div className="restaurant-sortBy-container">
          <p className="popular-restaurants-heading">Popular Restaurants</p>
          <div className="restaurant-sort-by-container">
            <p className="popular-restaurant-desc">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            {this.renderSortByOptions()}
          </div>
          <hr className="popular-restaurant-underline" />
        </div>
        <div className="restaurants-name-container">
          {this.renderRestaurantsNameView()}
        </div>
      </>
    )
  }
}

export default PopularRestaurants
