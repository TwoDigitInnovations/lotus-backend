'use strict';
require('dotenv').config();
require('module-alias/register');
const mongoose = require('mongoose');
const Blog = require('./src/models/Blog');
const Project = require('./src/models/Project');
const Gallery = require('./src/models/Gallery');
const PropertyType = require('./src/models/PropertyType');
const HeroBanner = require('./src/models/HeroBanner');

// ─── Images (picsum seeds for consistent previews) ────────────────────────────
const img = (seed, w = 800, h = 560) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: "Lotus Elara Residences",
    location: "Sector 150, Noida",
    propertySize: "1850 sq ft – 3200 sq ft",
    price: "Starting from ₹1.85 Cr*",
    status: "Under Construction",
    category: "residential",
    image: img("lotus-elara"),
    overview: `<p><strong>Lotus Elara Residences</strong> is a premium gated community set across 12 acres of lush green landscape in Noida's most sought-after address — Sector 150.</p><p>Designed for those who demand the very best, Elara offers ultra-spacious 3 and 4 BHK apartments with double-height living rooms, private sky decks, and panoramic views of the Noida-Greater Noida Expressway corridor.</p><h2>Key Highlights</h2><ul><li>80% open green spaces with a 2-acre central park</li><li>IGBC Gold certified green building</li><li>Club Elara — 35,000 sq ft lifestyle clubhouse</li><li>Infinity pool, tennis courts, cricket pitch, and amphitheatre</li><li>5-minute drive from Sector 148 Metro Station</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
      { label: "RERA CERTIFICATE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Grand Entrance", location: "Sector 150", image: img("elara-entrance") },
        { name: "Infinity Pool", location: "Sector 150", image: img("elara-pool") },
        { name: "3BHK Living Room", location: "Sector 150", image: img("elara-living") },
        { name: "Clubhouse Exterior", location: "Sector 150", image: img("elara-club") },
        { name: "Landscape Garden", location: "Sector 150", image: img("elara-garden") },
      ],
      videos: [
        { name: "Project Walkthrough", location: "Sector 150", thumbnail: img("elara-thumb1"), videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
        { name: "Drone Tour", location: "Sector 150", thumbnail: img("elara-thumb2"), videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFuns.mp4" },
      ],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida (New Okhla Industrial Development Authority) is one of India's most planned cities, forming a key part of the Delhi-NCR region. With over 2 million residents and a thriving IT and corporate ecosystem, Noida offers unmatched infrastructure, connectivity, and quality of life.</p><p>The city is served by two metro lines — the Blue Line and the Aqua Line — and has direct expressway access to Delhi, Greater Noida, and the upcoming Jewar International Airport.</p>`,
    },
    aboutSector: {
      name: "Sector 150",
      text: `<p>Sector 150 is consistently ranked as Noida's <strong>greenest and most premium residential destination</strong>. With over 80% open spaces, world-class sports infrastructure including an International Cricket Stadium, and pristine air quality, it commands the highest residential premiums in the city.</p><p>Direct access to the Noida-Greater Noida Expressway and proximity to the upcoming aqua line metro extension make it an outstanding long-term investment address.</p>`,
    },
    reraNumber: "UPRERAPRJ123456",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Lotus Crown Business Park",
    location: "Sector 132, Noida",
    propertySize: "500 sq ft – 5000 sq ft",
    price: "Starting from ₹65 Lakh*",
    status: "Ready to Move",
    category: "commercial",
    image: img("lotus-crown-biz"),
    overview: `<p><strong>Lotus Crown Business Park</strong> redefines the premium office experience in Noida's fastest-growing IT corridor. Spread across 3 million sq ft, this Grade-A commercial complex is designed for Fortune 500 companies, MNCs, and high-growth startups.</p><p>With LEED Platinum certification, 24×7 power backup, 10 Gbps internet infrastructure, and a dedicated 3-acre business plaza, Crown Business Park offers everything a modern enterprise needs.</p><h2>Specifications</h2><ul><li>Floor plate sizes from 10,000 to 85,000 sq ft</li><li>4-level basement parking for 3,200 vehicles</li><li>Dedicated concierge, conference suites, and cafeteria</li><li>Direct metro connectivity from Sector 137 station</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Tower Lobby", location: "Sector 132", image: img("crown-lobby") },
        { name: "Business Plaza", location: "Sector 132", image: img("crown-plaza") },
        { name: "Conference Suite", location: "Sector 132", image: img("crown-conf") },
        { name: "Rooftop Terrace", location: "Sector 132", image: img("crown-roof") },
      ],
      videos: [
        { name: "Office Walkthrough", location: "Sector 132", thumbnail: img("crown-thumb"), videoUrl: "#" },
      ],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's strategic location within the Delhi-NCR region, combined with its superior infrastructure and educated workforce, has made it the preferred destination for India's largest IT and corporate parks. The city hosts campuses of HCL, Wipro, Adobe, Samsung, and over 200 other blue-chip companies.</p>`,
    },
    aboutSector: {
      name: "Sector 132",
      text: `<p>Sector 132 has emerged as <strong>Noida's premier technology and commercial corridor</strong>. Located along the Noida-Greater Noida Expressway, it enjoys excellent metro access from the Aqua Line and is home to several landmark IT campuses. The sector's superior connectivity to Delhi, Gurgaon, and Greater Noida makes it ideal for regional headquarters.</p>`,
    },
    reraNumber: "UPRERAPRJ234567",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: true,
    isActive: true,
  },
  {
    name: "The Palms Villas",
    location: "Sector 79, Noida",
    propertySize: "3500 sq ft – 6200 sq ft",
    price: "Starting from ₹4.20 Cr*",
    status: "Under Construction",
    category: "residential",
    image: img("lotus-palms-villa"),
    overview: `<p><strong>The Palms Villas</strong> is an exclusive collection of only 85 ultra-luxury independent villas in Sector 79, Noida — crafted for buyers who refuse to compromise on space, privacy, or design.</p><p>Each villa features a private swimming pool, landscaped garden, double-height living room, home theatre, and a dedicated servant quarter. Built using Italian marble, German fixtures, and smart home automation as standard.</p><h2>Villa Types</h2><ul><li>Type A — 3,500 sq ft | 4 BHK + Basement | ₹4.20 Cr*</li><li>Type B — 4,800 sq ft | 5 BHK + Basement + Terrace | ₹5.60 Cr*</li><li>Type C — 6,200 sq ft | 6 BHK + Basement + Private Pool | ₹7.80 Cr*</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Villa Exterior", location: "Sector 79", image: img("palms-ext") },
        { name: "Private Pool", location: "Sector 79", image: img("palms-pool") },
        { name: "Master Suite", location: "Sector 79", image: img("palms-master") },
        { name: "Home Theatre", location: "Sector 79", image: img("palms-theatre") },
        { name: "Landscaped Garden", location: "Sector 79", image: img("palms-garden") },
      ],
      videos: [
        { name: "Villa Walkthrough", location: "Sector 79", thumbnail: img("palms-thumb"), videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
      ],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's villa segment has seen exceptional demand from HNI buyers who seek large land parcels, privacy, and customisation — all within close proximity to Delhi's business districts. The city's well-planned road network ensures that villa residents are never more than 30 minutes from any major commercial hub in the NCR.</p>`,
    },
    aboutSector: {
      name: "Sector 79",
      text: `<p>Sector 79 is one of Noida's most established mid-to-premium residential sectors. With wide tree-lined avenues, excellent social infrastructure (schools, hospitals, malls), and easy access to the Noida-Greater Noida Link Road, it has consistently attracted discerning homebuyers looking for a quiet yet well-connected address.</p>`,
    },
    reraNumber: "UPRERAPRJ345678",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Lotus Skyline Towers",
    location: "Sector 94, Noida",
    propertySize: "1200 sq ft – 2400 sq ft",
    price: "Starting from ₹1.10 Cr*",
    status: "Ready to Move",
    category: "residential",
    image: img("lotus-skyline"),
    overview: `<p><strong>Lotus Skyline Towers</strong> is a landmark completed residential project in the heart of Sector 94 — one of Noida's most premium and centrally located sectors adjacent to the Delhi-Noida border.</p><p>All 420 apartments across 4 high-rise towers have been delivered and are occupied. The project offers 2 and 3 BHK residences with stunning views of the Yamuna floodplains and the Delhi skyline.</p><h2>Amenities</h2><ul><li>Olympic-size swimming pool and kids' pool</li><li>Fully equipped 8,000 sq ft gymnasium</li><li>Indoor squash and badminton courts</li><li>Children's play areas and senior citizen zones</li><li>24×7 CCTV surveillance and security</li></ul>`,
    documents: [
      { label: "COMPLETION CERTIFICATE", url: "#" },
      { label: "FLOOR PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Tower View", location: "Sector 94", image: img("skyline-tower") },
        { name: "Swimming Pool", location: "Sector 94", image: img("skyline-pool") },
        { name: "Gym", location: "Sector 94", image: img("skyline-gym") },
        { name: "2BHK Living Room", location: "Sector 94", image: img("skyline-living") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's adjacency to South Delhi makes it uniquely valuable in the NCR landscape. Residents of Sector 94 can reach Saket, Lajpat Nagar, and Connaught Place within 20–30 minutes, while enjoying significantly lower real estate prices compared to equivalent Delhi addresses.</p>`,
    },
    aboutSector: {
      name: "Sector 94",
      text: `<p>Sector 94 is Noida's most premium residential and commercial address — directly adjacent to the Delhi border at DND Flyway. Home to international 5-star hotels, premium office towers, and high-end residences, it commands the highest per sq ft prices in Noida. Excellent metro connectivity via the Blue Line's Sector 18 station ensures seamless access to the rest of NCR.</p>`,
    },
    reraNumber: "UPRERAPRJ456789",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Horizon One Mall & Offices",
    location: "Sector 18, Noida",
    propertySize: "200 sq ft – 8000 sq ft",
    price: "Starting from ₹28 Lakh*",
    status: "Under Construction",
    category: "commercial",
    image: img("lotus-horizon-mall"),
    overview: `<p><strong>Horizon One</strong> is a landmark mixed-use development in Sector 18 — Noida's most vibrant commercial and retail district. The 8-level development integrates premium high-street retail, Grade-A office spaces, and a rooftop F&B zone into a single iconic address.</p><p>With a daily footfall of 50,000+ projected at full occupancy, Horizon One is designed to become the defining commercial landmark of Noida's central business district.</p><h2>Components</h2><ul><li><strong>Retail (G + 3 floors)</strong> — 180 shops, anchored by a hypermarket and multiplex</li><li><strong>Offices (4th–7th floors)</strong> — 200 units from 300 to 5,000 sq ft</li><li><strong>Sky Deck (Rooftop)</strong> — 12 premium F&B outlets with panoramic city views</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Facade Render", location: "Sector 18", image: img("horizon-facade") },
        { name: "Retail Atrium", location: "Sector 18", image: img("horizon-atrium") },
        { name: "Office Floor", location: "Sector 18", image: img("horizon-office") },
        { name: "Sky Deck", location: "Sector 18", image: img("horizon-sky") },
      ],
      videos: [
        { name: "Project Presentation", location: "Sector 18", thumbnail: img("horizon-thumb"), videoUrl: "#" },
      ],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's retail and commercial real estate market has grown at a CAGR of 12% over the last five years, driven by a young, affluent population and the influx of MNCs establishing regional headquarters in the city. The sector's strong fundamentals make commercial investment here among the most compelling in NCR.</p>`,
    },
    aboutSector: {
      name: "Sector 18",
      text: `<p>Sector 18 is the <strong>commercial nerve centre of Noida</strong> — home to Atta Market, DLF Mall of India, The Great India Place, and dozens of premium office towers. With a direct metro station on the Blue Line, daily footfall exceeding 200,000, and some of the highest commercial rentals in the city, Sector 18 remains Noida's most coveted business address.</p>`,
    },
    reraNumber: "UPRERAPRJ567890",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Green Haven Apartments",
    location: "Sector 168, Noida",
    propertySize: "950 sq ft – 1800 sq ft",
    price: "Starting from ₹75 Lakh*",
    status: "Ready to Move",
    category: "residential",
    image: img("green-haven-apts"),
    overview: `<p><strong>Green Haven Apartments</strong> is a thoughtfully designed affordable-luxury residential complex in Sector 168, offering 2 and 3 BHK homes with premium fittings, ample natural light, and a full suite of lifestyle amenities — all within a secure gated community.</p><p>With 980 families already in residence, Green Haven has established itself as one of Sector 168's most coveted addresses. The project is RERA compliant and all possession formalities have been completed.</p><h2>Amenities</h2><ul><li>2 swimming pools (adults and children)</li><li>Landscaped central park — 1.5 acres</li><li>Multipurpose community hall</li><li>Jogging track, yoga lawn, and outdoor gym</li><li>EV charging stations in basement parking</li></ul>`,
    documents: [
      { label: "COMPLETION CERTIFICATE", url: "#" },
      { label: "FLOOR PLAN", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Project Exterior", location: "Sector 168", image: img("haven-ext") },
        { name: "Central Park", location: "Sector 168", image: img("haven-park") },
        { name: "Swimming Pool", location: "Sector 168", image: img("haven-pool") },
        { name: "2BHK Sample Flat", location: "Sector 168", image: img("haven-flat") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's mid-segment residential market has seen strong end-user demand driven by IT professionals, government employees, and young families relocating from Delhi in search of larger homes at accessible price points. The city's robust rental market also makes it attractive for investors seeking steady rental yields of 3–4% annually.</p>`,
    },
    aboutSector: {
      name: "Sector 168",
      text: `<p>Sector 168 is a rapidly developing residential sector along the Noida-Greater Noida Expressway. Excellent social infrastructure — top-rated schools (DPS, Ryan), hospitals (Felix, Yatharth), and retail (Logix City Centre) — combined with competitive pricing make it the top choice for young families upgrading from smaller apartments.</p>`,
    },
    reraNumber: "UPRERAPRJ678901",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Tech Park Alpha",
    location: "Sector 62, Noida",
    propertySize: "1000 sq ft – 25000 sq ft",
    price: "On Request",
    status: "Ready to Move",
    category: "commercial",
    image: img("techpark-alpha"),
    overview: `<p><strong>Tech Park Alpha</strong> is a fully operational, 100% leased Grade-A IT and ITeS park in Sector 62 — Noida's established technology corridor. The 5-tower complex offers pre-certified green office spaces with best-in-class specifications for technology-led businesses.</p><p>Current tenants include divisions of IBM, Cognizant, HCL Technologies, and Concentrix. Resale and sub-lease opportunities are available at select floor plates.</p><h2>Specifications</h2><ul><li>Total leasable area: 1.2 million sq ft across 5 towers</li><li>Floor efficiency: 80–85%</li><li>Power load: 8W/sq ft with 100% DG backup</li><li>HVAC: Centralised VRF system, 24×7 operation</li><li>IGBC Gold certified</li></ul>`,
    documents: [
      { label: "LEASING BROCHURE", url: "#" },
      { label: "FLOOR PLAN", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Tower A Lobby", location: "Sector 62", image: img("alpha-lobby") },
        { name: "Office Floor", location: "Sector 62", image: img("alpha-floor") },
        { name: "Cafeteria", location: "Sector 62", image: img("alpha-caf") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's information technology sector employs over 600,000 professionals and contributes significantly to UP's GDP. The city's well-developed social infrastructure, competitive rentals compared to Gurgaon and Bengaluru, and young talent pool from IIT Delhi, NSIT, and Amity University make it a compelling IT destination for global corporations.</p>`,
    },
    aboutSector: {
      name: "Sector 62",
      text: `<p>Sector 62 is one of Noida's <strong>most established IT and commercial corridors</strong>, home to iconic campuses of Infosys, Tech Mahindra, and Sapient. With direct metro access from Noida Electronic City Station on the Blue Line, excellent road connectivity, and a mature ecosystem of restaurants, hotels, and support services, it remains the preferred address for IT companies seeking proven locations.</p>`,
    },
    reraNumber: "UPRERAPRJ789012",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Lotus Aspire Suites",
    location: "Sector 1, Greater Noida West",
    propertySize: "600 sq ft – 1150 sq ft",
    price: "Starting from ₹42 Lakh*",
    status: "Under Construction",
    category: "residential",
    image: img("lotus-aspire"),
    overview: `<p><strong>Lotus Aspire Suites</strong> is a premium compact homes project designed for first-time homebuyers, working professionals, and investors seeking strong rental returns in Greater Noida West — one of NCR's fastest-growing micro-markets.</p><p>Offering smartly designed 1 and 2 BHK apartments with modular kitchens, ample storage, and modern finishes, Aspire Suites is positioned to deliver possession by Q2 2026.</p><h2>Investment Highlights</h2><ul><li>Expected rental yield: 4–5% per annum</li><li>5-minute drive from Gaur City Mall and multiple IT parks</li><li>Upcoming metro connectivity via the proposed Aqua Line extension</li><li>Easy home loan approvals from SBI, HDFC, ICICI, and Axis Bank</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Project Render", location: "Greater Noida West", image: img("aspire-render") },
        { name: "1BHK Sample Flat", location: "Greater Noida West", image: img("aspire-1bhk") },
        { name: "Lobby Area", location: "Greater Noida West", image: img("aspire-lobby") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Greater Noida West",
      text: `<p>Greater Noida West (formerly known as Noida Extension) has transformed into one of NCR's most sought-after affordable residential destinations over the past decade. With over 3 lakh residential units delivered and a growing population of 8 lakh residents, it now has a fully functional social ecosystem of schools, hospitals, malls, and restaurants.</p>`,
    },
    aboutSector: {
      name: "Sector 1, Greater Noida West",
      text: `<p>Sector 1, Greater Noida West is one of the area's earliest and most developed sectors. Strategically located at the entry point from Noida, it offers excellent connectivity via NH-9 and the Hindon Elevated Road. The sector hosts multiple established housing societies, the Gaur City commercial complex, and is the anchor sector for the proposed Aqua Line metro extension.</p>`,
    },
    reraNumber: "UPRERAPRJ890123",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "The Sterling Penthouses",
    location: "Sector 44, Noida",
    propertySize: "4800 sq ft – 7500 sq ft",
    price: "Starting from ₹6.50 Cr*",
    status: "Under Construction",
    category: "residential",
    image: img("sterling-pent"),
    overview: `<p><strong>The Sterling Penthouses</strong> is an extraordinarily exclusive collection of just 24 double-storey penthouses across two premium towers in Sector 44 — sitting at the pinnacle of Noida's luxury residential market.</p><p>Each penthouse features 360-degree city views, a private terrace pool, home office, wine cellar, and dedicated elevator access. Only one per floor, ensuring absolute privacy and exclusivity.</p><h2>Features</h2><ul><li>Private rooftop pool and terrace garden (each penthouse)</li><li>4-car private basement bay with EV charging</li><li>Smart home automation by Crestron</li><li>Branded kitchen by Häcker (Germany) with Miele appliances</li><li>Concierge services and private club membership included</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Penthouse Terrace", location: "Sector 44", image: img("sterling-terrace") },
        { name: "Living Room", location: "Sector 44", image: img("sterling-living") },
        { name: "Master Bathroom", location: "Sector 44", image: img("sterling-bath") },
        { name: "Private Pool", location: "Sector 44", image: img("sterling-pool") },
      ],
      videos: [
        { name: "Penthouse Experience", location: "Sector 44", thumbnail: img("sterling-thumb"), videoUrl: "#" },
      ],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's ultra-luxury segment — properties above ₹5 Cr — has seen demand grow by 38% year-on-year, driven by senior corporate executives, NRIs, and successful entrepreneurs who seek world-class living without the chaos of central Delhi. The city's clean air quality index, wide roads, and planned infrastructure make it uniquely suited for luxury living.</p>`,
    },
    aboutSector: {
      name: "Sector 44",
      text: `<p>Sector 44 is among Noida's most prestigious residential enclaves, characterised by wide avenues, mature tree cover, and low-density, high-quality residential development. Located adjacent to Sector 18's commercial district and within 2 km of the Noida City Centre metro station, it combines exclusivity with unmatched urban convenience.</p>`,
    },
    reraNumber: "UPRERAPRJ901234",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: true,
    isActive: true,
  },
  {
    name: "Lotus Avenue Plots",
    location: "Yamuna Expressway, Greater Noida",
    propertySize: "100 sq yd – 500 sq yd",
    price: "Starting from ₹18 Lakh*",
    status: "Ready to Move",
    category: "residential",
    image: img("lotus-plots"),
    overview: `<p><strong>Lotus Avenue Plots</strong> is a RERA-registered plotted development along the Yamuna Expressway — India's most ambitious real estate corridor, directly connecting Greater Noida to Agra and housing the upcoming Jewar International Airport, F1 Circuit, and multiple mega-industrial zones.</p><p>All plots are freehold, with clear titles, boundary walls, approach roads, and underground utilities (water, sewerage, electricity) already in place.</p><h2>Why Invest Here</h2><ul><li>3 km from the Jewar International Airport site</li><li>Adjacent to YEIDA's proposed Film City and Medical Device Park</li><li>10-year projected appreciation: 150–200%</li><li>Flexible construction timeline — build at your own pace</li></ul>`,
    documents: [
      { label: "PLOT LAYOUT PLAN", url: "#" },
      { label: "RERA CERTIFICATE", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Expressway View", location: "Yamuna Expressway", image: img("plots-exp") },
        { name: "Plot Layout", location: "Yamuna Expressway", image: img("plots-layout") },
        { name: "Internal Roads", location: "Yamuna Expressway", image: img("plots-roads") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Greater Noida",
      text: `<p>Greater Noida has been transformed by the Yamuna Expressway into one of India's most exciting investment corridors. The upcoming Jewar International Airport — projected to be India's largest — along with the proposed Noida International Film City, the existing Formula 1 race circuit, and the Buddh International Circuit have made this region a genuine global destination for business and tourism.</p>`,
    },
    aboutSector: {
      name: "Yamuna Expressway",
      text: `<p>The Yamuna Expressway Industrial Development Area (YEIDA) spans 165 km from Greater Noida to Agra and has witnessed some of the most spectacular land price appreciation in NCR history. Plots near the Jewar Airport have seen 3–4x returns since 2019. With multiple mega-projects under construction and government focus on the region, the long-term outlook remains exceptional.</p>`,
    },
    reraNumber: "UPRERAPRJ012345",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Lotus Nexus IT Hub",
    location: "Sector 125, Noida",
    propertySize: "400 sq ft – 10000 sq ft",
    price: "Starting from ₹55 Lakh*",
    status: "Under Construction",
    category: "commercial",
    image: img("lotus-nexus-it"),
    overview: `<p><strong>Lotus Nexus IT Hub</strong> is a next-generation technology park designed for the new era of hybrid work — combining premium private offices, co-working zones, and enterprise floor plates in a single highly flexible commercial destination.</p><p>The 22-floor tower offers plug-and-play offices from Day 1 for startups, and fully customisable floor plates for established enterprises. Surrounded by India's largest IT campuses and with metro access at the doorstep, Nexus IT Hub offers the best of all worlds.</p><h2>Office Solutions</h2><ul><li><strong>FlexDesk</strong> — Hot-desking from ₹8,000/month per seat</li><li><strong>Cabin Offices</strong> — 4–20 seats from ₹55 Lakh (ownership)</li><li><strong>Enterprise Floors</strong> — 5,000–10,000 sq ft for large teams</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Tower Exterior", location: "Sector 125", image: img("nexus-ext") },
        { name: "Co-working Zone", location: "Sector 125", image: img("nexus-cowork") },
        { name: "Private Cabin", location: "Sector 125", image: img("nexus-cabin") },
        { name: "Rooftop Lounge", location: "Sector 125", image: img("nexus-roof") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's commercial office market absorbed over 4.5 million sq ft of space in 2024 alone, driven by technology sector expansion, global capability centres (GCCs) established by Fortune 500 companies, and the rise of flex-office operators. The city's office rentals remain 30–40% lower than Gurgaon for equivalent quality, making it a highly cost-effective business destination.</p>`,
    },
    aboutSector: {
      name: "Sector 125",
      text: `<p>Sector 125 is a premium office corridor alongside the Noida-Greater Noida Expressway, within walking distance of Sector 137 Metro Station on the Aqua Line. The sector is home to global campuses of Ernst & Young, Accenture, and Deloitte, creating a mature business ecosystem with excellent talent density and supporting services.</p>`,
    },
    reraNumber: "UPRERAPRJ112233",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Royale Gardens Township",
    location: "Sector 150, Noida",
    propertySize: "1400 sq ft – 2800 sq ft",
    price: "Starting from ₹1.40 Cr*",
    status: "Under Construction",
    category: "residential",
    image: img("royale-gardens"),
    overview: `<p><strong>Royale Gardens Township</strong> is a large-format integrated township in Sector 150 offering 2, 3, and 4 BHK residences designed for complete self-sufficiency — with retail, a school, a clinic, and a clubhouse all within the 25-acre campus.</p><p>Phase 1 comprising 1,200 units is under construction with expected delivery by December 2026. Phase 2 bookings open in Q3 2025.</p><h2>Township Amenities</h2><ul><li>Royale Club — 50,000 sq ft with an Olympic pool, spa, and sports academy</li><li>Retail High Street — 30 curated retail outlets within the campus</li><li>Royale International School (CBSE affiliated) — opening 2026</li><li>Primary healthcare clinic and pharmacy within campus</li><li>100% power backup with on-site solar generation (30% energy offset)</li></ul>`,
    documents: [
      { label: "FLOOR PLAN", url: "#" },
      { label: "MASTER PLAN", url: "#" },
      { label: "BROCHURE", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Township Aerial View", location: "Sector 150", image: img("royale-aerial") },
        { name: "Clubhouse", location: "Sector 150", image: img("royale-club") },
        { name: "3BHK Living Room", location: "Sector 150", image: img("royale-living") },
        { name: "Swimming Pool", location: "Sector 150", image: img("royale-pool") },
        { name: "Retail Street", location: "Sector 150", image: img("royale-retail") },
      ],
      videos: [
        { name: "Township Walkthrough", location: "Sector 150", thumbnail: img("royale-thumb"), videoUrl: "#" },
      ],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's integrated township segment has emerged as the fastest-growing category in NCR real estate, driven by buyers seeking self-contained communities with all amenities on-site. Post-pandemic, the preference for spacious, amenity-rich environments has accelerated demand for township living significantly.</p>`,
    },
    aboutSector: {
      name: "Sector 150",
      text: `<p>Sector 150 is Noida's flagship green residential sector, master-planned to ensure that green spaces occupy the majority of the total area. The sector's sports facilities — including a proposed International Cricket Stadium and multiple sports academies — have made it the preferred address for health-conscious families who prioritise active lifestyles alongside luxury living.</p>`,
    },
    reraNumber: "UPRERAPRJ223344",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: true,
    isActive: true,
  },
  {
    name: "The Metro Suites",
    location: "Sector 52, Noida",
    propertySize: "750 sq ft – 1400 sq ft",
    price: "Starting from ₹88 Lakh*",
    status: "Ready to Move",
    category: "residential",
    image: img("metro-suites"),
    overview: `<p><strong>The Metro Suites</strong> is a premium transit-oriented development located just 300 metres walking distance from Noida Sector 52 Metro Station — making it the most connected residential address in Noida's Blue Line corridor.</p><p>All 280 apartments across 2 towers have been delivered and are operational. The project has achieved 95% occupancy with strong rental demand from IT professionals working in the Sector 62 and Sector 125 corridors.</p><h2>Investment Performance</h2><ul><li>Average rental: ₹28,000–₹45,000/month (2-3 BHK)</li><li>Rental yield: 4.2% per annum on current market value</li><li>Capital appreciation since launch (2019): 42%</li><li>Resale transactions in 2024: 38 units</li></ul>`,
    documents: [
      { label: "COMPLETION CERTIFICATE", url: "#" },
      { label: "FLOOR PLAN", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Building Exterior", location: "Sector 52", image: img("metro-ext") },
        { name: "Reception Lobby", location: "Sector 52", image: img("metro-lobby") },
        { name: "2BHK Sample Flat", location: "Sector 52", image: img("metro-flat") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's rental market has strengthened significantly following the IT sector boom, with average rents in metro-accessible sectors growing at 12–15% annually since 2022. The influx of multinational corporations establishing large teams in the city has created sustained demand for quality rental apartments near metro stations.</p>`,
    },
    aboutSector: {
      name: "Sector 52",
      text: `<p>Sector 52 is a well-established residential sector with direct metro access, making it one of the most liquid real estate micro-markets in Noida. The sector's proximity to the Sector 62 IT hub, Golf Course, and multiple premium retail destinations ensures consistent demand from both owner-occupiers and investors.</p>`,
    },
    reraNumber: "UPRERAPRJ334455",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
  {
    name: "Innovate Office Spaces",
    location: "Sector 2, Noida",
    propertySize: "250 sq ft – 3000 sq ft",
    price: "Starting from ₹32 Lakh*",
    status: "Ready to Move",
    category: "commercial",
    image: img("innovate-offices"),
    overview: `<p><strong>Innovate Office Spaces</strong> is a boutique commercial project delivering small-to-mid format office ownership to entrepreneurs, CAs, law firms, and growing businesses who want to own rather than rent their workspace in central Noida.</p><p>With all 120 units fully delivered and functional, the project offers immediate possession and rental income from Day 1 for investor buyers.</p><h2>Why Own Your Office</h2><ul><li>EMI often lower than prevailing market rentals in the area</li><li>Current rental income: ₹45–₹65 per sq ft per month</li><li>Rental yield: 6–7% per annum — among the highest in Noida</li><li>Zero GST input credit loss as registered commercial property</li></ul>`,
    documents: [
      { label: "COMPLETION CERTIFICATE", url: "#" },
      { label: "FLOOR PLAN", url: "#" },
    ],
    gallery: {
      photos: [
        { name: "Building Facade", location: "Sector 2", image: img("innovate-facade") },
        { name: "Reception Area", location: "Sector 2", image: img("innovate-rec") },
        { name: "Sample Office", location: "Sector 2", image: img("innovate-office") },
      ],
      videos: [],
    },
    aboutCity: {
      name: "Noida",
      text: `<p>Noida's small and medium enterprise (SME) sector has expanded rapidly, creating significant demand for owned commercial spaces in the 250–1,500 sq ft range. The city's MSMEs — particularly in technology, consulting, and professional services — are increasingly choosing to own rather than rent, driven by rising rental costs and the asset-building advantage of ownership.</p>`,
    },
    aboutSector: {
      name: "Sector 2",
      text: `<p>Sector 2 is one of Noida's original commercial sectors, conveniently located near the Sector 15 Metro Station and the UP Government offices. The sector has a mature commercial ecosystem with banks, courts, government offices, and a thriving professional services community — making it ideal for CAs, lawyers, consultants, and financial firms.</p>`,
    },
    reraNumber: "UPRERAPRJ445566",
    reraUrl: "https://www.up-rera.in/",
    isFeatured: false,
    isActive: true,
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
const BLOGS = [
  {
    title: "Why Sector 150 Noida is the Best Real Estate Investment in 2025",
    slug: "sector-150-noida-best-investment-2025",
    description: "Sector 150 consistently tops every list of Noida's most premium residential destinations. Here's the data-backed case for why it remains the best investment in NCR for 2025.",
    isPublished: true,
    publishedAt: new Date(),
    image: img("blog-sector150"),
    content: [`<h2>The Green City Within a City</h2>
<p>If you've spent any time researching Noida real estate, you've heard the same name mentioned again and again: <strong>Sector 150</strong>. And for good reason. While other sectors in Noida offer good connectivity or competitive pricing, Sector 150 offers something genuinely rare in Indian real estate — a master-planned environment where green space isn't an afterthought. It's the foundation.</p>
<p>Over <strong>80% of Sector 150's total area is open green space</strong>. For context, most residential sectors in Noida average 40–50%. This isn't just a marketing figure. When you walk through Sector 150, the difference is visceral. Wide tree-lined boulevards, manicured parks between towers, cycling tracks, and a 2-acre central lake in several township projects. The air quality index consistently reads 20–30 points better than central Noida.</p>

<h2>The Sports Infrastructure Advantage</h2>
<p>Sector 150 is home to the proposed <strong>International Cricket Stadium</strong> — the first international-standard cricket venue in Noida. Beyond cricket, the sector already hosts:</p>
<ul>
<li>A full-size FIFA-standard football ground</li>
<li>8 international-standard tennis courts</li>
<li>An Olympic-standard 400m athletics track</li>
<li>Multiple badminton and squash academies</li>
</ul>
<p>For families with children who are serious about sports, this infrastructure is unmatched in NCR at any price point.</p>

<h2>Connectivity — Better Than You Think</h2>
<p>The common perception that Sector 150 is "far" from Delhi is outdated. The <strong>Noida-Greater Noida Expressway</strong> connects Sector 150 to Noida City Centre in 20 minutes at off-peak hours. The upcoming <strong>Aqua Line metro extension</strong> to Sector 150 is fully approved and under construction, with the Sector 148 station already operational just 1.5 km away.</p>
<p>Drive times from Sector 150:</p>
<ul>
<li>Connaught Place, Delhi — 45 minutes (DND + NH-48)</li>
<li>Cyber City, Gurgaon — 50 minutes (via DND)</li>
<li>Jewar International Airport — 25 minutes (via Yamuna Expressway)</li>
<li>Noida Sector 62 IT Hub — 18 minutes</li>
</ul>

<h2>Price Appreciation — The Numbers Tell the Story</h2>
<p>Sector 150 has consistently delivered among the strongest capital appreciation in NCR. Average residential prices have grown from <strong>₹4,200 per sq ft in 2018 to ₹9,800 per sq ft in 2024</strong> — a 133% increase over 6 years, significantly outperforming Gurgaon's DLF Phase 5 (89% over the same period) and Mumbai's Powai (67%).</p>
<p>The outlook for 2025–2027 remains equally compelling. Three major triggers are converging:</p>
<ol>
<li><strong>Metro arrival</strong> — projected 15–20% price uplift on station-adjacent projects upon metro inauguration</li>
<li><strong>Jewar Airport opening</strong> — scheduled for 2026, will significantly increase Sector 150's catchment and demand</li>
<li><strong>Cricket Stadium completion</strong> — international visibility and tourism spillover</li>
</ol>

<h2>Our Recommendation</h2>
<p>Whether you're an end-user prioritising quality of life or an investor seeking capital growth, <strong>Sector 150 remains the single best residential investment in NCR for 2025</strong>. The combination of green living, world-class amenities, improving connectivity, and a proven appreciation track record makes it a category of one.</p>
<p>Lotus Real Estate has multiple active projects in Sector 150. Call our team today for a personalised site visit and investment consultation.</p>`],
  },
  {
    title: "The Complete Homebuyer's Guide to RERA in Uttar Pradesh",
    slug: "complete-guide-rera-uttar-pradesh-homebuyer",
    description: "RERA has transformed the Indian real estate market since 2016. This comprehensive guide explains everything a UP homebuyer needs to know about their rights, how to verify projects, and what protections the law provides.",
    isPublished: true,
    publishedAt: new Date(),
    image: img("blog-rera"),
    content: [`<h2>What Is RERA and Why Does It Exist?</h2>
<p>The <strong>Real Estate (Regulation and Development) Act, 2016</strong> is the most significant reform in Indian real estate in decades. Before RERA, the sector was largely unregulated — builders could delay projects indefinitely, change layouts post-booking, or divert funds to other projects without accountability. The result was an epidemic of stalled projects, with an estimated <strong>5 lakh homes stuck in limbo</strong> across India as of 2015.</p>
<p>RERA was designed to fix this. By mandating registration, financial discipline, and legal accountability, it fundamentally shifted power toward the homebuyer.</p>

<h2>UP RERA — Uttar Pradesh's Implementation</h2>
<p>The <strong>Uttar Pradesh Real Estate Regulatory Authority (UP RERA)</strong> was established in 2017 and covers all projects in Uttar Pradesh, including Noida, Greater Noida, Ghaziabad, Lucknow, and Agra. UP RERA is widely regarded as one of India's most active and buyer-friendly RERA authorities.</p>
<p>You can access the UP RERA portal at <strong>up-rera.in</strong>, where you can:</p>
<ul>
<li>Verify any project's registration status</li>
<li>Check the builder's declared completion timeline</li>
<li>View approved building plans and floor layouts</li>
<li>File complaints online against developers</li>
<li>Track the status of your complaint</li>
</ul>

<h2>5 Key Rights RERA Gives You as a Buyer</h2>
<h3>1. Right to Information</h3>
<p>Builders must disclose all project details — approved plans, layout, number of apartments, amenities, and completion dates — on the RERA portal before launching sales. Any change to the approved plan requires buyer consent.</p>

<h3>2. Right to Escrow Protection</h3>
<p>Builders must deposit <strong>70% of all collections</strong> in a dedicated escrow account, to be used only for construction of that specific project. This prevents fund diversion — the primary cause of project delays in the pre-RERA era.</p>

<h3>3. Right to Compensation for Delays</h3>
<p>If your builder misses the RERA-registered possession date, you are entitled to either:</p>
<ul>
<li>A full refund with <strong>SBI MCLR + 2% interest</strong> per annum from the date of payment</li>
<li>Monthly compensation for the delay period, calculated at the same rate</li>
</ul>
<p>This compensation right is automatic — you do not need to prove financial loss. The delay itself is sufficient.</p>

<h3>4. Right to Structural Defect Warranty</h3>
<p>Builders are liable for any structural defects for <strong>5 years</strong> after possession. If defects appear in this period, the builder must fix them at no cost within 30 days of notification.</p>

<h3>5. Right to Fair Carpet Area Pricing</h3>
<p>RERA mandates that pricing must be on <strong>carpet area basis</strong> — not super built-up area. This prevents builders from inflating prices by including common areas (lobbies, staircases, walls) in the quoted square footage.</p>

<h2>How to File a RERA Complaint in UP</h2>
<p>If a builder violates RERA provisions, filing a complaint is straightforward:</p>
<ol>
<li>Register on the UP RERA portal (up-rera.in)</li>
<li>Submit Form N (complaint form) with supporting documents</li>
<li>Pay the nominal filing fee (₹1,000 for most complaints)</li>
<li>The authority typically issues a hearing notice within 30 days</li>
<li>Most complaints are resolved within 60–90 days</li>
</ol>

<h2>Red Flags to Watch Before Buying</h2>
<p>Always verify these before paying any amount:</p>
<ul>
<li>✅ RERA registration number is valid on the UP RERA portal</li>
<li>✅ Builder's previous projects have been delivered on time</li>
<li>✅ The floor plan you're booking is part of the RERA-approved layout</li>
<li>✅ The escrow account details are clearly mentioned in the builder-buyer agreement</li>
<li>✅ The agreed possession date is registered with RERA (not just verbally promised)</li>
</ul>

<p>All Lotus Real Estate projects are fully RERA registered and compliant. Contact our team to verify registration details for any of our active projects.</p>`],
  },
  {
    title: "5 Smart Investment Strategies for NCR Real Estate in 2025",
    slug: "smart-real-estate-investment-strategies-ncr-2025",
    description: "Whether you're a first-time investor or adding to an existing portfolio, these five proven strategies will help you maximise returns in the NCR real estate market in 2025.",
    isPublished: true,
    publishedAt: new Date(),
    image: img("blog-investment"),
    content: [`<h2>The Investment Case for NCR Real Estate</h2>
<p>The National Capital Region remains India's largest and most liquid real estate market. Despite global economic headwinds, NCR's residential market delivered record sales volumes in 2024 — crossing ₹1.2 lakh crore in transaction value for the first time. For investors, this combination of scale, liquidity, and appreciation makes NCR a compelling allocation.</p>
<p>But not all NCR investments are equal. The difference between a 6% annual return and a 22% annual return often comes down to <strong>strategy, timing, and micro-market selection</strong>. Here are five approaches that have consistently delivered superior results.</p>

<h2>Strategy 1 — Pre-Launch Investment in Reputed Developers</h2>
<p>The highest returns in real estate consistently come from buying at the <strong>pre-launch or early-launch stage</strong> from credible developers with proven delivery track records. Pre-launch prices typically sit 15–25% below the official launch price, which itself sits 20–30% below the ready-to-move price.</p>
<p>The compounding effect of this discount over a 3–4 year construction period routinely delivers 35–50% total returns for buyers who identify the right projects early.</p>
<p><strong>Risk management:</strong> Only invest in pre-launch with RERA-registered developers who have delivered at least 3–5 projects on time. Verify the escrow structure before payment.</p>

<h2>Strategy 2 — Metro Corridor Investments</h2>
<p>Properties within <strong>500 metres of operational or confirmed metro stations</strong> consistently command a 12–18% premium over comparable properties 1 km away — and this premium widens when the metro line opens if you've bought during construction.</p>
<p>In NCR, the upcoming metro expansions to watch:</p>
<ul>
<li>Aqua Line extension to Sector 150 Noida</li>
<li>Delhi Metro Phase 4 to Aerocity and Tughlakabad</li>
<li>RapidX (RRTS) to Meerut and Alwar</li>
</ul>
<p>Buying residential or commercial properties in the under-construction catchment zones of these lines today captures the announcement-to-opening appreciation.</p>

<h2>Strategy 3 — Commercial Office Investment for Rental Yield</h2>
<p>Residential properties in NCR typically yield 2–3% annually in rent. <strong>Commercial properties in established IT corridors yield 6–9%</strong> — making them far superior income-generating assets for investors who don't need to live in their investment.</p>
<p>The sweet spot for commercial investment in Noida is small offices (250–600 sq ft) in Sector 62, Sector 125, or Sector 132, priced between ₹30–80 lakh. These are easily rentable to SMEs, CAs, and tech firms, and transact quickly when resale is needed.</p>

<h2>Strategy 4 — Land and Plotted Developments Near Jewar Airport</h2>
<p>The Jewar International Airport — India's largest airport by area — is scheduled to open for operations in 2026. Land along the Yamuna Expressway within 10 km of the airport site has already seen 3–5x appreciation since 2019, and most analysts expect continued strong performance as the opening date approaches.</p>
<p>RERA-registered plotted developments from credible developers along the Yamuna Expressway offer the best risk-adjusted exposure to this mega-theme.</p>

<h2>Strategy 5 — Ready-to-Move Premium for End-Users Who Are Also Investors</h2>
<p>If you're buying a home you'll live in, buying <strong>ready-to-move over under-construction</strong> has distinct financial advantages in the current market:</p>
<ul>
<li>No GST (saves 5% on residential properties)</li>
<li>Rental income possible immediately (hedge against EMI cost)</li>
<li>No construction risk or delay risk</li>
<li>Easier home loan approval (banks lend at lower LTV for under-construction)</li>
</ul>
<p>In Noida, quality ready-to-move properties in Sectors 44, 50, 94, and 150 are trading at fair value and offer excellent long-term hold value as well as livability.</p>

<h2>Final Thought</h2>
<p>The best real estate investment is the one aligned with your financial goals, time horizon, and risk tolerance — not simply the one with the most buzz. A disciplined approach using one or more of these strategies, combined with proper RERA verification and developer due diligence, will position you for strong returns in NCR's dynamic market.</p>
<p>Reach out to our investment advisory team for a personalised consultation tailored to your goals.</p>`],
  },
  {
    title: "How to Choose the Right Builder in Noida — A Practical Checklist",
    slug: "how-to-choose-right-builder-noida-checklist",
    description: "With hundreds of developers active in Noida, choosing the right builder is the most critical decision in your homebuying journey. This practical checklist will help you evaluate any developer before you sign.",
    isPublished: true,
    publishedAt: new Date(),
    image: img("blog-builder"),
    content: [`<h2>Why Builder Selection Matters More Than Location</h2>
<p>Most homebuyers spend weeks researching locations and project features, but rush through the most important decision of all: <strong>who is actually building their home</strong>. A prime location means nothing if the builder doesn't deliver, and world-class amenities are worthless if the building quality is poor.</p>
<p>In Noida's market, we've seen premium properties in excellent locations remain stuck for years due to builder financial troubles, RERA violations, or simply poor execution. Conversely, buyers who chose credible developers in slightly secondary locations have seen their projects delivered on time and appreciated strongly.</p>
<p>Here's the checklist we recommend to every homebuyer before signing with any developer.</p>

<h2>✅ Phase 1 — RERA Verification (Non-Negotiable)</h2>
<p>Before anything else, verify the project on the <strong>UP RERA portal (up-rera.in)</strong>:</p>
<ul>
<li>Is the project registered? (Look for the RERA number starting with UPRERAPRJ)</li>
<li>What is the registered possession date?</li>
<li>Has the builder been penalised by RERA in the past?</li>
<li>Are there active complaints against the builder on this or other projects?</li>
<li>Is the floor plan you're being shown the RERA-approved one?</li>
</ul>
<p><strong>Red flag:</strong> Any builder who asks you to pay before the project is registered with RERA — even a small "booking amount" — should be approached with extreme caution.</p>

<h2>✅ Phase 2 — Track Record Assessment</h2>
<p>Research the developer's history systematically:</p>
<ol>
<li><strong>Previous projects delivered:</strong> How many? Were they on time?</li>
<li><strong>Quality inspection:</strong> Visit an occupied project. Talk to actual residents.</li>
<li><strong>Online reviews:</strong> Check Google Reviews, MagicBricks forums, and 99acres complaints section for the builder's name.</li>
<li><strong>RERA complaint history:</strong> Search the builder's name on the UP RERA portal. Multiple pending complaints are a serious warning sign.</li>
</ol>

<h2>✅ Phase 3 — Financial Health Indicators</h2>
<p>A builder's financial stability directly determines whether your project will be completed. Look for these indicators:</p>
<ul>
<li>Builder has a credit rating from CRISIL, ICRA, or CARE (ask for it directly)</li>
<li>Construction is already visibly progressing on site (not just foundation stage)</li>
<li>The project has an approved construction finance facility from a nationalised bank</li>
<li>The builder does not have a history of diverted funds or insolvency proceedings</li>
</ul>

<h2>✅ Phase 4 — Agreement Review</h2>
<p>Before signing the Builder-Buyer Agreement, have a lawyer review:</p>
<ul>
<li><strong>Force majeure clause:</strong> How broadly is delay justified? (Some builders include extremely broad clauses)</li>
<li><strong>Compensation for delay:</strong> What does the agreement say? (Should match RERA provisions)</li>
<li><strong>Specification schedule:</strong> Are materials, brands, and finishes clearly specified?</li>
<li><strong>Maintenance charges:</strong> Are they clearly defined before and after RWA formation?</li>
<li><strong>Possession and registration timelines:</strong> Are both clearly committed?</li>
</ul>

<h2>✅ Phase 5 — On-Site Assessment</h2>
<p>Visit the project site, not just the swanky sales office:</p>
<ul>
<li>Is active construction happening, or is the site largely dormant?</li>
<li>Are workers present? (Worker absence often signals cash flow issues)</li>
<li>Is construction quality visible? (Check concrete finish, formwork quality, rebar density)</li>
<li>Does the builder allow you to visit the actual construction site, or only the sample flat?</li>
</ul>

<h2>Questions to Ask the Builder Directly</h2>
<p>A credible builder will have confident, detailed answers to all of these:</p>
<ol>
<li>What is your construction finance arrangement for this project?</li>
<li>Who is the structural consultant and architect of record?</li>
<li>Can I speak with a current resident of one of your completed projects?</li>
<li>What is your exact material specification (brand, grade) for flooring, fittings, and windows?</li>
<li>What happens if you miss the RERA possession date — what is your commitment?</li>
</ol>

<p>At Lotus Real Estate, we welcome all of these questions. Our track record, RERA credentials, and construction standards are an open book. Contact us for a complete transparency package on any active project.</p>`],
  },
  {
    title: "Understanding the Home Loan Process in India — A Step-by-Step Guide",
    slug: "home-loan-process-india-step-by-step-guide",
    description: "Navigating the home loan process can feel overwhelming. This guide walks you through every step — from eligibility to disbursement — so you can secure the best loan for your dream home.",
    isPublished: true,
    publishedAt: new Date(),
    image: img("blog-homeloan"),
    content: [`<h2>Introduction</h2>
<p>For most homebuyers, a home loan is the largest financial commitment of their life. Done right, it's a powerful tool that makes homeownership accessible while building long-term wealth. Done poorly, it can saddle you with unnecessary costs for decades.</p>
<p>This guide walks you through the entire process — from assessing your eligibility to getting the funds disbursed — with practical tips for getting the best possible deal.</p>

<h2>Step 1 — Check Your Eligibility</h2>
<p>Banks use three primary factors to determine your home loan eligibility:</p>
<h3>Income</h3>
<p>Most banks will lend you approximately <strong>60 times your net monthly income</strong> (NMI) as a home loan. So with a monthly income of ₹1 lakh, your maximum eligible loan is approximately ₹60 lakh. Co-applicants (spouse, parents) can increase this significantly.</p>
<h3>Credit Score</h3>
<p>Your CIBIL score is the single most important factor in loan approval and interest rate offered. Target a <strong>score above 750</strong> for the best rates. Check your score free on the CIBIL website before applying — and if it's below 700, focus on improving it for 3–6 months before applying.</p>
<h3>Age</h3>
<p>Banks typically require the loan to be fully repaid by retirement age (60–65). A 45-year-old applicant can therefore only get a 15–20 year tenure, resulting in higher EMIs than a 30-year-old who can take a 30-year loan.</p>

<h2>Step 2 — Compare Lenders and Rates</h2>
<p>Don't accept the first offer. Compare at least 4–5 lenders before deciding:</p>
<ul>
<li><strong>SBI Home Loan</strong> — Currently at 8.50% p.a. (floating, for scores above 800)</li>
<li><strong>HDFC Bank Home Loan</strong> — 8.75% p.a. (floating)</li>
<li><strong>ICICI Bank Home Loan</strong> — 8.75% p.a. (floating)</li>
<li><strong>LIC Housing Finance</strong> — 8.65% p.a. (floating)</li>
<li><strong>Axis Bank Home Loan</strong> — 8.75% p.a. (floating)</li>
</ul>
<p>Even a 0.25% difference in rate on a ₹70 lakh loan over 20 years saves approximately <strong>₹2.8 lakh in total interest</strong>. Negotiating hard on rate is worth the effort.</p>

<h2>Step 3 — Calculate Your EMI and Budget</h2>
<p>Use the EMI formula or an online calculator:</p>
<p><strong>EMI = P × r × (1+r)^n / ((1+r)^n - 1)</strong></p>
<p>Where P = loan principal, r = monthly rate (annual rate / 12), n = tenure in months</p>
<p>Example: ₹60 lakh loan at 8.75% for 20 years → EMI = approximately <strong>₹52,800/month</strong></p>
<p>A practical rule: keep your total EMI obligations below 40% of your net monthly income to maintain financial comfort.</p>

<h2>Step 4 — Gather Your Documents</h2>
<p>For salaried applicants, you'll need:</p>
<ul>
<li>Last 3 months' salary slips</li>
<li>Last 2 years' Form 16 (TDS certificate)</li>
<li>Last 6 months' bank statements</li>
<li>Employment verification letter</li>
<li>Identity and address proof (Aadhaar + PAN)</li>
<li>Recent passport-size photographs</li>
</ul>
<p>For self-employed applicants, additionally:</p>
<ul>
<li>Last 3 years' ITR with computation</li>
<li>Last 3 years' audited P&L and balance sheet</li>
<li>Business registration documents</li>
<li>GST returns (if applicable)</li>
</ul>

<h2>Step 5 — Property Due Diligence by the Bank</h2>
<p>Once you submit your application, the bank conducts:</p>
<ol>
<li><strong>Legal vetting:</strong> Their lawyer verifies the title chain and building approvals</li>
<li><strong>Technical valuation:</strong> Their engineer values the property (they'll lend up to 80–90% of this valuation)</li>
<li><strong>RERA verification:</strong> Mandatory for under-construction properties</li>
</ol>
<p>This process typically takes <strong>7–15 business days</strong>. Use this time to review the loan agreement carefully.</p>

<h2>Step 6 — Loan Sanction and Disbursement</h2>
<p>Upon approval, you receive a <strong>sanction letter</strong> valid for 3–6 months. Key elements to review:</p>
<ul>
<li>Sanctioned amount (should match your request)</li>
<li>Interest rate type (floating or fixed) and the benchmark it's linked to</li>
<li>Processing fee (usually 0.5–1% of the loan amount)</li>
<li>Prepayment penalties (floating rate loans cannot carry prepayment penalties)</li>
</ul>
<p>For under-construction properties, <strong>disbursement is linked to construction stages</strong>. Pre-EMI (interest only) is charged during construction; full EMI begins after complete disbursement.</p>

<h2>Tax Benefits on Home Loans</h2>
<p>Home loans come with significant income tax deductions:</p>
<ul>
<li><strong>Section 80C:</strong> Principal repayment up to ₹1.5 lakh/year is deductible</li>
<li><strong>Section 24(b):</strong> Interest payment up to ₹2 lakh/year deductible (self-occupied)</li>
<li><strong>Section 80EEA:</strong> Additional ₹1.5 lakh deduction for first-time buyers (property value ≤₹45 lakh)</li>
</ul>
<p>A borrower in the 30% tax bracket saves up to <strong>₹1.35 lakh annually</strong> in taxes through a home loan — effectively reducing the real cost of borrowing significantly.</p>

<p>The Lotus Real Estate team works with home loan specialists at all major banks. We can help you get pre-approved before you book — contact us to schedule a free loan advisory session.</p>`],
  },
  {
    title: "Jewar International Airport — Everything You Need to Know",
    slug: "jewar-international-airport-real-estate-impact",
    description: "Jewar International Airport is set to transform the NCR real estate landscape when it opens in 2026. Here's a comprehensive look at the project, its timeline, and the investment opportunities it creates.",
    isPublished: true,
    publishedAt: new Date(),
    image: img("blog-jewar"),
    content: [`<h2>India's Most Ambitious Airport Project</h2>
<p>The <strong>Noida International Airport at Jewar</strong> — officially named Chaudhary Charan Singh International Airport — is not just another airport project. It is arguably the most consequential infrastructure development in NCR in a generation, and its impact on Noida and Greater Noida real estate will be profound.</p>
<p>When Phase 1 opens in <strong>2026</strong>, Jewar will handle 12 million passengers annually. At full build-out across Phase 4, the airport is designed to handle <strong>70 million passengers per year</strong> — making it India's largest airport by capacity, surpassing Mumbai's CSMI Airport and Delhi's IGI Airport.</p>

<h2>Project Specifications</h2>
<ul>
<li><strong>Total area:</strong> 5,000 acres (Phase 1) — expandable to 7,200 acres at full build</li>
<li><strong>Phase 1 investment:</strong> ₹29,560 crore</li>
<li><strong>Developer:</strong> Zurich Airport International AG (won international competitive bid)</li>
<li><strong>Terminal capacity:</strong> 12 MPPA (Phase 1) → 70 MPPA (all phases)</li>
<li><strong>Runways:</strong> 2 (Phase 1) → 6 (all phases)</li>
<li><strong>Cargo capacity:</strong> 0.5 million metric tonnes (Phase 1)</li>
</ul>

<h2>Why Jewar Changes the NCR Real Estate Map</h2>
<p>The Indira Gandhi International Airport (IGIA) opened in 1986 and is widely credited with triggering the transformation of Gurgaon from a small satellite town into India's millennium city. Proximity to IGIA drove Gurgaon's residential prices from ₹800/sq ft in 1995 to over ₹25,000/sq ft today in premium areas — a 30x appreciation in 30 years.</p>
<p>Jewar is positioned to play a similar catalytic role for Greater Noida and the Yamuna Expressway corridor — but with better road and metro connectivity, lower baseline land prices, and more planned land parcels available for development.</p>

<h2>Connectivity to Jewar Airport</h2>
<p>The airport's connectivity infrastructure is equally impressive:</p>
<ul>
<li><strong>Yamuna Expressway:</strong> Already operational — 25 minutes from Sector 150 Noida</li>
<li><strong>Metro:</strong> Proposed extension of the Aqua Line from Knowledge Park V to Jewar — expected operational by 2027</li>
<li><strong>RapidX:</strong> The Delhi-SNB RRTS corridor includes a Jewar Airport stop</li>
<li><strong>NH-709B:</strong> A new national highway connecting the airport to the existing NH-58 and Hapur bypass</li>
</ul>

<h2>Real Estate Impact — Which Areas to Watch</h2>
<h3>Zone 1 — Maximum Impact (0–10 km from airport)</h3>
<p>Land parcels within 10 km — primarily in YEIDA sectors — have already seen 200–400% appreciation since the airport announcement in 2019. Plotted developments with RERA registration from YEIDA itself or credible developers offer the best risk-adjusted exposure here.</p>

<h3>Zone 2 — Strong Impact (10–25 km)</h3>
<p>Greater Noida's sectors along the Yamuna Expressway (Alpha, Beta, Gamma, Delta, and Zeta) fall in this zone. These sectors offer affordable housing with excellent infrastructure and are already seeing increased demand from IT and airport-related employment growth.</p>

<h3>Zone 3 — Indirect Beneficiary (25–45 km)</h3>
<p>Noida's established sectors — 150, 132, 125, 94 — will benefit as Jewar stimulates overall economic activity in NCR, making Noida a more prominent business address for international companies evaluating India entry.</p>

<h2>Our Recommendation</h2>
<p>The window for capturing the full appreciation from Jewar Airport is narrowing. With Phase 1 opening scheduled for 2026, the large early-announcement gains have already accrued. However, the opening itself — when aviation activity, jobs, hotels, and commercial development begin — typically triggers a second wave of appreciation that lasts 3–5 years post-opening.</p>
<p>Lotus Real Estate's plotted development on the Yamuna Expressway places you 3 km from the airport boundary and 5 km from the main terminal. Contact our investment team today for a detailed briefing and site visit.</p>`],
  },
  {
    title: "Interior Design Trends Defining Luxury Homes in NCR — 2025 Edition",
    slug: "interior-design-trends-luxury-homes-ncr-2025",
    description: "From biophilic design to smart home integration, the luxury home interior landscape in NCR is evolving rapidly. Here's what the most sought-after homes look like in 2025.",
    isPublished: true,
    publishedAt: new Date(),
    image: img("blog-interior"),
    content: [`<h2>The New Definition of Luxury</h2>
<p>Luxury home design in NCR has undergone a quiet revolution over the past three years. The post-pandemic reassessment of what "home" means — combined with rising HNI wealth, global design influence through Instagram and YouTube, and dramatically better material availability — has pushed interior design standards in Delhi-NCR's premium segment to genuinely world-class levels.</p>
<p>In 2025, the defining characteristics of truly premium NCR interiors are no longer about opulence for its own sake. They're about <strong>thoughtful restraint, biophilic connection, wellness-first design, and invisible technology</strong>.</p>

<h2>Trend 1 — Warm Minimalism Replaces Cold Modernism</h2>
<p>The cool grey-and-white interiors that dominated NCR luxury homes from 2015–2022 are giving way to what designers are calling <strong>warm minimalism</strong>. Key characteristics:</p>
<ul>
<li>Palette: Terracotta, warm white, sand, sage green, deep walnut, burnt sienna</li>
<li>Materials: Travertine, limewash walls, solid wood, handmade ceramics, natural linen</li>
<li>Lighting: Warm 2700K LEDs, pendant clusters, indirect cove lighting — cold fluorescent eliminated</li>
</ul>
<p>The shift is driven by occupants who spent extended time at home during the pandemic and found cold, minimal interiors fatiguing. Warmth and comfort have replaced clinical cleanliness as the primary emotional objective.</p>

<h2>Trend 2 — Biophilic Design Goes Mainstream</h2>
<p><strong>Biophilic design</strong> — the deliberate integration of natural elements into the built environment — has moved from a niche architectural concept to a mainstream premium home expectation in NCR.</p>
<p>At the entry level, this means indoor plants and natural material accents. In true luxury homes in 2025, it means:</p>
<ul>
<li>Living plant walls in the living room and master bedroom</li>
<li>Interior courtyards with mature trees in ground-floor villas</li>
<li>Timber-ceiling feature beams in living rooms and dining areas</li>
<li>Water features (indoor fountains, wall cascades) in foyers</li>
<li>Maximised natural light with motorised solar shading systems</li>
</ul>
<p>Research published by the Indian Society of Interior Designers (2024) found that biophilic elements correlated with a <strong>14% improvement in occupant mental wellbeing scores</strong> over 6 months of measurement. In NCR's high-stress, high-performing household profile, this is a deeply resonant benefit.</p>

<h2>Trend 3 — The Kitchen as Social Centrepiece</h2>
<p>The kitchen has completed its transformation from a service space to the social heart of the luxury NCR home. Key design directions:</p>
<ul>
<li><strong>Open island kitchens</strong> with waterfall-edge quartz or marble countertops that flow into the dining area</li>
<li><strong>Statement hoods</strong> in brushed brass, copper, or matte black as sculptural focal points</li>
<li><strong>Pantry zones</strong> concealed behind panelled doors, keeping the main kitchen visually uncluttered</li>
<li><strong>Premium appliances on display:</strong> Miele, Gaggenau, and V-Zug appliances are increasingly specified by design-aware buyers</li>
</ul>

<h2>Trend 4 — Smart Home Technology — Finally Done Right</h2>
<p>Smart home integration has been promised in luxury Indian real estate for two decades but has historically underdelivered due to reliability and usability issues. In 2025, the technology has finally matured to match the ambition.</p>
<p>The systems that are delivering genuine value in NCR luxury homes:</p>
<ul>
<li><strong>Crestron or Control4 central automation:</strong> One interface for lighting, climate, AV, security, and access control</li>
<li><strong>Scene-based lighting:</strong> Pre-programmed scenes for "morning," "cinema," "dinner," and "away" transform how occupants interact with light</li>
<li><strong>Air quality monitoring:</strong> PM2.5, CO2, and VOC sensors with automatic ventilation response — critical in NCR's pollution context</li>
<li><strong>Video doorbell and perimeter cameras</strong> integrated into the home automation system</li>
</ul>

<h2>Trend 5 — The Wellness Room</h2>
<p>The standalone gym has been superseded by the <strong>wellness room</strong> — a dedicated multi-function space that serves as gym, yoga studio, meditation space, and sauna, depending on the time of day.</p>
<p>In premium villas and penthouses, this room typically features:</p>
<ul>
<li>Rubberised cork or rubber flooring (combines cushioning and acoustic absorption)</li>
<li>Large wall mirrors on one face, acoustic panels on another</li>
<li>Infrared sauna cabinet or pod in the corner</li>
<li>Frosted glass partition to an attached cold plunge bath</li>
<li>Dedicated fresh air ventilation (not recirculated AC)</li>
</ul>

<h2>Working With Your Developer</h2>
<p>If you're buying under-construction, now is the time to discuss fit-out specifications with your developer. Many premium developers — including Lotus Real Estate — offer interior design consultation packages and material upgrade options that can be incorporated before possession. These are significantly more cost-effective than retrofitting after you move in.</p>
<p>Contact our design consultation team to discuss how you can customise your Lotus apartment or villa to reflect these 2025 design directions.</p>`],
  },
];

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY = [
  // Photos
  { name: "Lotus Elara — Grand Entrance", location: "Sector 150, Noida", type: "photo", image: img("gal-elara-entrance", 900, 600), order: 1, isActive: true },
  { name: "Elara Infinity Pool", location: "Sector 150, Noida", type: "photo", image: img("gal-elara-pool", 900, 600), order: 2, isActive: true },
  { name: "3 BHK Living Room", location: "Sector 150, Noida", type: "photo", image: img("gal-elara-living", 900, 600), order: 3, isActive: true },
  { name: "Clubhouse Exterior", location: "Sector 150, Noida", type: "photo", image: img("gal-elara-club", 900, 600), order: 4, isActive: true },
  { name: "Landscape Garden", location: "Sector 150, Noida", type: "photo", image: img("gal-elara-garden", 900, 600), order: 5, isActive: true },
  { name: "Crown Business Park — Tower Lobby", location: "Sector 132, Noida", type: "photo", image: img("gal-crown-lobby", 900, 600), order: 6, isActive: true },
  { name: "Crown — Business Plaza", location: "Sector 132, Noida", type: "photo", image: img("gal-crown-plaza", 900, 600), order: 7, isActive: true },
  { name: "Crown — Rooftop Terrace", location: "Sector 132, Noida", type: "photo", image: img("gal-crown-terrace", 900, 600), order: 8, isActive: true },
  { name: "The Palms Villa — Private Pool", location: "Sector 79, Noida", type: "photo", image: img("gal-palms-pool", 900, 600), order: 9, isActive: true },
  { name: "The Palms — Master Suite", location: "Sector 79, Noida", type: "photo", image: img("gal-palms-master", 900, 600), order: 10, isActive: true },
  { name: "The Palms — Landscaped Garden", location: "Sector 79, Noida", type: "photo", image: img("gal-palms-garden", 900, 600), order: 11, isActive: true },
  { name: "Skyline Towers — Swimming Pool", location: "Sector 94, Noida", type: "photo", image: img("gal-skyline-pool", 900, 600), order: 12, isActive: true },
  { name: "Horizon One — Retail Atrium", location: "Sector 18, Noida", type: "photo", image: img("gal-horizon-atrium", 900, 600), order: 13, isActive: true },
  { name: "Horizon One — Sky Deck", location: "Sector 18, Noida", type: "photo", image: img("gal-horizon-skydeck", 900, 600), order: 14, isActive: true },
  { name: "Green Haven — Central Park", location: "Sector 168, Noida", type: "photo", image: img("gal-haven-park", 900, 600), order: 15, isActive: true },
  { name: "Royale Gardens — Clubhouse", location: "Sector 150, Noida", type: "photo", image: img("gal-royale-club", 900, 600), order: 16, isActive: true },
  { name: "Royale Gardens — Aerial View", location: "Sector 150, Noida", type: "photo", image: img("gal-royale-aerial", 900, 600), order: 17, isActive: true },
  { name: "Sterling Penthouses — Terrace", location: "Sector 44, Noida", type: "photo", image: img("gal-sterling-terrace", 900, 600), order: 18, isActive: true },
  { name: "Sterling Penthouse — Living Room", location: "Sector 44, Noida", type: "photo", image: img("gal-sterling-living", 900, 600), order: 19, isActive: true },
  { name: "Lotus Avenue Plots — Expressway View", location: "Yamuna Expressway", type: "photo", image: img("gal-plots-exp", 900, 600), order: 20, isActive: true },
  { name: "Nexus IT Hub — Co-working Zone", location: "Sector 125, Noida", type: "photo", image: img("gal-nexus-cowork", 900, 600), order: 21, isActive: true },
  { name: "Metro Suites — Reception Lobby", location: "Sector 52, Noida", type: "photo", image: img("gal-metro-lobby", 900, 600), order: 22, isActive: true },
  { name: "Tech Park Alpha — Office Floor", location: "Sector 62, Noida", type: "photo", image: img("gal-alpha-floor", 900, 600), order: 23, isActive: true },
  { name: "Aspire Suites — Sample Flat", location: "Greater Noida West", type: "photo", image: img("gal-aspire-flat", 900, 600), order: 24, isActive: true },

  // Videos
  {
    name: "Lotus Elara — Project Walkthrough",
    location: "Sector 150, Noida",
    type: "video",
    image: img("gal-vid-elara-thumb", 900, 600),
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    order: 1,
    isActive: true,
  },
  {
    name: "Elara — Drone Aerial Tour",
    location: "Sector 150, Noida",
    type: "video",
    image: img("gal-vid-elara-drone", 900, 600),
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFuns.mp4",
    order: 2,
    isActive: true,
  },
  {
    name: "The Palms Villas — Luxury Experience",
    location: "Sector 79, Noida",
    type: "video",
    image: img("gal-vid-palms-thumb", 900, 600),
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    order: 3,
    isActive: true,
  },
  {
    name: "Crown Business Park — Office Tour",
    location: "Sector 132, Noida",
    type: "video",
    image: img("gal-vid-crown-thumb", 900, 600),
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    order: 4,
    isActive: true,
  },
  {
    name: "Royale Gardens — Township Overview",
    location: "Sector 150, Noida",
    type: "video",
    image: img("gal-vid-royale-thumb", 900, 600),
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    order: 5,
    isActive: true,
  },
  {
    name: "Sterling Penthouses — Penthouse Life",
    location: "Sector 44, Noida",
    type: "video",
    image: img("gal-vid-sterling-thumb", 900, 600),
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    order: 6,
    isActive: true,
  },
];

// ─── Hero Banners ─────────────────────────────────────────────────────────────
const hero = (seed) => `https://picsum.photos/seed/${seed}/1920/1080`;

const HERO_BANNERS = [
  {
    type: 'image',
    media: hero('lotus-hero-1'),
    title: 'Luxury Living Redefined',
    subtitle: 'Find Your Dream Properties',
    ctaText: 'Explore Projects',
    ctaLink: '/projects',
    order: 1,
    isActive: true,
  },
  {
    type: 'image',
    media: hero('lotus-hero-2'),
    title: 'Your Dream Home Awaits',
    subtitle: 'Premium Real Estate in Noida',
    ctaText: 'View Properties',
    ctaLink: '/projects',
    order: 2,
    isActive: true,
  },
  {
    type: 'image',
    media: hero('lotus-hero-3'),
    title: 'Smart Properties For Smart People',
    subtitle: 'Invest In The Future',
    ctaText: 'Contact Us',
    ctaLink: '/contact',
    order: 3,
    isActive: true,
  },
];

// ─── Property Types ───────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { label: 'COMMERCIAL',   image: img('pt-commercial', 900, 600),  order: 1, isActive: true },
  { label: 'RESIDENTIAL',  image: img('pt-residential', 900, 600), order: 2, isActive: true },
  { label: 'VILLAS',       image: img('pt-villas', 900, 600),      order: 3, isActive: true },
  { label: 'PLOTS',        image: img('pt-plots', 900, 600),       order: 4, isActive: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await Gallery.deleteMany({});
    await PropertyType.deleteMany({});
    await HeroBanner.deleteMany({});
    console.log('🗑️  Cleared existing projects, blogs, gallery, property types and hero banners');

    // Insert projects
    const projects = await Project.insertMany(PROJECTS);
    console.log(`✅ Inserted ${projects.length} projects`);

    // Insert blogs
    const blogs = await Blog.insertMany(BLOGS);
    console.log(`✅ Inserted ${blogs.length} blog posts`);

    // Insert gallery
    const gallery = await Gallery.insertMany(GALLERY);
    const photos = gallery.filter((g) => g.type === 'photo').length;
    const videos = gallery.filter((g) => g.type === 'video').length;
    console.log(`✅ Inserted ${gallery.length} gallery items (${photos} photos, ${videos} videos)`);

    // Insert property types
    const propertyTypes = await PropertyType.insertMany(PROPERTY_TYPES);
    console.log(`✅ Inserted ${propertyTypes.length} property types`);

    // Insert hero banners
    const heroBanners = await HeroBanner.insertMany(HERO_BANNERS);
    console.log(`✅ Inserted ${heroBanners.length} hero banners`);

    console.log('\n🎉 Seed complete!');
    console.log(`   Projects:       ${projects.length}`);
    console.log(`   Blogs:          ${blogs.length}`);
    console.log(`   Gallery:        ${photos} photos + ${videos} videos`);
    console.log(`   Property Types: ${propertyTypes.length}`);
    console.log(`   Hero Banners:   ${heroBanners.length}`);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
