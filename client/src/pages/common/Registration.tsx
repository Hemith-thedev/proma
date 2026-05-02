import React, { JSX, useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { RegistrationPageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";
import Dropdown from "../../components/common/Dropdown";
import { User } from "../../data/types";

const UseStar = () => {
  return <span className="text-red-600 font-bold">*</span>;
};

function RegistrationForm(): JSX.Element {
  const [data, setData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
    accountStatus: "Pending",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleChangeGender = (choice: string) => {
    setData((prev) => ({ ...prev, gender: choice }));
    console.log("Selected: " + choice);
  };
  return (
    <form className="proma-form">
      <div className="proma-input-fields h-fit w-full flex flex-col gap-4 mb-6">
        <div className="proma-horizontal-fields">
          <div className="proma-input-field">
            <span>
              Firstname
              <UseStar />
            </span>
            <input
              type="text"
              name="firstname"
              className="proma-input"
              placeholder="Andrew"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="proma-input-field">
            <span>Firstname</span>
            <input
              type="text"
              name="firstname"
              className="proma-input"
              placeholder="Tate"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="proma-input-field">
          <span>Gender</span>
          <Dropdown
            options={["", "Male", "Female", "Other"]}
            placeholder="Select Gender"
            onSelect={(choice) => handleChangeGender(choice)}
          />
        </div>
        <div className="proma-input-field">
          <span>
            Email ID
            <UseStar />
          </span>
          <input
            type="email"
            name="email"
            className="proma-input"
            placeholder="andrewtate@gmail.com"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="proma-input-field">
          <span>
            Password
            <UseStar />
          </span>
          <input
            type="password"
            name="password"
            className="proma-input"
            placeholder="••••••"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="proma-input-field">
          <span>Cofirm Password</span>
          <input
            type="confirmPassword"
            name="password"
            className="proma-input"
            placeholder="••••••"
          />
        </div>
        {/* <div className="proma-input-field">
          <span>Role</span>
          <Dropdown 
            options={["User", "Admin", "Partner", "Princess / Prince"]} 
            onSelect={handleRoleChange} 
          />
        </div> */}
      </div>
      <button type="submit" className="proma-submit-button min-w-full">
        Create your Badge_
      </button>
    </form>
  );
}

export default function RegistrationPage(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
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
    },
    { scope: container },
  );
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
                  <h3 className="mb-0">{RegistrationPageData.hero.heading}</h3>
                  <p className="text-gray-400">
                    {RegistrationPageData.hero.caption}
                  </p>
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
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </section>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </main>
      }
    />
  );
}
