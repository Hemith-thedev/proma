import { useState } from "react";
import axios from "axios";

function ContactRESTAPIForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "message") setMessage(value);
    else return;
  };
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const SERVICE_ID = "service_c8epkeq";
      const TEMPLATE_ID = "template_x4v0rjz";
      const PUBLIC_KEY = "0uqynk6ItiPaxpNTD";
      const data = {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          form_name: name,
          from_email: email,
          to_name: "Hemith Kumar J",
          message: message,
        },
      };
      try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
        console.log(res.data);
        setMessageContent("Message sent successfully.");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => {
          setMessageContent("");
        }, 3000);
      } catch (err) {
        console.error(err);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="message">
        <p>{messageContent}</p>
      </div>
      <div className="form-input">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-input">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-input">
        <textarea
          name="message"
          placeholder="Message"
          value={message}
          onChange={handleChange}
          autoComplete="off"
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactRESTAPIForm;
