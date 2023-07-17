import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dakmxu3dl/image/upload/v1688456110/erroring_1notfound_yqoqkp.png"
      alt="not found"
      className="not-found-img"
    />
    <div className="not-found-para">
      <p>Page Not Found</p>
    </div>
    <div className="not-found-desc">
      <p>
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="home-page-btn">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
