import { JSX } from "react";
import { NavLink } from "react-router-dom";

import { ContactPageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";

function ContactForm(): JSX.Element {
  return (
    <form className="proma-form">
      <div className="input-fields">
        {/* <div className="input-rows"></div> */}
        <div className="input-field">
          <span>Username</span>
          <input type="text" name="username" className="proma-input" />
        </div>
        <div className="input-field">
          <span>Email ID</span>
          <input type="email" name="email" className="proma-input" />
        </div>
        <div className="input-filed">
          <span>Contact.no</span>
          <input type="number" name="phone" className="proma-input" />
        </div>
        <div className="input-field">
          <span>Message</span>
          <textarea name="username" className="proma-textarea" />
        </div>
      </div>
      <button type="submit" className="proma-submit-button">Send Message</button>
    </form>
  );
}

export default function ContactPage(): JSX.Element {
  return (
    <CommonPageLayout
      page={
        <main className="contact-page">
          <section className="hero-section">
            <div className="image">
              <img
                src={ContactPageData.hero.image.src}
                alt={ContactPageData.hero.image.alt}
              />
            </div>
            <div className="wrapper">
              <p>{ContactPageData.hero.heading}</p>
              <p>{ContactPageData.hero.caption}</p>
            </div>
          </section>
          <section className="main-section">
            <div className="wrapper">
              <div className="info">
                <p>{ContactPageData.main.info.heading}</p>
                <div className="infos">
                  {ContactPageData.main.info.array.map((info, i) => (
                    <NavLink to={info.action} key={i} className="contact-card">
                      <span className="icon">{info.icon}</span>
                      <div className="details">
                        <p className="label">{info.label}</p>
                        <p className="value">{info.value}</p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="form">
                <ContactForm />
              </div>
            </div>
          </section>
        </main>
      }
    />
  );
}
