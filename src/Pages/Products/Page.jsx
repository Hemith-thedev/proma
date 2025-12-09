// Styles
import "./Style.css";

// Data
import { GetData } from "../../functions/Script";

// Components
import UseWrapper from "../../Components/Common/UseWrapper";
import ProductCard from "../../Components/Common/ProductCard/Component";

// Dependencies
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
    const PROMA_USER_PRODUCTS_KEY = "proma_user_products";
    const [products, setProducts] = useState(() => {
        const data = GetData(PROMA_USER_PRODUCTS_KEY);
        return data ? data : [];
    });
    useEffect(() => {
        // GSAP animations
    }, []);
    function Options() {
        return <UseWrapper>
            <h1>Options Section</h1>
        </UseWrapper>
    }
    function ProductsDisplay() {
        return <UseWrapper>
            {
                products.map((product) => (
                    <ProductCard product={product} />
                ))
            }
        </UseWrapper>
    }
    const Sections = [
        {
            className: "products-display",
            wrapper: <ProductsDisplay />
        }
    ];
    return <main className="products-page">
        <Options />
        {
            Sections.map((section, index) => (
                <section key={index} className={section.className}>
                    {section.wrapper}
                </section>
            ))
        }
    </main>
};