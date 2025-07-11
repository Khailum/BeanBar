import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-section">
      <h2 className="section-header"><span>LET'S GET</span> IN TOUCH!</h2>

      <div className="contact-wrapper">
        {/* Contact form */}
        <form id="contact-form" className="form-horizontal" role="form">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="NAME" name="name" required />
          </div>

          <div className="form-group">
            <input type="email" className="form-control" placeholder="EMAIL" name="email" required />
          </div>

          <div className="form-group">
            <textarea className="form-control" rows="10" placeholder="MESSAGE" name="message" required></textarea>
          </div>

          <button className="btn btn-primary send-button" type="submit">
            <div className="alt-send-button">
              <span className="send-text">SEND</span>
            </div>
          </button>
        </form>

        {/* Contact details */}
        <div className="direct-contact-container">
          {/* Operation Hours */}
          <div className="operation-hours">
            <h3>Operation Hours</h3>
            <ul>
              <li>Monday - Friday: 9:00 AM – 6:00 PM</li>
              <li>Saturday: 10:00 AM – 2:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          <ul className="contact-list">
            <li className="list-item">
              <i className="fas fa-map-marker-alt"></i>
              <span className="contact-text place">
                Raapenberg Rd,
                        Mowbray, 7700

               
              </span>
            </li>
            <li className="list-item">
              <i className="fas fa-phone-alt"></i>
              <span className="contact-text phone">
                <a href="tel:+27624300882">(+27) 64-430-0882</a>
              </span>
            </li>
            <li className="list-item">
              <i className="fas fa-envelope"></i>
              <span className="contact-text gmail">
                <a href="mailto:beanbar.04@gmail.com">beanbar.04@gmail.com</a>
              </span>
            </li>
          </ul>

          <hr />

          <ul className="social-media-list">
            <li>
              <a href="https://www.facebook.com/share/16oqkPReVG/?mibextid=wwXIfr
" className="contact-icon" target="_blank"><i className="fab fa-facebook-f"></i></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/redacademy/posts/?feedView=all" className="contact-icon" target="_blank"><i className="fab fa-linkedin-in"></i></a>
            </li>
            <li>
              <a href="https://www.youtube.com/@RedAcademyOfficial" className="contact-icon" target="_blank"><i className="fab fa-youtube" ></i></a>
            </li>
            <li>
              <a href="https://www.instagram.com/redacademy.sa?igsh=MTNrd2FqNWtjeW00dg==" className="contact-icon" target="_blank"><i className="fab fa-instagram"></i></a>
            </li>
          </ul>

          <hr />
        </div>
      </div></div>
    
  );
}

export default Contact;
