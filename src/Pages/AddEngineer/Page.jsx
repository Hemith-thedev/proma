// Styles
import "./Style.css";

// Data
import Content from "../../Data/Content";

// Components
import UseWrapper from "../../Components/Common/UseWrapper";
import Dropdown from "../../Components/Common/Dropdown/Dropdown";

// Functions
import { GetData, SaveData, generateNewId } from "../../functions/Script";

// Dependencies
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AddEngineer() {
  const PROMA_USER_ENGINEERS_KEY = "proma_user_engineers";
  const [engineer, setEngineer] = useState({
    name: "",
    email: "",
    phone: "",
    enterprise: "",
    skills: [],
  });
  const [errors, setErrors] = useState({});
  const [engineers, setEngineers] = useState(() => {
    const data = GetData(PROMA_USER_ENGINEERS_KEY);
    return data ? data : [];
  });
  console.log(engineers);
  useEffect(() => {
    SaveData(PROMA_USER_ENGINEERS_KEY, engineers);
  }, [engineers]);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setEngineer({ ...engineer, [name]: value });
  };
  const validate = () => {
    const newErrors = {};
    if (!engineer.name.trim()) newErrors.name = "Name is required";
    if (!engineer.email.trim()) newErrors.email = "Email is required";
    if (!engineer.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (engineer.phone.length !== 10) {
      newErrors.phone = "Phone Number must be 10 digits";
    }
    if (!engineer.enterprise.trim())
      newErrors.enterprise = "Enterprise is required";
    if (engineer.skills.length < 1) newErrors.skills = "Skills is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (!validationErrors) return;
    const newEngineerWithId = { ...engineer, id: generateNewId(engineers) };
    setEngineers((prevEngineers) => [...prevEngineers, newEngineerWithId]);
    setEngineer({
      name: "",
      email: "",
      phone: "",
      enterprise: "",
      skills: [],
    });
    setErrors({});
    alert("Engineer added successfully");
  };

  return (
    <main className="add-engineer-page">
      <div className="page-title">
        <h1>Add Engineer</h1>
      </div>
      <UseWrapper>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <h3>Engineer Details</h3>
            <div className="form-input">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={engineer.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-input">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={engineer.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-input">
              <input
                type="tel"
                name="phone"
                placeholder="Contact.no"
                value={engineer.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-input">
              <input
                type="text"
                name="enterprise"
                placeholder="Enterprise"
                value={engineer.enterprise}
                onChange={handleChange}
              />
              {errors.enterprise && (
                <span className="error">{errors.enterprise}</span>
              )}
            </div>
            <div className="form-input">
              <Dropdown
                options={Content.engineer.skills}
                value={engineer.skills}
                onChange={(value) =>
                  setEngineer({ ...engineer, skills: value })
                }
                placeholder="Select Skills"
                name="skills"
                multiSelection
              />
              {errors.skills && <span className="error">{errors.skills}</span>}
            </div>
            <button type="submit" className="submit-btn">
              Add Engineer
            </button>
          </div>
        </form>
      </UseWrapper>
    </main>
  );
}
