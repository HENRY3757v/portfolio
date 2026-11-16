import { ProjectData } from "@/types";

export const projectsData: ProjectData[] = [
  {
    slug: "shopease",
    title: "SHOPEASE",
    subtitle: "A Smarter Way to Shop Together.",
    category: "Full-Stack Web Application / E-Commerce / Social Commerce",
    flagshipNumber: "01 / FLAGSHIP PROJECT",
    isFlagship: true,
    status: "Completed",
    description: "ShopEase is a full-stack e-commerce platform built for the Indian market, combining product discovery, side-by-side comparison, social group-buying interactions, and an integrated shopping experience.",
    longDescription: "Engineered with React 19, Tailwind CSS v4, Node.js/Express, and PostgreSQL hosted on Supabase, ShopEase addresses key friction points in modern consumer e-commerce. It features market-tailored capabilities such as real-time 3-way specification comparisons, a collaborative Dosti Deal group-buying mechanic with WhatsApp invitations, and a catalog of over 2,400 curated products spanning 8 Indian consumer categories.",
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS v4",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "Vercel",
      "bcryptjs",
      "Lucide Icons"
    ],
    githubUrl: "https://github.com/HENRY3757v/THESHOPEASE",
    liveUrl: "https://theshopease-five.vercel.app/",
    heroImage: "/images/projects/shopease/hero.png",
    problem: {
      title: "The Friction in Modern Consumer E-Commerce",
      description: "Online shopping in the Indian digital commerce space frequently presents fragmented journeys, particularly when consumers want to compare technical specs across similar devices or co-purchase with peers.",
      points: [
        {
          title: "Fragmented Product Comparisons",
          desc: "Shoppers must open multiple browser tabs and juggle distinct product pages to compare technical specifications, battery capacities, and warranty terms."
        },
        {
          title: "Isolated Buying Journeys",
          desc: "Group discounts and social incentives are traditionally hard to share with family or friends without cumbersome coupon codes or manual link exchanges."
        },
        {
          title: "Cluttered Catalog Navigation",
          desc: "Large catalogs often lead to sluggish UI rendering, poor search responsiveness, and confusing multi-level navigation across heterogeneous categories."
        },
        {
          title: "Opaque Order Status",
          desc: "Uncertainty surrounding estimated dispatch and arrival dates causes anxiety after submitting an order without instant visual confirmation."
        }
      ]
    },
    solution: {
      title: "An Integrated, High-Speed Commerce Platform",
      description: "ShopEase unifies discovery, decision-making, and social incentives into a cohesive single-page architecture powered by modern React 19 and relational database persistence.",
      pillars: [
        {
          title: "Side-by-Side Evaluation",
          desc: "Floating dock collects up to 3 candidate products for instant specification matrices without losing browsing position.",
          icon: "Scale"
        },
        {
          title: "Dosti Deal Incentives",
          desc: "Direct WhatsApp invite links offering 12% group discounts with simulated friend slot countdowns.",
          icon: "Users"
        },
        {
          title: "Relational Persistence",
          desc: "Secure user registration and orders stored in PostgreSQL (Supabase cloud pooler) with bcryptjs encryption.",
          icon: "Database"
        },
        {
          title: "Hybrid Deployment",
          desc: "Vercel edge hosting with serverless API bridge paired with dedicated Node.js Express endpoints.",
          icon: "Zap"
        }
      ]
    },
    features: [
      {
        id: "vs-spec",
        title: "VS Spec Comparison Mode",
        tagline: "COMPARE BEFORE YOU COMMIT.",
        description: "A market-tailored comparison interface supporting up to three products side by side in real-time, eliminating tab-switching fatigue.",
        technicalDetails: [
          "Floating bottom dock allows uninterrupted browsing while accumulating products",
          "Synchronized comparison modal rendering structured matrices (Specs, Battery, Warranty, Highlights)",
          "Instant single-click addition or removal with reactive state synchronization"
        ],
        iconName: "SlidersHorizontal"
      },
      {
        id: "dosti-deal",
        title: "Dosti Deal (Social Group Buying)",
        tagline: "BETTER DEALS, TOGETHER.",
        description: "A social commerce feature unlocking an instant 12% discount when purchasing alongside a friend via direct social sharing.",
        technicalDetails: [
          "Auto-generates 1-click WhatsApp invitation links with structured product summaries and deal breakdowns",
          "Built-in countdown timer and simulated friend-slot verification interface",
          "Calculates dynamic savings showing split discount values and total cart impact"
        ],
        simulatedNote: "Friend-slot verification and countdown timer are implemented as an interactive simulated model demonstrating the social commerce workflow, not live payment settlement across multiple independent credit cards.",
        iconName: "Share2"
      },
      {
        id: "catalog-discovery",
        title: "2,400+ Indian Market Catalog Discovery",
        tagline: "DISCOVERY AT SCALE.",
        description: "Extensive product indexing spanning 8 core consumer categories tailored specifically for Indian market shoppers.",
        technicalDetails: [
          "8 verified categories: Mobiles, Laptops, Home & Kitchen, Electronics, Footwear, Watches, Gaming, Fashion",
          "Top tier Indian market brands: Apple, Samsung, Vivo, OnePlus, Prestige, Hawkins, Philips, Nike, Adidas, Sony, boAt, Casio, Titan",
          "Debounced client-side search, brand filtering, category chips, and price range filters with active product counts"
        ],
        iconName: "ShoppingBag"
      },
      {
        id: "auth-security",
        title: "Account Registration & Security",
        tagline: "BUILT AROUND USER ACCOUNTS.",
        description: "Robust authentication flow linking customer identity directly to persistent orders, delivery addresses, and cart state.",
        technicalDetails: [
          "Secure user registration with bcryptjs password hashing (salt rounds: 10)",
          "Input validation across phone number, email uniqueness, and delivery address",
          "Database transaction isolation in PostgreSQL with parameterized query protection against SQL injection"
        ],
        iconName: "ShieldCheck"
      },
      {
        id: "order-management",
        title: "Checkout & Order Management",
        tagline: "FROM CART TO ORDER HISTORY.",
        description: "Seamless slide-over cart drawer with dynamic subtotal calculations, simulated UPI/COD payment options, and persistent history.",
        technicalDetails: [
          "Persistent cart state with item increment, decrement, and removal",
          "Automated dynamic delivery calculation allocating 1 to 3 business days arrival estimates",
          "Dedicated Orders page rendering historical order IDs, item breakdowns, total paid, and address confirmation"
        ],
        simulatedNote: "UPI QR and checkout workflows simulate the payment transaction lifecycle, allowing full end-to-end checkout demonstration without charging live payment cards.",
        iconName: "Receipt"
      },
      {
        id: "delivery-experience",
        title: "Cinematic Delivery Welcome Animation",
        tagline: "DETAILS THAT MAKE THE EXPERIENCE MEMORABLE.",
        description: "Engaging post-login and checkout animation sequence reinforcing brand delight and logistical transparency.",
        technicalDetails: [
          "CSS-animated delivery vehicle sequence with synchronized progress markers",
          "Interactive verification checklist checking user pin code, fulfillment center dispatch, and doorstep ETA",
          "Designed to turn a static confirmation state into an engaging brand moment"
        ],
        simulatedNote: "Presented as a tailored front-end UX delight component, rather than live GPS carrier integration with third-party courier APIs.",
        iconName: "Truck"
      }
    ],
    architecture: {
      description: "ShopEase operates on a hybrid architecture uniting a modern React 19 single-page application with a serverless/standalone Node.js API layer and Supabase cloud-managed PostgreSQL.",
      nodes: [
        {
          id: "client",
          name: "User / Browser Client",
          category: "Frontend Layer",
          role: "Renders responsive interface, manages comparison dock state, and communicates with API.",
          tech: "React 19 + Vite + Tailwind CSS v4",
          files: ["shopify-app/src/App.jsx", "shopify-app/src/pages/Shop.jsx", "shopify-app/src/components/CompareModal.jsx"]
        },
        {
          id: "api-layer",
          name: "API Request / Bridge Layer",
          category: "Routing & Serverless",
          role: "Routes API requests dynamically depending on environment (Vercel serverless function or standalone Express).",
          tech: "Vercel Serverless Functions + Express Router",
          files: ["shopify-app/api/index.js", "shopify-app/vercel.json", "shopify-app/src/config.js"]
        },
        {
          id: "backend",
          name: "Node.js & Express Backend",
          category: "Backend Engine",
          role: "Handles authentication hashing, database queries, order persistence, and product filtering.",
          tech: "Node.js, Express.js 5, pg Pool, bcryptjs",
          files: ["shopify-backend/server.js"]
        },
        {
          id: "database",
          name: "PostgreSQL Database",
          category: "Data Persistence",
          role: "Relational storage for users, catalog products, and customer order records.",
          tech: "PostgreSQL with connection pooling",
          files: ["database/schema.sql", "database/orders_schema.sql"]
        },
        {
          id: "cloud",
          name: "Supabase Managed Cloud",
          category: "Cloud Infrastructure",
          role: "Provides high-availability PostgreSQL hosting with SSL-encrypted connection pooler.",
          tech: "Supabase Cloud Database (aws-1-ap-southeast-2)",
          files: ["shopify-backend/init_supabase_tables.js", "shopify-backend/seed_supabase.js"]
        },
        {
          id: "deployment",
          name: "Vercel Edge Platform",
          category: "Deployment",
          role: "Global CDN delivery for the frontend bundle and serverless edge functions.",
          tech: "Vercel Platform",
          files: ["shopify-app/vercel.json"]
        }
      ]
    },
    apiEndpoints: [
      {
        method: "GET",
        path: "/api/products",
        description: "Returns product catalog with pagination, optional category filtering, brand filters, and text search.",
        sampleResponse: `[
  {
    "id": 101,
    "name": "OnePlus 12 5G",
    "category": "Mobiles",
    "brand": "OnePlus",
    "price": 64999,
    "specs": { "battery": "5400 mAh", "ram": "16GB", "storage": "512GB" }
  }
]`
      },
      {
        method: "GET",
        path: "/api/categories",
        description: "Lists all 8 available catalog categories along with the count of active items in each category.",
        sampleResponse: `[
  { "name": "Mobiles", "count": 420 },
  { "name": "Laptops", "count": 310 },
  { "name": "Electronics", "count": 550 }
]`
      },
      {
        method: "GET",
        path: "/api/brands",
        description: "Returns distinct brands available within a specified category for granular filtering.",
        sampleResponse: `["Apple", "Samsung", "OnePlus", "Vivo", "Xiaomi"]`
      },
      {
        method: "POST",
        path: "/api/register",
        description: "Registers a new shopper account, hashing the password using bcryptjs with 10 salt rounds.",
        sampleRequest: `{
  "name": "Suvradip Dey",
  "email": "suvradip@example.com",
  "phone": "+916289226874",
  "address": "Kolkata, WB",
  "password": "SecurePassword123"
}`
      },
      {
        method: "POST",
        path: "/api/login",
        description: "Verifies user credentials against stored bcrypt hashes and returns user profile session payload.",
        sampleRequest: `{ "email": "suvradip@example.com", "password": "SecurePassword123" }`
      },
      {
        method: "GET",
        path: "/api/orders",
        description: "Retrieves order history for an authenticated user, including item quantities and delivery dates.",
        sampleResponse: `[
  {
    "order_id": "ORD-9482",
    "total_amount": 72499,
    "delivery_date": "2026-11-20",
    "status": "Processing"
  }
]`
      },
      {
        method: "POST",
        path: "/api/orders",
        description: "Creates and persists a new purchase order record linked to user ID with calculated delivery date.",
        sampleRequest: `{
  "userId": 1,
  "items": [{ "productId": 101, "qty": 1 }],
  "totalAmount": 64999,
  "shippingAddress": "Kolkata, India"
}`
      }
    ],
    engineeringDeepDive: {
      frontend: {
        title: "React 19 & Dynamic State Orchestration",
        summary: "The client application uses modern React patterns with functional components and custom hooks to maintain responsive UI state across comparisons, filters, and carts without unnecessary re-renders.",
        code: `// Compare Dock State Management
const [compareList, setCompareList] = useState([]);

const toggleCompare = (product) => {
  if (compareList.some(item => item.id === product.id)) {
    setCompareList(compareList.filter(item => item.id !== product.id));
  } else if (compareList.length < 3) {
    setCompareList([...compareList, product]);
  } else {
    toast.error("You can compare up to 3 products at a time.");
  }
};`
      },
      backend: {
        title: "Express 5 REST Routing & bcryptjs Hashing",
        summary: "The backend server encapsulates user registration, credential authentication, and order placement with parameterized PostgreSQL transactions.",
        code: `// Express User Registration Endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  if (!name || !email || !phone || !address || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Account already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, address, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, email, phone, address, hashedPassword]
    );
    res.status(201).json({ success: true, userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Database execution failure' });
  }
});`
      },
      database: {
        title: "Supabase PostgreSQL Schema & Pooling",
        summary: "Data persistence relies on managed PostgreSQL utilizing a connection pooler to support concurrent serverless connections gracefully.",
        code: `-- PostgreSQL Orders Table Schema
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10, 2) NOT NULL,
  delivery_date DATE NOT NULL,
  shipping_address TEXT NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'COD',
  order_status VARCHAR(50) DEFAULT 'Confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
      },
      deployment: {
        title: "Hybrid Vercel Edge & Serverless Setup",
        summary: "The project is configured with a hybrid architecture: the frontend static assets are distributed globally via Vercel's Edge Network, while API requests route through serverless bridge functions in `api/index.js` or direct Express servers."
      }
    }
  }
];
