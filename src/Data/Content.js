import {
  Zap,
  ChartLine,
  Lightbulb,
  UserCheck,
  Lock,
  MousePointer,
  Sparkles,
} from "lucide-react";

const Content = {
  // Product Specifications
  specs: {
    ramCapacities: [
      {
        label: "2 GB",
        value: 2,
      },
      {
        label: "4 GB",
        value: 4,
      },
      {
        label: "8 GB",
        value: 8,
      },
      {
        label: "16 GB",
        value: 16,
      },
      {
        label: "32 GB",
        value: 32,
      },
      {
        label: "64 GB",
        value: 64,
      },
      {
        label: "128 GB",
        value: 128,
      },
      {
        label: "256 GB",
        value: 256,
      },
      {
        label: "512 GB",
        value: 512,
      },
      {
        label: "1024 (1TB)",
        value: 1024,
      },
      {
        label: "2048 (2TB)",
        value: 2048,
      },
      {
        label: "4096 (4TB)",
        value: 4096,
      },
    ],
    ramTypes: [
      {
        label: "DDR",
        value: "DDR",
      },
      {
        label: "DDR2",
        value: "DDR2",
      },
      {
        label: "DDR3",
        value: "DDR3",
      },
      {
        label: "DDR4",
        value: "DDR4",
      },
      {
        label: "DDR5",
        value: "DDR5",
      },
      {
        label: "M2",
        value: "M2",
      },
      {
        label: "LPDDR",
        value: "LPDDR",
      },
      {
        label: "LPDDR2",
        value: "LPDDR2",
      },
      {
        label: "LPDDR3",
        value: "LPDDR3",
      },
      {
        label: "LPDDR4",
        value: "LPDDR4",
      },
      {
        label: "LPDDR5",
        value: "LPDDR5",
      },
    ],
    storageSizes: [
      {
        label: "64 GB",
        value: 64,
      },
      {
        label: "128 GB",
        value: 128,
      },
      {
        label: "256 GB",
        value: 256,
      },
      {
        label: "512 GB",
        value: 512,
      },
      {
        label: "1024 (1TB)",
        value: 1024,
      },
      {
        label: "2048 (2TB)",
        value: 2048,
      },
      {
        label: "4096 (4TB)",
        value: 4096,
      },
    ],
    storageTypes: [
      {
        label: "HDD",
        value: "HDD",
      },
      {
        label: "SSD",
        value: "SSD",
      },
      {
        label: "NVMe",
        value: "NVMe",
      },
      {
        label: "M.2",
        value: "M.2",
      },
    ],
    cpus: [
      {
        label: "Intel",
        value: "Intel",
      },
      {
        label: "AMD",
        value: "AMD",
      },
    ],
    processors: [
      {
        label: "i3",
        value: "i3",
      },
      {
        label: "i5",
        value: "i5",
      },
      {
        label: "i7",
        value: "i7",
      },
      {
        label: "i9",
        value: "i9",
      },
      {
        label: "Ryzen 1",
        value: "Ryzen 1",
      },
      {
        label: "Ryzen 2",
        value: "Ryzen 2",
      },
      {
        label: "Ryzen 3",
        value: "Ryzen 3",
      },
      {
        label: "Ryzen 5",
        value: "Ryzen 5",
      },
      {
        label: "Ryzen 7",
        value: "Ryzen 7",
      },
      {
        label: "Ryzen 9",
        value: "Ryzen 9",
      },
    ],
    cores: [
      {
        label: "2",
        value: 2,
      },
      {
        label: "4",
        value: 4,
      },
      {
        label: "6",
        value: 6,
      },
      {
        label: "8",
        value: 8,
      },
      {
        label: "10",
        value: 10,
      },
      {
        label: "12",
        value: 12,
      },
      {
        label: "14",
        value: 14,
      },
      {
        label: "16",
        value: 16,
      },
    ],
    OS: [
      {
        label: "Windows",
        value: "Windows",
      },
      {
        label: "Linux",
        value: "Linux",
      },
      {
        label: "MacOS",
        value: "MacOS",
      },
    ],
    types: [
      {
        label: "Laptop",
        value: "Laptop",
      },
      {
        label: "Desktop",
        value: "Desktop",
      },
      {
        label: "Smartphone",
        value: "Smartphone",
      },
      {
        label: "Tablet",
        value: "Tablet",
      },
      {
        label: "Server",
        value: "Server",
      },
    ],
    others: [
      {
        label: "Display",
        value: "Display",
      },
      {
        label: "Keyboard",
        value: "Keyboard",
      },
      {
        label: "Mouse",
        value: "Mouse",
      },
      {
        label: "Monitor",
        value: "Monitor",
      },
      {
        label: "Speaker",
        value: "Speaker",
      },
      {
        label: "Camera",
        value: "Camera",
      },
      {
        label: "Microphone",
        value: "Microphone",
      },
      {
        label: "Webcam",
        value: "Webcam",
      },
    ],
  },
  // Engineer Skills
  engineer: {
    skills: [
      {
        label: "Laptop",
        value: "Laptop",
      },
      {
        label: "Desktop",
        value: "Desktop",
      },
      {
        label: "Smartphone",
        value: "Smartphone",
      },
      {
        label: "Tablet",
        value: "Tablet",
      },
      {
        label: "Server",
        value: "Server",
      },
      {
        label: "All",
        value: "All",
      },
      {
        label: "Display devices",
        value: "Display devices",
      }
    ],
  },
  // Page Titles & Paths
  pages: {
    home: {
      title: "Home",
      slug: "/",
    },
    products: {
      title: "Products",
      slug: "/products",
    },
    upgrades: {
      title: "Upgrades",
      slug: "/upgrades",
    },
    updateProduct: {
      title: "Update Product",
      slug: "/update-product/:id",
    },
    contact: {
      title: "Contact",
      slug: "/contact",
    },
    tutorial: {
      title: "Tutorial",
      slug: "/tutorial",
    },
  },
  // Page Contents and media
  pagesContents: {
    home: {
      hero: {
        title: "ProMa",
        subtitle: "Simple & Powerful",
        image: {
          src: null,
          alt: "Home Hero Section Background Image",
        },
      },
      info: {
        title: "What is ProMa?",
        subtitles: [
          "A simple and powerful web application that allows you to manage products and upgrades.",
          "Built with ❤️ Specially for Product Managers.",
          "Efficient Tracking and Management of your Products and their Upgrades.",
          "Glowish UI with a touch of glow for a modern and sleek look.",
          "Navigate seamlessly with ease.",
          "Intuitive User Interface for a smooth and hassle-free experience.",
          "No account required! Just start managing your products now.",
          "Your data is completely secure and stored through local storage.",
          "Only you have access to your data, so you can trust us with confidence.",
          "Ready to Start? Check out the Tutorial and get started now!",
        ],
        link: {
          label: "Get Started",
          slug: "/tutorial",
        },
      },
      features: {
        title: "Why so Special?",
        subtitles: [
          {
            icon: <Zap />,
            label: "Simple and Powerful",
          },
          {
            icon: <ChartLine />,
            label: "Efficient Tracking and Management",
          },
          {
            icon: <Lightbulb />,
            label: "Intuitive User Interface",
          },
          {
            icon: <UserCheck />,
            label: "No Account Required",
          },
          {
            icon: <Lock />,
            label: "Secured and Safe",
          },
          {
            icon: <MousePointer />,
            label: "Just typing and clicks",
          },
          {
            icon: <Sparkles />,
            label: "Animated UI interactions",
          },
        ],
      },
      reachus: {
        title: "Say Hello!",
        subtitles: [
          "Have any questions or feedback? Don't hesitate to reach out to us.",
          "We're here to help you with anything you need.",
          "Contact us now to get started!",
        ],
        link: {
          label: "Contact Us",
          slug: "/contact",
        },
      },
    },
    tutorial: {
      hero: {
        title: "Hello There!",
        subtitle: "Ready to Rock?",
        image: {
          src: null,
          alt: "Tutorial Hero Section Background Image",
        },
      },
      addProduct: {
        title: "Add a Product",
        subtitle: "Let's start by adding a New Product in your Inventory.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Click on Add "Add Product" link in the Navigation bar.`,
            image: {
              src: null,
              alt: "Add Product Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Fill the details of the New Product.`,
            image: {
              src: null,
              alt: "Add Product Step 2",
            },
          },
          {
            stepNumber: 3,
            stepLabel: `Click on "Submit Details" to add the New Product in your Inventory.`,
            image: {
              src: null,
              alt: "Add Product Step 3",
            },
          },
        ],
        conclusion:
          "You have successfully added a New Product in your Inventory.",
      },
      upgradeLinking: {
        title: "Got an Upgrade?",
        subtitle: "We got it! Now let's link an Upgrade to your Product.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Select the Product you want to link the Upgrade to.`,
            image: {
              src: null,
              alt: "Upgrade Linking Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Click on "Link an Upgrade" to link the Upgrade to the Product.`,
            image: {
              src: null,
              alt: "Upgrade Linking Step 2",
            },
          },
          {
            stepNumber: 3,
            stepLabel: `Fill the details of the New Upgrade.`,
            image: {
              src: null,
              alt: "Upgrade Linking Step 3",
            },
          },
          {
            stepNumber: 4,
            stepLabel: `Click on "Link Upgrade" to add the New Upgrade to the Product you selected.`,
            image: {
              src: null,
              alt: "Upgrade Linking Step 4",
            },
          },
        ],
        conclusion:
          "You have successfully linked an Upgrade to a Product in your Inventory.",
      },
      upgradeUnlinking: {
        title: "Any Unwanted Upgrades?",
        subtitle: "Alright then! Let's unlink the Upgrade from the Product.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Select the Product you want to unlink the Upgrade from.`,
            image: {
              src: null,
              alt: "Upgrade Unlinking Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Click on "Unlink an Upgrade" to unlink the Upgrade from the Product.`,
            image: {
              src: null,
              alt: "Upgrade Unlinking Step 2",
            },
          },
          {
            stepNumber: 3,
            stepLabel: `A popup will appear to confirm the unlinking.`,
            image: {
              src: null,
              alt: "Upgrade Unlinking Step 3",
            },
          },
          {
            stepNumber: 4,
            stepLabel: `Click on "Yes, Proceed" to unlink the Upgrade.`,
            image: {
              src: null,
              alt: "Upgrade Unlinking Step 4",
            },
          },
        ],
        conclusion:
          "You have successfully unlinked the Upgrade from the Product in your Inventory.",
      },
      addCustomer: {
        title: "Add a Customer",
        subtitle: "Now let's add a New Customer to your Inventory.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Click on Add "Add Customer" link in the Navigation bar.`,
            image: {
              src: null,
              alt: "Add Customer Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Fill the details of the New Customer.`,
            image: {
              src: null,
              alt: "Add Customer Step 2",
            },
          },
          {
            stepNumber: 3,
            stepLabel: `Click on "Submit Details" to add the New Customer in your Inventory.`,
            image: {
              src: null,
              alt: "Add Customer Step 3",
            },
          },
        ],
        conclusion:
          "You have successfully added a New Customer in your Inventory.",
      },
      linkCustomer: {
        title: "Linking a Customer",
        subtitle: "Now let's link a Customer to your Product.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Select the Product you want to link the Customer to.`,
            image: {
              src: null,
              alt: "Link Customer Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Click on "Link a Customer" to link the Customer to the Product.`,
            image: {
              src: null,
              alt: "Link Customer Step 2",
            },
          },
          {
            stepNumber: 3,
            stepLabel: `Choose the Customer you want to link to the Product.`,
            image: {
              src: null,
              alt: "Link Customer Step 3",
            },
          },
          {
            stepNumber: 4,
            stepLabel: `Click on "Link Customer" to link the Customer to the Product you selected.`,
            image: {
              src: null,
              alt: "Link Customer Step 4",
            },
          },
        ],
        conclusion:
          "You have successfully linked a Customer to a Product in your Inventory.",
      },
      addEngineer: {
        title: "Add an Engineer",
        subtitle: "Now let's add a New Engineer to your Inventory.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Click on Add "Add Engineer" link in the Navigation bar.`,
            image: {
              src: null,
              alt: "Add Engineer Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Fill the details of the New Engineer.`,
            image: {
              src: null,
              alt: "Add Engineer Step 2",
            },
          },
          {
            stepNumber: 3,
            stepLabel: `Click on "Submit Details" to add the New Engineer in your Inventory.`,
            image: {
              src: null,
              alt: "Add Engineer Step 3",
            },
          },
        ],
        conclusion:
          "You have successfully added a New Engineer in your Inventory.",
      },
      linkEngineer: {
        title: "Linking an Engineer",
        subtitle: "Now let's link an Engineer to the Product.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Select the Product you want to link the Engineer to.`,
            image: {
              src: null,
              alt: "Link Engineer Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Click on "Link an Engineer" to link the Engineer to the Product.`,
            image: {
              src: null,
              alt: "Link Engineer Step 2",
            },
          },
          {
            stepNumber: 3,
            stepLabel: `Choose the Engineer you want to link to the Product.`,
            image: {
              src: null,
              alt: "Link Engineer Step 3",
            },
          },
          {
            stepNumber: 4,
            stepLabel: `Click on "Link Engineer" to link the Engineer to the Product you selected.`,
            image: {
              src: null,
              alt: "Link Engineer Step 4",
            },
          },
        ],
        conclusion:
          "You have successfully linked an Engineer to a Product in your Inventory.",
      },
      unlinkEngineer: {
        title: "Unlinking an Engineer",
        subtitle: "Now let's unlink an Engineer from the Product.",
        steps: [
          {
            stepNumber: 1,
            stepLabel: `Select the Product you want to unlink the Engineer from.`,
            image: {
              src: null,
              alt: "Unlink Engineer Step 1",
            },
          },
          {
            stepNumber: 2,
            stepLabel: `Click on "Unlink an Engineer" to unlink the Engineer from the Product.`,
            image: {
              src: null,
              alt: "Unlink Engineer Step 2",
            },
          },
        ],
        conclusion:
          "You have successfully unlinked an Engineer from a Product in your Inventory.",
      },
      reachus: {
        title: "Say Hello!",
        subtitles: [
          "Have any questions or feedback? Don't hesitate to reach out to us.",
          "We're here to help you with anything you need.",
          "Contact us now to get started!",
        ],
        link: {
          label: "Contact Us",
          slug: "/contact",
        },
      },
    },
    contact: {
      hero: {
        title: "Want to Know More?",
        subtitle: "Leave a Message and We'll Get Back to You"
      },
      info: {
        title: "Contact Information",
        subtitles: [
          "If you have any questions or feedback, please don't hesitate to contact us.",
          "We're here to help you with anything you need.",
        ],
        details: [
          {
            title: "Our Headquarters",
            labels: ["Bengaluru", "Hyderabad", "New Delhi"],
          },
          {
            title: "Email",
            labels: ["support@proma.com"],
          },
          {
            title: "Contact.no",
            labels: ["+91 1234567890", "+91 2468013579"],
          },
          {
            title: "We are available at",
            labels: [
              "Ahmedabad",
              "Bengaluru",
              "Bhubaneshwar",
              "Chennai",
              "Gurugram",
              "Hyderabad",
              "Kolkata",
              "Mumbai",
              "Noida",
              "Rajahmundry",
            ],
          },
        ],

      },
    },
  },
};

export default Content;
