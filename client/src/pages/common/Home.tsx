import { JSX } from "react";
import { NavLink } from "react-router-dom";

import { HomePageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";

export default function HomePage(): JSX.Element {
  return (
    <CommonPageLayout
      page={
        <main className="home-page">
          <section className="hero-section">
            <div className="wrapper">
              <p>{HomePageData.hero.heading}</p>
              <p>{HomePageData.hero.caption}</p>
            </div>
          </section>
          <section className="about-section">
            <div className="wrapper">
              <div className="info">
                <p>{HomePageData.about.heading}</p>
                <div className="descriptions">
                  {HomePageData.about.descriptions.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </div>
                <NavLink to={HomePageData.about.cta.path}>
                  {HomePageData.about.cta.label}
                </NavLink>
              </div>
              <div className="visual">
                <img
                  src={HomePageData.about.image.src}
                  alt={HomePageData.about.image.alt}
                />
              </div>
            </div>
          </section>
          <section className="why-section">
            <div className="wrapper">
              <p>{HomePageData.why.heading}</p>
              <div className="descriptions">
                {HomePageData.why.descriptions.map((d, i) => (
                  <p key={i}>{d}</p>
                ))}
              </div>
            </div>
          </section>
          <section className="features">
            <div className="wrapper">
              <p>{HomePageData.features.heading}</p>
              <div className="descriptions">
                {HomePageData.features.array.map((f, i) => (
                  <p key={i}>{f}</p>
                ))}
              </div>
            </div>
          </section>
          <section className="contact">
            <div className="wrapper">
              <div className="info">
                <p>{HomePageData.contact.heading}</p>
                <p>{HomePageData.contact.caption}</p>
              </div>
              <NavLink to={HomePageData.contact.cta.path}>
                {HomePageData.contact.cta.label}
              </NavLink>
            </div>
          </section>
        </main>
      }
    />
  );
}
