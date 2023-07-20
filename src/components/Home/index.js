import RestaurantsOffers from '../RestaurantOffers'
import PopularRestaurants from '../PopularRestaurants'
import Header from '../Header'
import Footer from '../Footer'

const Home = () => (
  <>
    <div className="home-container">
      <Header />
      <RestaurantsOffers />
      <PopularRestaurants />
      <Footer />
    </div>
  </>
)

export default Home
