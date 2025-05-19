import React from 'react'
import './Footer.css'

function Footer (){
    return(
        <>
     
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="logo-section">
            <div className="brand">
              {/* <Coffee className="icon-large" /> */}
              <h2 className="brand-name">Aromatic Haven</h2>
            </div>
            <p className="description">
              A cozy corner where every cup tells a story and every moment becomes a memory.
            </p>
            <div className="socials">
              {/* Facebook */}
              <a href="#" className="social-link">
                <svg className="icon-small" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732...z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="social-link">
                <svg className="icon-small" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584...z" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="social-link">
                <svg className="icon-small" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0...z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="info-block">
            <h3>Hours</h3>
            <ul>
              <li>
                {/* <Clock className="icon-small text-highlight" /> */}
                <div>
                  <div>Monday - Friday</div>
                  <div className="text-highlight">7:00 AM - 9:00 PM</div>
                </div>
              </li>
              <li>
                {/* <Clock className="icon-small text-highlight" /> */}
                <div>
                  <div>Saturday - Sunday</div>
                  <div className="text-highlight">8:00 AM - 10:00 PM</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="info-block">
            <h3>Contact</h3>
            <ul>
              <li>
                   {/* <MapPin className="icon-small text-highlight" /> */}
                <span>123 Coffee Lane, Brewtown, BT 98765</span>
              </li>
              <li>
                {/* <Phone className="icon-small text-highlight" /> */}
                <span>(555) 123-4567</span>
              </li>
              <li>
                {/* <Mail className="icon-small text-highlight" /> */}
                <span>hello@aromatichaven.com</span>
              </li>
            </ul>
          </div>

          <div className="info-block">
            <h3>Subscribe</h3>
            <p>Join our newsletter for updates and special offers.</p>
            <form>
              <input type="email" placeholder="Your email" className="email-input" />
              <button type="submit" className="subscribe-btn">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aromatic Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>


        </>
    )
}
export default Footer