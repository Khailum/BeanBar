import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-section">
       <h2 className="section-header"><span>LET'S GET</span> IN TOUCH!</h2>
      {/* <h1 className="section-header">Contact</h1> */}

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
          

          <ul className="contact-list">
            <li className="list-item">
              <i className="fas fa-map-marker-alt"></i><span className="contact-text place">Woodstock, Cape Town</span>
            </li>
            <li className="list-item">
              <i className="fas fa-phone-alt"></i><span className="contact-text phone"><a href="tel:+273452360098">(+27) 345-236-0098</a></span>
            </li>
            <li className="list-item">
              <i className="fas fa-envelope"></i><span className="contact-text gmail"><a href="mailto:beanBar@gmail.com">beanBar@gmail.com</a></span>
            </li>
          </ul>
          

          <hr />

          <ul className="social-media-list">
            <li><a href="#" className="contact-icon"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#" className="contact-icon"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="contact-icon"><i className="fab fa-instagram"></i></a></li>
          </ul>

          <hr />
        </div>
      </div>
    </div>
  );
}

export default Contact;
