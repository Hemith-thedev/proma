import { JSX } from "react";
import { NavLink } from "react-router-dom";

import { RegistrationPageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";

function RegistrationForm(): JSX.Element {
  return (
    <form className="proma-form">
      <div className="input-fields">
        <div className="input-field">
          <span>Name</span>
          <input type="text" name="username" className="proma-input" />
        </div>
        <div className="input-field">
          <span>Email ID</span>
          <input type="email" name="email" className="proma-input" />
        </div>
        <div className="input-filed">
          <span>Password</span>
          <input type="password" name="password" className="proma-input" />
        </div>
        <div className="input-field">
          <span>Phone Number</span>
          <input type="number" name="phone" className="proma-input" />
        </div>
      </div>
      <button type="submit" className="proma-submit-button">
        Send Message
      </button>
    </form>
  );
}

export default function ContactPage(): JSX.Element {
  return (
    <CommonPageLayout
      page={
        <main className="contact-page">
          <section className="hero-section">
            <div className="wrapper">
              <p>{RegistrationPageData.hero.heading}</p>
              <p>{RegistrationPageData.hero.caption}</p>
            </div>
          </section>
          <section className="main-section">
            <div className="wrapper">
              <div className="info"></div>
              <div className="form">
                <RegistrationForm />
              </div>
            </div>
          </section>
        </main>
      }
    />
  );
}
