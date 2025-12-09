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

export default function AddProduct() {
  const PROMA_USER_PRODUCTS_KEY = "proma_user_products";
  const [product, setProduct] = useState({
    name: "",
    type: "",
    brand: "",
    model: "",
    specs: {
      ram: {
        capacity: "",
        type: "",
      },
      storage: {
        capacity: "",
        type: "",
      },
      cpu: "",
      processor: "",
      cores: "",
      os: "",
    },
    engineer: {
      name: "",
      email: "",
      enterprise: "",
    },
    customer: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState(() => {
    const data = GetData(PROMA_USER_PRODUCTS_KEY);
    return data ? data : [];
  });
  useEffect(() => {
    SaveData(PROMA_USER_PRODUCTS_KEY, products);
  }, [products]);
  const handleChange = (e) => {
    let { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Name is required";
    if (!product.type.trim()) newErrors.type = "Type is required";
    if (!product.brand.trim()) newErrors.brand = "Brand is required";
    if (!product.model.trim()) newErrors.model = "Model is required";
    if (!String(product.specs.ram.capacity).trim())
      newErrors.ramCapacity = "RAM Capacity is required";
    if (!String(product.specs.ram.type).trim())
      newErrors.ramType = "RAM Type is required";
    if (!String(product.specs.storage.capacity).trim())
      newErrors.storageCapacity = "Storage Capacity is required";
    if (!String(product.specs.storage.type).trim())
      newErrors.storageType = "Storage Type is required";
    if (!String(product.specs.cpu).trim()) newErrors.cpu = "CPU is required";
    if (!String(product.specs.processor).trim())
      newErrors.processor = "Processor is required";
    if (!String(product.specs.cores).trim())
      newErrors.cores = "Cores is required";
    if (!String(product.specs.os).trim()) newErrors.os = "OS is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (!validationErrors) return;
    const newId = generateNewId(products);
    const newProductWithId = { ...product, id: newId };
    setProducts((prevProducts) => [...prevProducts, newProductWithId]);
    console.log("New product added", product);
    setProduct({
      name: "",
      type: "",
      brand: "",
      model: "",
      specs: {
        ram: {
          capacity: "",
          type: "",
        },
        storage: {
          capacity: "",
          type: "",
        },
        cpu: "",
        processor: "",
        cores: "",
        os: "",
      },
      engineer: {
        name: "",
        email: "",
        enterprise: "",
      },
      customer: {
        name: "",
        email: "",
        phone: "",
      },
    });
    setErrors({});
    alert("Product added successfully");
  };
  return (
    <main className="add-product-page">
      <div className="page-title">
        <h1>Add Product</h1>
      </div>
      <UseWrapper>
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-input">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={product.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="form-input">
                <Dropdown
                  options={Content.specs.types}
                  placeholder="Type"
                  value={product.type}
                  onChange={(val) =>
                    setProduct((prev) => ({ ...prev, type: val }))
                  }
                  error={errors.type}
                />
                {errors.type && <span className="error">{errors.type}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-input">
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={product.brand}
                  onChange={handleChange}
                />
                {errors.brand && <span className="error">{errors.brand}</span>}
              </div>
              <div className="form-input">
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={product.model}
                  onChange={handleChange}
                />
                {errors.model && <span className="error">{errors.model}</span>}
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="form-group">
            <h3>Specifications</h3>
            <h4>RAM Configuration</h4>
            <div className="form-row">
              <div className="form-input">
                <Dropdown
                  options={Content.specs.ramCapacities}
                  placeholder="Capacity"
                  value={product.specs.ram.capacity}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        ram: { ...prev.specs.ram, capacity: val },
                      },
                    }))
                  }
                />
                {errors.ramCapacity && (
                  <span className="error">{errors.ramCapacity}</span>
                )}
              </div>
              <div className="form-input">
                <Dropdown
                  options={Content.specs.ramTypes}
                  placeholder="Type"
                  value={product.specs.ram.type}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        ram: { ...prev.specs.ram, type: val },
                      },
                    }))
                  }
                />
                {errors.ramType && (
                  <span className="error">{errors.ramType}</span>
                )}
              </div>
            </div>
            <h4>Storage Configuration</h4>
            <div className="form-row">
              <div className="form-input">
                <Dropdown
                  options={Content.specs.storageSizes}
                  placeholder="Capacity"
                  value={product.specs.storage.capacity}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        storage: { ...prev.specs.storage, capacity: val },
                      },
                    }))
                  }
                />
                {errors.storageCapacity && (
                  <span className="error">{errors.storageCapacity}</span>
                )}
              </div>
              <div className="form-input">
                <Dropdown
                  options={Content.specs.storageTypes}
                  placeholder="Type"
                  value={product.specs.storage.type}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        storage: { ...prev.specs.storage, type: val },
                      },
                    }))
                  }
                />
                {errors.storageType && (
                  <span className="error">{errors.storageType}</span>
                )}
              </div>
            </div>
            <h4>System Details</h4>
            <div className="form-row">
              <div className="form-input">
                <Dropdown
                  options={Content.specs.cpus}
                  placeholder="CPU"
                  value={product.specs.cpu}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: { ...prev.specs, cpu: val },
                    }))
                  }
                />
                {errors.cpu && <span className="error">{errors.cpu}</span>}
              </div>
              <div className="form-input">
                <Dropdown
                  options={Content.specs.processors}
                  placeholder="Processor"
                  value={product.specs.processor}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: { ...prev.specs, processor: val },
                    }))
                  }
                />
                {errors.processor && (
                  <span className="error">{errors.processor}</span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-input">
                <Dropdown
                  options={Content.specs.cores}
                  placeholder="Cores"
                  value={product.specs.cores}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: { ...prev.specs, cores: val },
                    }))
                  }
                />
                {errors.cores && <span className="error">{errors.cores}</span>}
              </div>
              <div className="form-input">
                <Dropdown
                  options={Content.specs.OS}
                  placeholder="OS"
                  value={product.specs.os}
                  onChange={(val) =>
                    setProduct((prev) => ({
                      ...prev,
                      specs: { ...prev.specs, os: val },
                    }))
                  }
                />
                {errors.os && <span className="error">{errors.os}</span>}
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </UseWrapper>
    </main>
  );
}
