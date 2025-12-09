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

export default function AddCustomer() {
  const PROMA_USER_CUSTOMERS_KEY = "proma_user_customers";
  const PROMA_USER_ENGINEERS_KEY = "proma_user_engineers";
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    isCompany: null,
    companyName: "",
    designation: "",
    isEngineer: null,
    enterprise: "",
    skills: [],
  });
  const [errors, setErrors] = useState({});
  const [customers, setCustomers] = useState(() => {
    const data = GetData(PROMA_USER_CUSTOMERS_KEY);
    return data ? data : [];
  });
  const [engineers, setEngineers] = useState(() => {
    const data = GetData(PROMA_USER_ENGINEERS_KEY);
    return data ? data : [];
  });
  useEffect(() => {
    SaveData(PROMA_USER_CUSTOMERS_KEY, customers);
    SaveData(PROMA_USER_ENGINEERS_KEY, engineers);
  }, [customers, engineers]);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };
  const validate = () => {
    const newErrors = {};
    if (!customer.name.trim()) newErrors.name = "Name is required";
    if (!customer.email.trim()) newErrors.email = "Email is required";
    if (!customer.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (customer.phone.length !== 10) {
      newErrors.phone = "Phone Number must be 10 digits";
    }
    if (customer.isCompany && !customer.companyName.trim())
      newErrors.companyName = "Company Name is required.";
    if (customer.isCompany && !customer.designation.trim())
      newErrors.designation = "Designation is required.";
    if (customer.isEngineer && !customer.enterprise.trim())
      newErrors.enterprise = "Enterprise is required.";
    if (customer.isEngineer && customer.skills.length < 1)
      newErrors.skills = "Skills is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (!validationErrors) return;
    const newCustomerWithId = {...customer, id: generateNewId(customers)}
    setCustomers(prevCustomers => [...prevCustomers, newCustomerWithId]);
    if (customer.isEngineer) {
      setEngineers([
        ...engineers,
        {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          enterprise: customer.enterprise,
          skills: customer.skills,
        },
      ]);
    }
    setCustomer({
      name: "",
      email: "",
      phone: "",
      isCompany: null,
      companyName: "",
      designation: "",
      isEngineer: null,
      enterprise: "",
      skills: [],
    });
    setErrors({});
    alert("Customer added successfully");
  };
  return (
    <main className="add-engineer-page">
      <div className="page-title">
        <h1>Add Customer</h1>
      </div>
      <UseWrapper>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <h3>Customer Details</h3>
            <div className="form-input">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={customer.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-input">
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={customer.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-input">
              <input
                type="number"
                name="phone"
                placeholder="Contact.no"
                value={customer.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-input">
              <Dropdown
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}
                value={customer.isCompany}
                onChange={(value) =>
                  setCustomer({ ...customer, isCompany: value })
                }
                placeholder="Having a Company?"
                name="isCompany"
              />
              {errors.isCompany && (
                <span className="error">{errors.isCompany}</span>
              )}
            </div>
            {customer.isCompany && (
              <>
                <div className="form-input">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company"
                    value={customer.companyName}
                    onChange={handleChange}
                  />
                  {errors.companyName && (
                    <span className="error">{errors.companyName}</span>
                  )}
                </div>
                <div className="form-input">
                  <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={customer.designation}
                    onChange={handleChange}
                  />
                  {errors.designation && (
                    <span className="error">{errors.designation}</span>
                  )}
                </div>
              </>
            )}
            <div className="form-input">
              <Dropdown
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}
                value={customer.isEngineer}
                onChange={(value) =>
                  setCustomer({ ...customer, isEngineer: value })
                }
                placeholder="An Engineer?"
                name="isEngineer"
              />
              {errors.isEngineer && (
                <span className="error">{errors.isEngineer}</span>
              )}
            </div>
            {customer.isEngineer && (
              <>
                <div className="form-input">
                  <input
                    type="text"
                    name="enterprise"
                    placeholder="Enterprise"
                    value={customer.enterprise}
                    onChange={handleChange}
                  />
                  {errors.enterprise && (
                    <span className="error">{errors.enterprise}</span>
                  )}
                </div>
                <div className="form-input">
                  <Dropdown
                    options={Content.engineer.skills}
                    value={customer.skills}
                    onChange={(value) =>
                      setCustomer({ ...customer, skills: value })
                    }
                    placeholder="Select Skills"
                    name="skills"
                    multiSelection
                  />
                  {errors.skills && (
                    <span className="error">{errors.skills}</span>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="submit-btn">
              Add Engineer
            </button>
          </div>
        </form>
      </UseWrapper>
    </main>
  );
}
