import { JSX } from "react";
import { NavLink } from "react-router-dom";

import { AboutPageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";

export default function AboutPage(): JSX.Element {
  return (
    <CommonPageLayout page={
      <main className="home-page">
          <section className="hero-section">
            <div className="wrapper">
              <p>{AboutPageData.hero.heading}</p>
              <p>{AboutPageData.hero.caption}</p>
            </div>
          </section>
          <section className="info-section">
            <div className="wrapper">
              <div className="info">
                <p>{AboutPageData.main.heading}</p>
                <div className="descriptions">
                  {AboutPageData.main.descriptions.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </div>
              </div>
              <div className="visual">
                <img
                  src={AboutPageData.main.image.src}
                  alt={AboutPageData.main.image.alt}
                />
              </div>
            </div>
          </section>
          <section className="features">
            <div className="wrapper">
              <p>{AboutPageData.features.heading}</p>
              <div className="descriptions">
                {AboutPageData.features.array.map((f, i) => (
                  <p key={i}>{f}</p>
                ))}
              </div>
            </div>
          </section>
          <section className="contact">
            <div className="wrapper">
              <div className="info">
                <p>{AboutPageData.contact.heading}</p>
                <p>{AboutPageData.contact.caption}</p>
              </div>
              <NavLink to={AboutPageData.contact.cta.path}>
                {AboutPageData.contact.cta.label}
              </NavLink>
            </div>
          </section>
        </main>
    } />
  )
}