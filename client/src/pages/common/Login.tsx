import { JSX, useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { LoginPageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";

function LoginForm(): JSX.Element {
  return (
    <form className="proma-form">
      <div className="proma-input-fields h-fit w-full flex flex-col gap-4 mb-6">
        {/* <div className="input-rows"></div> */}
        <div className="proma-input-field">
          <span>Email ID</span>
          <input type="email" name="email" className="proma-input" />
        </div>
        <div className="proma-input-field">
          <span>Password</span>
          <input type="password" name="password" className="proma-input" />
        </div>
      </div>
      <button type="submit" className="proma-submit-button min-w-full">
        Swipe the Badge_
      </button>
    </form>
  );
}

export default function LoginPage(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const contactDetails = gsap.utils.toArray(".contact-detail");
    gsap.fromTo(
        contactDetails,
        { opacity: 0, x: -100, filter: "blur(20px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
        },
      );
  }, { scope: container });
  return (
    <CommonPageLayout
      page={
        <main
        className="proma-page min-w-full light no-scrollbar transition-all"
        ref={container}
        >
          <div></div>
          <div></div>
          <div></div>
          <section className="proma-section contact-section">
            <div className="proma-section-wrapper relative gradient-bg p-6 rounded-3xl">
              <div className="flex flex-col justify-between align-center h-fit w-full">
                <div className="flex flex-col">
                  <h3 className="mb-0">{LoginPageData.hero.heading}</h3>
                  <p className="text-gray-400 mb-0">{LoginPageData.hero.caption}</p>
                </div>
              </div>
              <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
              <div className="absolute top-0 left-0 z-10 h-full w-full tranform gradient-bg filter blur-[200px] mix-blend-plus-lighter pointer-events-none"></div>
            </div>
          </section>
          <section className="main-section proma-section">
            <div className="proma-section-wrapper">
              <div className="flex flex-col justify-center items-start gap-10 h-fit w-full lg:flex-row">
                <div className="form w-full lg:w-1/2 px-6 rounded-3xl">
                  <LoginForm />
                </div>
              </div>
            </div>
          </section>
          <div></div>
          <div></div>
          <div></div>
        </main>
      }
    />
  );
}
