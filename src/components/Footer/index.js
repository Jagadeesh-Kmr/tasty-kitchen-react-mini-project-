import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dakmxu3dl/image/upload/v1688575848/Group_7420white-hat_iahwvz.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-title">Tasty Kitchen</h1>
      </div>
      <div className="footer-desc-container">
        <p>The only thing we are serious about is food. Contact us on</p>
      </div>
      <ul className="footer-social-media-list">
        <li className="footer-li">
          <a href="https://in.pinterest.com/" target="_blank" rel="noReferrer">
            <FaPinterestSquare
              testid="pintrest-social-icon"
              className="social-icon"
            />
          </a>
        </li>
        <li className="footer-li">
          <a
            href="https://www.instagram.com/hl=en"
            target="_blank"
            rel="noReferrer"
          >
            <FaInstagram
              testid="instagram-social-icon"
              className="social-icon"
            />
          </a>
        </li>
        <li className="footer-li">
          <a href="https://twitter.com/" target="_blank" rel="noReferrer">
            <FaTwitter testid="twitter-social-icon" className="social-icon" />
          </a>
        </li>
        <li className="footer-li">
          <a
            href="https://www.facbook.com/hl=en"
            target="_blank"
            rel="noReferrer"
          >
            <FaFacebookSquare
              testid="facebook-social-icon"
              className="social-icon"
            />
          </a>
        </li>
      </ul>
    </div>
  </>
)

export default Footer
