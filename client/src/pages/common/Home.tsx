import { JSX, useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { HomePageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomePage(): JSX.Element {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };
    updateHeaderHeight();
    document.addEventListener("resize", updateHeaderHeight);
    document.addEventListener("scroll", updateHeaderHeight);
    return () => {
      document.removeEventListener("resize", updateHeaderHeight);
      document.removeEventListener("scroll", updateHeaderHeight);
    };
  }, []);

  useGSAP(
    () => {
      // const heroTitle = document.querySelector(".hero-section .proma-section-wrapper h1");
      // gsap.fromTo(heroTitle, {
      //   scale: 1,
      // }, {
      //   scale: 5
      // })

      const letters = gsap.utils.toArray<HTMLElement>(".why-letter");
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          x: 20,
          filter: "blur(15px) brightness(2)", // Inka ghaatu ga blur chey modata
          scale: 1.2,
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px) brightness(1)",
          scale: 1,
          // Scrub unnapudu stagger thakkuva unte (0.05 - 0.1) chala smooth ga flow avthundi
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-section",
            start: "top 90%", // Section konchem paiki raagane start
            end: "bottom 70%", // Distance pencha, so letters okkati tharuvatha okkati mellaga "nude" ga reveal avthayi
            scrub: 3,
          },
        },
      );
      const heading = document.querySelector("#home-about-section-heading");
      if (heading) {
        gsap.fromTo(
          heading,
          {
            color: "hsl(220, 100%, 30%)",
          },
          {
            color: "hsl(330, 100%, 30%)",
            scrollTrigger: {
              trigger: ".about-section",
              // markers: true,
              scrub: 1,
            },
          },
        );
      }

      const title = document.querySelector(".hero-section .proma-section-wrapper h1");
      if (title) {
        gsap.fromTo(
          title,
          {
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
          }, {  
            scale: 0.75,
            y: 300,
            filter: "blur(30px)",
            opacity: 0,
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      }

      const subtitle = document.querySelector(".hero-section .proma-section-wrapper p");
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          {
            y: 0,
            filter: "blur(0px)",
            opacity: 1,
          }, {
            y: 300,
            filter: "blur(30px)",
            opacity: 0,
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        )
      }

      const cards = gsap.utils.toArray<HTMLElement>(".description-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: 100, // Side nunchi ravali
            rotation: 2, // Chinna "vibration" tilt
            filter: "blur(30px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            rotation: 0,
            duration: 1,
            ease: "back.out(2)", // Back ease valla card konchem "vibrate" ayyi set avthundi
            scrollTrigger: {
              trigger: card,
              start: "top 95%", // 85% screen loki rakane trigger avvali
              end: "+=300",
              scrub: 3, // Smooth scrolling effect
              // toggleActions: "play none none reverse",
              // markers: true,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <CommonPageLayout
      page={
        <main
          ref={container}
          className="proma-page no-scrollbar transition-all"
        >
          <section className="proma-section hero-section relative">
            <div className="proma-section-wrapper">
              <div className="fixed top-0 left-0 size-1/4 tranform">
                <div className="absolute size-full bg-primary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-primary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-primary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
              </div>
              <div className="fixed bottom-0 right-0 size-1/4 tranform">
                <div className="absolute size-full bg-secondary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-secondary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-secondary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
              </div>
              <h1 className="gradient-text text-[10rem] lg:text-[20rem] opacity-50">
                {HomePageData.hero.heading}
              </h1>
              <p className="">
                {HomePageData.hero.captions.map((c, i) => (
                  <>
                    <span>{c}</span>
                    {i !== HomePageData.hero.captions.length - 1 && (
                      <span className="glowing-text"> | </span>
                    )}
                  </>
                ))}
              </p>
            </div>
          </section>
          <section className="proma-section about-section">
            <div className="proma-section-wrapper">
              {/* Sticky Heading */}
              <div className="flex justify-start items-center h-fit w-full">
                <div
                  className="sticky self-start w-[35%]"
                  style={{ top: `${headerHeight + 20}px` }}
                >
                  <h3
                    className="text-primary-300"
                    id="home-about-section-heading"
                  >
                    {HomePageData.about.heading}
                  </h3>
                  <NavLink
                    to={HomePageData.about.cta.path}
                    className="proma-secondary-link inline-block"
                  >
                    {HomePageData.about.cta.label}_
                  </NavLink>
                </div>

                {/* Animated Cards Container */}
                <div className="flex flex-col w-[65%] gap-10">
                  {HomePageData.about.descriptions.map((d, i) => (
                    <div
                      key={i}
                      className="description-card p-4 bg-primary-100 rounded-xl hover:bg-secondary-300 transition-all duration-100 cursor-pointer"
                    >
                      <p className="text-2xl">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="proma-section why-section">
            <div className="proma-section-wrapper">
              <h3 className="text-primary-300">{HomePageData.why.heading}</h3>
              {/* <div className="descriptions-list">
                {HomePageData.why.descriptions.map((d, i) => (
                  <p key={i} className="simple-text">
                    {d}
                  </p>
                ))}
              </div> */}
              <p className="big flex flex-wrap justify-between items-baseline text-justify">
                {HomePageData.why.descriptions
                  .join(" ")
                  .split(" ")
                  .map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="word-wrapper inline-flex whitespace-nowrap"
                    >
                      {word.split("").map((letter, letterIndex) => (
                        <span
                          key={letterIndex}
                          className="why-letter inline-block whitespace-pre text-3xl"
                        >
                          {letter}
                        </span>
                      ))}
                      <span className="why-letter inline-block whitespace-pre text-xl">
                        {" "}
                      </span>
                    </span>
                  ))}
                {/* Invisible spacer to prevent the last line from stretching unnaturally */}
                <span className="flex-grow"></span>
              </p>
            </div>
          </section>
          <section className="proma-section contact-section pb-20">
            <div className="proma-section-wrapper relative gradient-bg p-6 rounded-3xl">
              <div className="flex flex-col justify-between align-center h-fit w-full">
                <div className="flex flex-col">
                  <h3 className="section-title mb-0 text-[6rem]">
                    {HomePageData.contact.heading}
                  </h3>
                  <p className="simple-text mb-2 text-4xl">
                    {HomePageData.contact.caption}
                  </p>
                </div>
                <NavLink
                  to={HomePageData.contact.cta.path}
                  className="proma-primary-link"
                >
                  {HomePageData.contact.cta.label}_
                </NavLink>
              </div>
              <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
              <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
            </div>
          </section>
        </main>
      }
    />
  );
}
