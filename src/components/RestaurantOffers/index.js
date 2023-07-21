import {Component} from 'react'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
}

class RestaurantsOffers extends Component {
  state = {
    sliderImages: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSliderImages()
  }

  getSliderImages = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(eachData => ({
        id: eachData.id,
        imageUrl: eachData.image_url,
      }))
      this.setState({
        sliderImages: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {sliderImages} = this.state

    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      autoplay: true,
    }
    return (
      <div className="offers-container">
        <Slider {...settings}>
          {sliderImages.map(eachImage => (
            <div key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="offer"
                className="slider-img"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderSliderImgsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return null
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="restaurants-container col-12 col-md-4">
          {this.renderSliderImgsView()}
        </div>
      </>
    )
  }
}

export default RestaurantsOffers
