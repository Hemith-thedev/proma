// Styles
import "./Style.css";

// Components
import UseWrapper from "../UseWrapper";

// Dependencies
import { useState } from "react";
import {
  Pen,
  Trash,
  User,
  Cpu,
  Monitor,
  Laptop,
  Smartphone,
  Tablet,
  Server,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const [showMenu, setShowMenu] = useState(false);
  const Icon = ({ icon }) => {
    let ICON;
    if (icon === "Laptop") ICON = <Laptop />;
    if (icon === "Desktop") ICON = <Monitor />;
    if (icon === "Smartphone") ICON = <Smartphone />;
    if (icon === "Tablet") ICON = <Tablet />;
    if (icon === "Server") ICON = <Server />;
    return ICON;
  };
  return (
    <div
      className="product-card"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <UseWrapper>
        <div className="info">
          <div className="col">
            <div className="row">
              <div className="icon">
                <Icon icon={product.type} />
              </div>
              <div className="col">
                <div className="name text">
                  <p>{product.name}</p>
                </div>
                <div className="type text">
                  <p>{product.type}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="text brand-model">
                <p>
                  <span className="brand">{product.brand}</span> |{" "}
                  <span className="model">{product.model}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="row specs">
            <div className="col">
              <div className="heading">
                <p>RAM</p>
              </div>
              <div className="row">
                <p>
                  Capacity:{" "}
                  {product.specs.ram.capacity >= 1024
                    ? product.specs.ram.capacity / 1024 + "TB"
                    : product.specs.ram.capacity + "GB"}
                </p>
              </div>
              <div className="row">
                <p>Type: {product.specs.ram.type}</p>
              </div>
            </div>
            <div className="col">
              <div className="heading">
                <p>Storage</p>
              </div>
              <div className="row">
                <p>
                  Capacity:{" "}
                  {product.specs.storage.capacity >= 1024
                    ? product.specs.storage.capacity / 1024 + "TB"
                    : product.specs.storage.capacity + "GB"}
                </p>
              </div>
              <div className="row">
                <p>Type: {product.specs.storage.type}</p>
              </div>
            </div>
            <div className="col">
              <div className="heading">
                <p>Hardware & Software</p>
              </div>
              <div className="row">
                <p>CPU: {product.specs.cpu}</p>
              </div>
              <div className="row">
                <p>Processor: {product.specs.processor}</p>
              </div>
              <div className="row">
                <p>Cores: {product.specs.cores}</p>
              </div>
              <div className="row">
                <p>OS: {product.specs.os}</p>
              </div>
            </div>
          </div>
        </div>
        {/* this element will be visible when the user places on the card and right click */}
        {showMenu && (
          <div className="actions">
            <button className="edit">
              <Pen />
            </button>
            <button className="delete">
              <Trash />
            </button>
            <button className="engineer">
              <User />
            </button>
            <button className="customer">
              <User />
            </button>
          </div>
        )}
      </UseWrapper>
    </div>
  );
}
