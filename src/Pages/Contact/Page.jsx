// Styles
import "./Style.css";

// Data
import Content from "../../Data/Content";

// Components
import UseWrapper from "../../Components/Common/UseWrapper";
import ContactForm from "../../Components/Common/ContactForm";

// Dependencies
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--contact-page-hero-section-height", document.querySelector("main.contact-page section.hero-section").offsetHeight);
  },[window.innerWidth,window.onresize]);
  function HeroSection() {
    const HeroContent = Content.pagesContents.contact.hero;
    return UseWrapper(
      <>
        <div className="overlay">
          <div className="title">
            <p>{HeroContent.title}</p>
          </div>
          <div className="subtitle">
            <p>{HeroContent.subtitle}</p>
          </div>
        </div>
      </>
    );
  }
  function InfoFormSection() {
    const InfoContent = Content.pagesContents.contact.info;
    return UseWrapper(
      <>
        <div className="info">
          <div className="decor"></div>
          <div className="copy">
            <div className="title">
              <p>{InfoContent.title}</p>
            </div>
            <div className="subtitles">
              {InfoContent.subtitles.map((subtitle, index) => (
                <div key={index} className="subtitle">
                  <p>{subtitle}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="details">
            {InfoContent.details.map((detail, index) => (
              <div key={index} className="detail">
                <div className="title">
                  <p>{detail.title}</p>
                </div>
                <div className="labels">
                  {detail.labels.map((label, index) => (
                    <div key={index} className="label">
                      <p>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form">
          <ContactForm />
        </div>
      </>
    );
  }
  const Sections = [
    {
      className: "hero-section",
      wrapper: HeroSection(),
    },
    {
      className: "info-form-section",
      wrapper: InfoFormSection(),
    },
  ];
  return (
    <main className="contact-page">
      {Sections.map((Section, index) => (
        <section key={index} className={Section.className}>
          {Section.wrapper}
        </section>
      ))}
    </main>
  );
}
