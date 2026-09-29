# SoleWise REST API Specification (v1)
**Base URL:** `/api/v1`

---

## 1. Core Endpoints

### `GET /api/v1/core/health/`
Checks backend service availability, database connectivity, and Firebase setup status.
* **Status:** `200 OK`
* **Response Sample:**
```json
{
  "status": "healthy",
  "platform": "SoleWise Smart Footwear Commerce & Product Experience Platform",
  "version": "1.0.0",
  "firebase": {
    "configured": true,
    "projectId": "gen-lang-client-0565073599",
    "databaseId": "ai-studio-ffb893a4-29b5-4d08-a63b-dc550fcfc9f7"
  },
  "supportedBrandsCount": 10,
  "features": [
    "footwear_e_commerce",
    "product_intelligence",
    "lifecycle_wear_analysis",
    "shoe_care_center",
    "interactive_design_lab",
    "weekly_community_challenges"
  ]
}
```

---

## 2. Products & Brands

### `GET /api/v1/products/brands/`
Returns all 10 supported footwear brands with country of origin, year founded, and brand narrative.

### `GET /api/v1/products/items/`
Query parameters:
* `brand`: Filter by brand slug (e.g. `nike`, `adidas`, `asics`)
* `category`: Filter by category (e.g. `running`, `lifestyle`, `court`)
* `gender`: Filter by gender (`Men`, `Women`, `Unisex`)
* `min_price`, `max_price`: Numerical bounds
* `search`: Full text keyword search
* `ordering`: `price`, `-price`, `rating`, `-created_at`

### `GET /api/v1/products/items/{slug}/`
Returns full commercial details including SKU, description, size chart, colorways, images, and foreign key link to Product Intelligence.

---

## 3. Product Intelligence

### `GET /api/v1/intelligence/reports/`
Returns all product intelligence dossiers.

### `GET /api/v1/intelligence/reports/by-product/{product_slug}/`
Returns the complete engineering breakdown, multi-scenario lifecycle wear models, cleaning guidance, wear indicators, and factual sources.
* **Response Sample Structure:**
```json
{
  "product_name": "Nike Air Zoom Pegasus 40",
  "intended_use_detail": "High-mileage daily neutral road running and tempo paces...",
  "upper_materials": "Engineered single-layer jacquard mesh with integrated midfoot flywire bands...",
  "midsole_technology": "Dual Zoom Air units (forefoot and heel) encapsulated within Nike React foam matrix...",
  "outsole_composition": "Waffle-inspired carbon rubber (BRS 1000) with flex grooves...",
  "cleaning_steps": [
    "Remove laces and wash separately in mesh bag with mild liquid detergent.",
    "Dry brush dry mud using a soft horsehair brush.",
    "Use lukewarm water and gentle sneaker foam; dab without soaking mesh."
  ],
  "drying_guidance": "Air dry at room temperature away from direct sunlight or heat radiators. Stuff toe box with unprinted paper towels.",
  "usage_scenarios": [
    {
      "scenario_type": "daily_casual",
      "scenario_display": "Daily Casual Use",
      "outsole_impact": "Lug abrasion occurs primarily on the lateral heel and forefoot medial strike zones...",
      "cushioning_impact": "React foam compresses steadily under continuous 8-10 hour bodyweight loading..."
    },
    {
      "scenario_type": "office",
      "scenario_display": "Office / Workday Use",
      "outsole_impact": "Negligible abrasive wear on indoor carpet and tile..."
    }
  ],
  "wear_indicators": [
    {
      "component": "Forefoot Outsole",
      "indicator_title": "Loss of Waffle Siping",
      "severity": "moderate",
      "action_recommended": "Traction in wet conditions is degraded; rotate to dry weather training."
    }
  ],
  "sources": [
    {
      "title": "Pegasus 40 Technical Performance Bulletin",
      "organization": "Nike Running R&D",
      "source_url": "https://www.nike.com/running/pegasus",
      "source_type": "Manufacturer Technical Data"
    }
  ]
}
```

---

## 4. Shoe Care Center

### `GET /api/v1/care/materials/`
Lists specialized care regimens by material (`mesh`, `leather`, `suede`, `canvas`, `synthetic`, `rubber`).

---

## 5. Design Lab & Customization

### `GET /api/v1/design-lab/templates/`
Returns sketch-style vector shoe templates with regions for interactive coloring.

### `GET /api/v1/design-lab/palettes/`
Returns colorway palettes (Streetwear, Retro Vintage, Cyberpunk Neon, Earth Tones).

### `POST /api/v1/design-lab/creations/`
Saves user shoe customization state.

---

## 6. Weekly Community Challenges

### `GET /api/v1/challenges/contests/current/`
Returns the active weekly design challenge ("Create your own everyday sneaker").

### `GET /api/v1/challenges/submissions/?challenge={id}`
Returns submitted community designs with vote counts.

### `POST /api/v1/challenges/submissions/`
Submits a user-designed colorway into the challenge.

### `POST /api/v1/challenges/submissions/{id}/vote/`
Increments vote count for a submission.
