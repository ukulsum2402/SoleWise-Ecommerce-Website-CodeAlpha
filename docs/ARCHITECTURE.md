# SoleWise — Architecture & Engineering Specification
**Tagline:** *Discover. Understand. Customize.*  
**System Type:** Smart Footwear Commerce & Product Intelligence Platform

---

## 1. System Vision & Problem Statement

Modern footwear shopping platforms (e-commerce storefronts like Amazon, Flipkart, or Myntra) operate purely as transactional catalogs. They present marketing copy, pricing, and purchase buttons, but fail to answer fundamental consumer questions:
* *What is this shoe engineered for?*
* *How will daily asphalt commuting degrade this outsole compared to an indoor gym session?*
* *How do I safely clean engineered mesh versus waterproof suede without dissolving adhesives?*
* *What are verifiable wear signals indicating this midsole has compressed and lost its shock attenuation?*

**SoleWise** transforms footwear commerce by embedding a **Product Intelligence Engine** into every shoe, a **Scenario-Based Lifecycle Wear Simulator**, an interactive **Shoe Care Center**, an outline-based **Design Lab Customizer**, and recurring **Weekly Community Design Challenges**.

---

## 2. Technology Stack & Decoupled Architecture

```
+-------------------------------------------------------------------------------------------------+
|                                 SOLEWISE WEB APPLICATION                                        |
+-------------------------------------------------------------------------------------------------+
| FRONTEND LAYER (Vanilla JS / TypeScript + HTML5 + CSS3 / Tailwind v4)                            |
| - Zero Heavy Frameworks (Pure DOM Engine, reactive state bus, modular UI components)            |
| - Modern Responsive Viewport Architecture (Desktop, Tablet, Mobile)                            |
| - Interactive Canvas & SVG Vector Color Engine for Customizer                                  |
+-------------------------------------------------------------------------------------------------+
              |                                                     |
              v (REST API v1 / JSON)                                v (Client SDK / Auth / Live Sync)
+------------------------------------+           +-----------------------------------------------+
| DJANGO + DJANGO REST FRAMEWORK     |           | GOOGLE CLOUD FIREBASE SERVICES               |
| - Modular Domain Apps               |           | - Firebase Authentication (Google OAuth)      |
| - Relational Business Models       |           | - Google Cloud Firestore (Live Data Sync)     |
| - DRF Serializers & ViewSets       |           |   * /users (User Profiles)                    |
| - ABAC Security & Role Verification|           |   * /cart, /wishlist (User State)             |
| - Factual Source Synthesis Pipeline|           |   * /orders (Purchase Ledger)                 |
+------------------------------------+           |   * /challenges, /submissions, /votes         |
                                                 +-----------------------------------------------+
```

---

## 3. Directory & Folder Structure

```
solewise/
|-- backend/
|   |-- manage.py
|   |-- requirements.txt
|   |-- solewise/
|   |   |-- __init__.py
|   |   |-- settings.py        # DRF, CORS, Firebase config, App registry
|   |   |-- urls.py            # API routing v1
|   |   |-- wsgi.py / asgi.py
|   |-- apps/
|       |-- core/              # Health check, Firebase token validation middleware
|       |-- products/          # Brands (10 real brands), Categories, Products, Variants
|       |-- intelligence/      # ProductIntelligence, UsageScenarios, WearIndicators, Sources
|       |-- care/              # MaterialGuide (Mesh, Leather, Suede, Canvas, etc.), Cleaning
|       |-- design_lab/        # DesignTemplate (SVG outlines), ColorPalettes, Customizations
|       |-- challenges/        # WeeklyChallenge, Submissions, Upvoting Engine
|       |-- commerce/          # CartItem, WishlistItem, Order, OrderItem
|
|-- src/
|   |-- index.css              # Tailwind v4 styles, custom typography, dark aesthetic
|   |-- main.ts                # Application coordinator, router, notifications, state bus
|   |-- firebase/
|   |   |-- config.ts          # App initialization using firebase-applet-config.json
|   |   |-- auth.ts            # Google OAuth popup sign-in, session state
|   |   |-- firestore.ts       # Hardened Firestore CRUD + error logging (handleFirestoreError)
|   |   |-- error-handler.ts   # Conforms strictly to FirestoreErrorInfo format
|   |-- data/
|   |   |-- brands.ts          # 10 Real Brands: Nike, Adidas, Puma, NB, ASICS, Skechers, Reebok, Converse, Vans, UA
|   |   |-- products.ts        # Real product catalog with specs, images, sizing, prices
|   |   |-- intelligence.ts    # Deep intelligence, usage wear scenarios, care, sources
|   |   |-- materials.ts       # Material guides & cleaning sequences
|   |   |-- challenges.ts      # Active challenge & community submissions
|   |-- components/
|       |-- Navbar.ts          # Top navigation, brand dropdown, search, badges, auth
|       |-- Hero.ts            # Editorial hero with "New ideas make us grow" challenge CTA
|       |-- ShopSection.ts     # Multi-faceted filtering (Brand, Category, Price, Gender, Sort)
|       |-- ProductCard.ts     # Card with "Understand This Shoe", quick add, wishlist toggle
|       |-- ProductIntelligenceModal.ts # The flagship 5-tab "Understand This Shoe" engine
|       |-- DesignLabModal.ts  # Interactive SVG customizer (Upper, Sole, Laces, Heel, Panels)
|       |-- ChallengeSection.ts# Community challenge feed, live voting, submission form
|       |-- CareCenterModal.ts # Dedicated shoe care & material maintenance guide
|       |-- CartDrawer.ts      # Slide-out bag with quantity calculations & checkout trigger
|       |-- WishlistDrawer.ts  # Slide-out wishlist with quick transfer to bag
|       |-- CheckoutModal.ts   # Realistic order checkout with tracking generation
|       |-- OrderHistoryModal.ts # Historical customer purchases
|       |-- AboutModal.ts      # System architecture, philosophy, student defense guide
|
|-- firebase-blueprint.json    # Formal schema specification (draft-07 IR)
|-- firestore.rules            # 8-pillar ABAC hardened Firestore security rules
|-- index.html                 # HTML5 entry point with Plus Jakarta Sans & Space Grotesk
|-- metadata.json              # Applet metadata & permissions
|-- package.json               # Node.js dependencies
|-- vite.config.ts             # Bundler configuration
```

---

## 4. Real Footwear Brands Initial Catalog (10 Brands)

1. **Nike** (Founded 1964, Beaverton, Oregon, USA) — Focus: High-performance running & responsive air cushioning (Air Zoom Pegasus 40).
2. **Adidas** (Founded 1949, Herzogenaurach, Germany) — Focus: Energy-return Boost foam & Primeknit sustainability (Ultraboost Light).
3. **Puma** (Founded 1948, Herzogenaurach, Germany) — Focus: Nitrogen-infused Nitro foam and PUMAGRIP high-traction rubber (Velocity Nitro 2).
4. **New Balance** (Founded 1906, Boston, Massachusetts, USA) — Focus: Orthopedic-grade heel counters & Fresh Foam X plush cushioning (Fresh Foam X 1080v13).
5. **ASICS** (Founded 1949, Kobe, Japan) — Focus: Anima Sana In Corpore Sano, PureGEL technology & impact guidance (Gel-Nimbus 26).
6. **Skechers** (Founded 1992, Manhattan Beach, California, USA) — Focus: Hyper Burst supercritical foam & ergonomic footbeds (Go Run Razor 4).
7. **Reebok** (Founded 1958, Bolton, UK) — Focus: Vintage court heritage & durable EVA/rubber cupsoles (Club C 85 Vintage).
8. **Converse** (Founded 1908, Malden, Massachusetts, USA) — Focus: Heavyweight 12oz duck canvas & vulcanized rubber heritage (Chuck 70 Classic Canvas).
9. **Vans** (Founded 1966, Anaheim, California, USA) — Focus: Waffle sole skateboard grip & reinforced suede/canvas (Old Skool Classic).
10. **Under Armour** (Founded 1996, Baltimore, Maryland, USA) — Focus: Zero-gravity UA HOVR foam & high-durability training textiles (HOVR Sonic 6).

---

## 5. How Product Intelligence Connects to Products

Each `Product` in SoleWise has a corresponding 1-to-1 relationship with `ProductIntelligence`.
When a user clicks **"Understand This Shoe"**:
1. The system resolves the shoe ID/slug.
2. The modal retrieves:
   - **Technical Anatomy**: Upper construction, midsole compound, outsole durometer, sockliner.
   - **4 Scenario Wear Models**:
     * *Daily Casual (7 days/wk concrete):* Expected timeline of lug smoothing and foam pack-down.
     * *Office (5 days/wk indoor):* Lateral compression minimal; focus on crease preservation.
     * *Occasional / Function:* Degradation from humidity/dry rot rather than mechanical wear.
     * *Walking / Travel (15k+ steps/day):* High heel-strike wear and breathability demands.
   - **Shoe Care & Cleaning**: Step-by-step cleaning, wet drying protocol (never radiator or dryer), storage recommendations, and strictly prohibited practices.
   - **Wear Indicators**: 3-tiered severity warnings (Noticeable, Moderate, Critical).
   - **Citations**: Verifiable source links (e.g. manufacturer technical data sheets, independent wear-testing labs).

---

## 6. Interactive Design Lab Customizer Data Architecture

The customizer enables real-time vector coloration of shoe silhouettes:
* **Customizable SVG Regions:**
  - `#upper`: Main vamp, quarter panels, and collar.
  - `#sole`: Outsole and visible midsole cushioning.
  - `#laces`: Eyelets and lace weaving.
  - `#heel`: Heel counter and Achilles tendon support overlay.
  - `#sidePanel`: Midfoot containment saddle or brand swoosh/stripe.
  - `#accent`: Stitching highlights, tongue logo, pull tab.
* **Storage Payload:**
  Stored in Firestore `/submissions` and Django `ChallengeSubmission`:
  ```json
  {
    "challengeId": "challenge_w42",
    "creatorName": "Alex Chen",
    "shoeModel": "Air Zoom Pegasus 40",
    "brandName": "Nike",
    "title": "Cyber Sunset Runner",
    "colors": {
      "upper": "#0F172A",
      "sole": "#F97316",
      "laces": "#38BDF8",
      "heel": "#E11D48",
      "sidePanel": "#1E293B",
      "accent": "#FACC15"
    },
    "voteCount": 14
  }
  ```

---

## 7. Weekly Challenge Mechanics

* Concept: **"New ideas make us grow. Choose a shoe. Reimagine its colors. Create your style."**
* Disclaimer: *"Selected community designs may inspire future colorways."*
* Active Challenge: **Week 42 — "Create your own everyday sneaker"**
* Community members customize in the Design Lab, submit their colorway, and upvote favorite submissions in real-time.
