'use strict';
require('dotenv').config();
require('module-alias/register');
const mongoose = require('mongoose');
const SiteSettings = require('./src/models/SiteSettings');

const avatar = (n) => `https://i.pravatar.cc/150?img=${n}`;

const WHY_CHOOSE_US = {
  heading: "Why Choose Lotusss",
  features: [
    {
      id: 1, icon: "shield",
      title: "Trusted Developer",
      description: "RERA registered with 100% transparency in all transactions and documentation.",
    },
    {
      id: 2, icon: "location",
      title: "Prime Locations",
      description: "Strategically located projects in Sector 150, 94, and 79 — Noida's fastest growing corridors.",
    },
    {
      id: 3, icon: "payment",
      title: "Flexible Payment Plans",
      description: "Easy EMI options, subvention schemes and zero pre-EMI plans to fit your budget.",
    },
    {
      id: 4, icon: "shield",
      title: "World-Class Amenities",
      description: "Clubhouse, swimming pool, gym, kids' play area, and landscaped gardens in every project.",
    },
    {
      id: 5, icon: "location",
      title: "On-Time Delivery",
      description: "Consistent track record of delivering projects on schedule with zero compromise on build quality.",
    },
    {
      id: 6, icon: "payment",
      title: "After-Sales Support",
      description: "Dedicated relationship managers and a responsive service team with you from booking to possession and beyond.",
    },
  ],
};

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "Villa Owner, Lotus Heights",
    image: avatar(12),
    rating: 5,
    quote: "<p>We purchased a 3 BHK apartment and the entire experience was seamless. The team was responsive, the paperwork was transparent, and the quality of construction exceeded our expectations. Truly a world-class developer.</p>",
  },
  {
    name: "Priya Gupta",
    role: "Investor, Lotus Avenue",
    image: avatar(49),
    rating: 5,
    quote: "<p>I've invested in two projects by Lotusss and both have given excellent returns. The location selection is strategic and the after-sales support is outstanding. Highly recommend to anyone looking to invest.</p>",
  },
  {
    name: "Arvind Kumar",
    role: "Resident, Lotus Greens",
    image: avatar(57),
    rating: 4,
    quote: "<p>The amenities are top-notch and the community is wonderful. My children love the play area and we enjoy the clubhouse every weekend. Truly a 5-star living experience in the heart of Noida.</p>",
  },
  {
    name: "Sunita Mehta",
    role: "Homebuyer, Royale Gardens",
    image: avatar(44),
    rating: 5,
    quote: "<p>From site visit to possession, every step was professional and timely. The Lotus team kept us informed throughout and delivered exactly what was promised. Our forever home — exactly as imagined.</p>",
  },
  {
    name: "Deepak Agarwal",
    role: "Commercial Investor, Crown Business Park",
    image: avatar(33),
    rating: 5,
    quote: "<p>I leased two office floors in Crown Business Park and the ROI has been exceptional. Prime Noida Expressway location, modern infrastructure, and a dedicated relationship manager made the whole process smooth.</p>",
  },
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});

    settings.testimonials = TESTIMONIALS;
    settings.whyChooseUs = WHY_CHOOSE_US;

    settings.stats = [
      { value: '500+', label: 'Units\nDelivered' },
      { value: '15 Years', label: 'Of Excellence' },
      { value: '28 Cities', label: 'National Footprint' },
    ];

    settings.sectionHeadings = {
      ourProjects: 'Our Projects',
      recentBlogs: 'Recent Blogs',
      gallery: 'Gallery',
      contactSection: 'Partner With Us',
      leaders: 'Our Leaders',
    };

    settings.footer = {
      ...((settings.footer || {}).toObject ? settings.footer.toObject() : settings.footer || {}),
      altPhone: '+91 98765 43211',
      website: 'www.lotusssinfra.com',
      addressLine2: 'Noida Expressway, UP 201305',
    };

    await settings.save();

    console.log(`✅ Updated ${TESTIMONIALS.length} testimonials + whyChooseUs (${WHY_CHOOSE_US.features.length} features) + stats + section headings`);
  } catch (err) {
    console.error('❌ Failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
