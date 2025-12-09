// Pages
import Home from "../Pages/Home/Page";
import Tutorial from "../Pages/Tutorial/Page";
import Contact from "../Pages/Contact/Page";
import Products from "../Pages/Products/Page";
// Forms
import AddProduct from "../Pages/AddProduct/Page";
import AddEngineer from "../Pages/AddEngineer/Page";
import AddCustomer from "../Pages/AddCustomer/Page";

const Pages = [
    {
        title: "Home",
        slug: "/",
        component: <Home />
    },
    {
        title: "Tutorial",
        slug: "/tutorial",
        component: <Tutorial />
    },
    {
        title: "Contact",
        slug: "/contact",
        component: <Contact />
    },
    {
        title: "Products",
        slug: "/products",
        component: <Products />
    }
];

const Forms = [
    {
        title: "Add Product",
        slug: "/add-product",
        component: <AddProduct />
    },
    {
        title: "Add Engineer",
        slug: "/add-engineer",
        component: <AddEngineer />
    },
    {
        title: "Add Customer",
        slug: "/add-customer",
        component: <AddCustomer />
    }
]

export { Pages, Forms };