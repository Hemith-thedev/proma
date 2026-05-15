import { JSX, useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { LoginPageData } from "./PagesData";
import CommonPageLayout from "../../components/layouts/CommonPageLayout";
import { User } from "../../data/types";
import axios from "axios";

function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const [data, setData] = useState<User>({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const Validate = (): Object => {
    const newErrors = {
      email: "",
      password: "",
    };
    const passwordLength = data.password.length;
    // showing errors in short and funny ways, because why not? Let's make validation fun!
    if (!data.email.trim()) {
      newErrors.email = "Email ID is required to access your account!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email =
        "That doesn't look like a valid email address. Try again!";
    }
    if (!data.password) {
      newErrors.password =
        "Password is required, because we care about your account's security!";
    }
    return newErrors;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Data: ", data);
      console.log("Confirm Password: ", confirmPassword);
      const validationErrors = Validate();
      if (Object.values(validationErrors).every((err) => err === "")) {
        const res = await axios.post("http://localhost:5000/api/login", {
          email: data.email,
          password: data.password
        });
        const responseData = await res.data;
        if (responseData.message === "NODETAILS") {
          setErrors({
            email: "Please enter your email to access your account.",
            password: "Please enter your password to access your account.",
          });
        } else if (responseData.message === "ACCOUNTNOTFOUND") {
          setErrors({
            email:
              "No account found with this email. Please check and try again.",
          });
        } else if (responseData.message === "INVALIDPASSWORD") {
          setErrors({
            password: "Incorrect password. Please try again.",
          });
        } else if (responseData.message === "WAIT") {
          setErrors({
            email:
              "Your account is still pending approval. Please wait for confirmation.",
          });
        } else if (responseData.message === "SUCCESS") {
          console.log("Login successful! Response from server:", responseData);
          if (responseData.user) {
            console.log(responseData.user);
            setData({
              email: "",
              password: "",
            });
            setErrors({});
            const {
              account_status,
              created_at,
              email,
              first_name,
              gender,
              id,
              last_name,
              role,
            } = responseData.user;
            localStorage.setItem(
              "proma-fullname",
              `${first_name} ${last_name}`,
            );
            localStorage.setItem("proma-firstname", first_name);
            localStorage.setItem("proma-last_name", last_name);
            localStorage.setItem("proma-email", email);
            localStorage.setItem("proma-role", role);
            localStorage.setItem("proma-accountStatus", account_status);
            localStorage.setItem("proma-created_at", created_at);
            localStorage.setItem("proma-gender", gender);
            localStorage.setItem("proma-id", id);
            navigate("/admin");
          }
        }
        if (res.status === 500) {
          console.error("Server error occurred during login.");
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
        <div className="proma-input-field">
          <span>Email ID</span>
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
          <span>Password</span>
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
      </div>
      <button type="submit" className="proma-submit-button min-w-full">
        Swipe your Badge_
      </button>
    </form>
  );
}

export default function LoginPage(): JSX.Element {
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
                  <h3 className="mb-0">{LoginPageData.hero.heading}</h3>
                  <p className="text-gray-400 mb-0">
                    {LoginPageData.hero.caption}
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
