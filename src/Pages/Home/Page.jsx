// Styles
import "./Style.css";

// Data
import Content from "../../Data/Content";

// Components
import UseWrapper from "../../Components/Common/UseWrapper";

// Dependencies
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".hero-section",
      { borderRadius: "0rem", scale: 1 },
      {
        borderRadius: "2rem",
        scale: 0.9,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "bottom 95%",
          end: "bottom 5%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".hero-section .wrapper .overlay",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 5 }
    );
    gsap.fromTo(".hero-section .wrapper .decor", { scale: 0 }, { scale: 1 });
    gsap.fromTo(
      ".hero-section .wrapper .overlay .title p",
      { y: 0, opacity: 1, scale: 1 },
      {
        y: 200,
        opacity: 0,
        scale: 5,
        filter: "blur(30px)",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "60% center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".hero-section .wrapper .overlay .subtitle p",
      { y: 0, opacity: 1, scale: 1 },
      {
        y: 400,
        opacity: 0,
        scale: 5,
        filter: "blur(30px)",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "60% center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      gsap.utils.toArray(".info-subtitle"),
      { opacity: 0, y: 50, filter: "blur(30px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".info-subtitle",
          start: "top center",
          end: "bottom center",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".info-section .wrapper .title",
      {
        filter: "blur(30px)",
        opacity: 0,
        x: -200,
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".info-section",
          start: "top center",
          end: "bottom center",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".info-section .wrapper .subtitles",
      {
        filter: "blur(30px)",
        opacity: 0,
        x: -100,
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".info-section",
          start: "top center",
          end: "bottom center",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".info-section .wrapper .link",
      {
        filter: "blur(30px)",
        opacity: 0,
        x: -50,
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".info-section",
          start: "top center",
          end: "bottom center",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      ".features-section .wrapper .title",
      {
        y: 100,
        opacity: 0,
        filter: "blur(30px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.25,
        scrollTrigger: {
          trigger: ".feature-subtitle",
          start: "top center",
          end: "bottom center",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    )
    gsap.fromTo(
      gsap.utils.toArray(".feature-subtitle"),
      {
        y: 100,
        opacity: 0,
        filter: "blur(30px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.25,
        scrollTrigger: {
          trigger: ".feature-subtitle",
          start: "top center",
          end: "bottom center",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);
  function HeroSection() {
    const HeroContent = Content.pagesContents.home.hero;
    return UseWrapper(
      <>
        <div className="decor"></div>
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
  function InfoSection() {
    const InfoContent = Content.pagesContents.home.info;
    return UseWrapper(
      <>
        <div className="title">
          <p>{InfoContent.title}</p>
        </div>
        <div className="subtitles">
          {InfoContent.subtitles.map((subtitle, index) => (
            <div key={index} className="info-subtitle">
              <p>{subtitle}</p>
            </div>
          ))}
        </div>
        <div className="link">
          <NavLink to={InfoContent.link.slug}>{InfoContent.link.label}</NavLink>
        </div>
      </>
    );
  }
  function FeaturesSection() {
    const FeaturesContent = Content.pagesContents.home.features;
    return UseWrapper(
      <>
        <div className="title">
          <p>{FeaturesContent.title}</p>
        </div>
        <div className="subtitles">
          {FeaturesContent.subtitles.map((subtitle, index) => (
            <div key={index} className="subtitle feature-subtitle">
              <div className="icon">{subtitle.icon}</div>
              <div className="label">
                <p>{subtitle.label}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  function ReachUs() {
    const ReachUsContent = Content.pagesContents.home.reachus;
    return UseWrapper(
      <>
        <div className="title">
          <p>{ReachUsContent.title}</p>
        </div>
        <div className="copy">
          <div className="subtitles">
            {ReachUsContent.subtitles.map((subtitle, index) => (
              <div key={index} className="subtitle">
                <p>{subtitle}</p>
              </div>
            ))}
          </div>
          <div className="link">
            <NavLink to={ReachUsContent.link.slug}>
              {ReachUsContent.link.label}
            </NavLink>
          </div>
        </div>
      </>
    );
  }
  const Sections = [
    {
      className: "hero-section",
      wrapper: <HeroSection />,
    },
    {
      className: "info-section",
      wrapper: <InfoSection />,
    },
    {
      className: "features-section",
      wrapper: <FeaturesSection />,
    },
    {
      className: "reachus-section",
      wrapper: <ReachUs />,
    },
  ];
  return (
    <main className="home-page">
      {Sections.map((section, index) => (
        <section key={index} className={section.className}>
          {section.wrapper}
        </section>
      ))}
    </main>
  );
}
