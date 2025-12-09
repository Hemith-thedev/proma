// Styles
import "./Style.css";

// Data
import Content from "../../Data/Content";

// Components
import UseWrapper from "../../Components/Common/UseWrapper";
import TutorialSection from "../../Components/Common/TutorialSection";

// Dependencies
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Tutorial() {
  useEffect(() => {
    gsap.fromTo(
      gsap.utils.toArray([".hero-section .wrapper .title", ".hero-section .wrapper .subtitle"]),
      { x: -50, opacity: 0, filter: "blur(30px)" },
      { x: 0, opacity: 1, filter: "blur(0px)", stagger: 0.5 }
    );
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);
  function HeroSection() {
    const HeroContent = Content.pagesContents.tutorial.hero;
    return UseWrapper(
      <>
        <div className="title">
          <p>{HeroContent.title}</p>
        </div>
        <div className="subtitle">
          <p>{HeroContent.subtitle}</p>
        </div>
      </>
    );
  }
  function AddProductSection() {
    return <TutorialSection data={Content.pagesContents.tutorial.addProduct} />;
  }
  function UpgradeLinkingSection() {
    return (
      <TutorialSection data={Content.pagesContents.tutorial.upgradeLinking} />
    );
  }
  function UpgradeUnlinkingSection() {
    return (
      <TutorialSection data={Content.pagesContents.tutorial.upgradeUnlinking} />
    );
  }
  function AddCustomerSection() {
    return (
      <TutorialSection data={Content.pagesContents.tutorial.addCustomer} />
    );
  }
  function LinkCustomerSection() {
    return (
      <TutorialSection data={Content.pagesContents.tutorial.linkCustomer} />
    );
  }
  function AddEngineerSection() {
    return (
      <TutorialSection data={Content.pagesContents.tutorial.addEngineer} />
    );
  }
  function LinkEngineerSection() {
    return (
      <TutorialSection data={Content.pagesContents.tutorial.linkEngineer} />
    );
  }
  function UnlinkEngineerSection() {
    return (
      <TutorialSection data={Content.pagesContents.tutorial.unlinkEngineer} />
    );
  }
  function ReachUsSection() {
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
      wrapper: HeroSection(),
    },
    {
      className: "add-product-section tutorial-section",
      wrapper: AddProductSection(),
    },
    {
      className: "upgrade-linking-section tutorial-section",
      wrapper: UpgradeLinkingSection(),
    },
    {
      className: "upgrade-unlinking-section tutorial-section",
      wrapper: UpgradeUnlinkingSection(),
    },
    {
      className: "add-customer-section tutorial-section",
      wrapper: AddCustomerSection(),
    },
    {
      className: "link-customer-section tutorial-section",
      wrapper: LinkCustomerSection(),
    },
    {
      className: "add-engineer-section tutorial-section",
      wrapper: AddEngineerSection(),
    },
    {
      className: "link-engineer-section tutorial-section",
      wrapper: LinkEngineerSection(),
    },
    {
      className: "unlink-engineer-section tutorial-section",
      wrapper: UnlinkEngineerSection(),
    },
    {
      className: "reachus-section",
      wrapper: ReachUsSection(),
    },
  ];
  return (
    <main className="tutorial-page">
      {Sections.map((section, index) => (
        <section key={index} className={section.className}>
          {section.wrapper}
        </section>
      ))}
    </main>
  );
}
