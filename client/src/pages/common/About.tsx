import { JSX, useEffect, useRef } from "react";
import { AboutPageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage(): JSX.Element {
  return (
    <CommonPageLayout
      page={
        <main className="proma-page light no-scrollbar transition-all">
          {/* HERO */}
          <section className="hero-section proma-section relative">
            <div className="proma-section-wrapper">
              <div className="fixed top-0 left-0 size-56 tranform">
                <div className="absolute size-full bg-primary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-primary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-primary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
              </div>
              <div className="fixed bottom-0 right-0 size-56 tranform">
                <div className="absolute size-full bg-secondary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-secondary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
                <div className="absolute size-full bg-secondary-500 mix-blend-plus-lighter filter blur-[200px]"></div>
              </div>
              <h1 className="gradient-text text-[5rem] lg:text-[10rem] opacity-50">
                {AboutPageData.hero.heading}
              </h1>
              <p className="">{AboutPageData.hero.caption}</p>
            </div>
          </section>

          {/* STICKY CARDS */}
          <section className="proma-section main-section">
            <div className="proma-section-wrapper">
              <h3 className="text-primary-300 mb-10">
                {AboutPageData.main.heading}
              </h3>

              <div className="flex flex-col gap-20 w-full">
                {AboutPageData.main.descriptions.map((d, i) => {
                  const borderClass = i % 2 === 0 ? "border-primary-500" : "border-secondary-500";

                  const isLeft = i % 2 === 0;

                  return (
                    <div
                      key={i}
                      className={`sticky-card z-10`}
                      style={{
                        top: 0,
                        zIndex: 100 - i, // 👈 important for stacking order
                      }}
                    >
                      {/* alignment wrapper */}
                      <div className={`flex w-full `}>
                        <div
                          className={`flex md:flex-row flex-col justify-between items-center gap-6 h-fit w-full p-6 rounded-xl backdrop-blur-xl`}
                        >
                          {!isLeft && (
                            <p className="mx-auto mb-4 text-center">{d.label}</p>
                          )}
                          <div className="min-h-[40vh] min-w-[40vh]">
                            <img
                              src={`./about-page/about-main-description-${i + 1}.png`}
                              alt=""
                              className="min-h-[40vh] max-h-[50vh] aspect-square object-cover rounded-lg"
                            />
                          </div>
                          {isLeft && (
                            <p className="mx-auto mt-4 text-center">{d.label}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      }
    />
  );
}
