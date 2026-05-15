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
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
    account_status: "Pending",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleChangeGender = (choice: string) => {
    setData((prev) => ({ ...prev, gender: choice }));
  };
  const Validate = (): Object => {
    const newErrors = {
      first_name: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const passwordLength = data.password.length;
    // showing errors in short and funny ways, because why not? Let's make validation fun!
    if (!data.first_name?.trim()) {
      newErrors.first_name =
        "First name is required. We need to know what to call you!";
    } else if (!/^[A-Za-z]+$/.test(data.first_name?.trim())) {
      newErrors.first_name = "Only letters, please!";
    }
    if (!data.gender?.trim()) {
      newErrors.gender =
        "Gender is required. We need to know how to address you!";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email ID is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email =
        "That doesn't look like a valid email address. Try again!";
    }
    if (!data.password) {
      newErrors.password =
        "Password is required. We need to keep your account safe!";
    } else if (data.password.length < 6) {
      newErrors.password = `Password is too short. Make it stronger with ${6 - passwordLength < 6 ? `at least ${6 - passwordLength} more character(s)` : `minimum 6 characters`}!`;
    }
    if (confirmPassword !== data.password) {
      newErrors.confirmPassword =
        "Passwords don't match. Double-check and try again!";
    } else if (confirmPassword.length < 6) {
      newErrors.confirmPassword =
        "Confirm Password is too short. It should match your password!";
    }
    return newErrors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Data: ", data);
      console.log("Confirm Password: ", confirmPassword);
      const validationErrors = Validate();
      if (Object.values(validationErrors).every((err) => err === "")) {
        const FinalData: { [key: string]: string } = {
          firstname: data.first_name || "",
          lastname: data.last_name || "",
          email: data.email,
          password: data.password,
          gender: data.gender || "",
        };
        const JSONDATA = JSON.stringify(FinalData);
        console.log("Final JSON Data to be sent to server: ", JSONDATA);
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSONDATA,
        });
        if (res.ok) {
          setErrors({});
          setData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            gender: "",
            role: "user",
            account_status: "Pending",
          });
          setConfirmPassword("");
          console.log("Your account has been created successfully!");
        }
        if (res.status === 500) {
          console.error("Server error occurred during registration.");
        }
      } else {
        console.log("Validation failed. Please fix the errors and try again.");
      }
    } catch (error) {
      console.error("An error occurred during creating your account:", error);
    }
  };
  const ErrorMessage = ({ message }: { message: string }) => {
    return <p className="text-red-500 text-sm mt-1">{message}</p>;
  };
  return (
    <form className="proma-form" onSubmit={handleSubmit}>
      <div className="proma-input-fields h-fit w-full flex flex-col gap-4 mb-6">
        <div className="proma-horizontal-fields">
          <div className="proma-input-field">
            <span>
              Firstname
              <UseStar />
            </span>
            <input
              type="text"
              name="first_name"
              className="proma-input"
              placeholder="Andrew"
              value={data.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <ErrorMessage message={errors.first_name} />}
          </div>
          <div className="proma-input-field">
            <span>Firstname</span>
            <input
              type="text"
              name="last_name"
              className="proma-input"
              placeholder="Tate"
              value={data.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="proma-input-field">
          <span>
            Gender
            <UseStar />
          </span>
          <Dropdown
            options={["", "Male", "Female", "Other"]}
            placeholder="Select Gender"
            onSelect={(choice) => handleChangeGender(choice)}
          />
          {errors.gender && <ErrorMessage message={errors.gender} />}
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
          {errors.email && <ErrorMessage message={errors.email} />}
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
          {errors.password && <ErrorMessage message={errors.password} />}
        </div>
        <div className="proma-input-field">
          <span>
            Confirm Password
            <UseStar />
          </span>
          <input
            type="password"
            name="confirmPassword"
            className="proma-input"
            placeholder="••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword} />
          )}
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
