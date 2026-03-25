export type Category = "Food" | "Retail" | "Real Estate" | "Entertainment";

export interface Deal {
  id: string;
  businessName: string;
  description: string;
  category: Category;
  discount: string;
  lat: number;
  lng: number;
  expiry: string;
  claimed: number;
  maxClaims: number;
  image: string;
  address: string;
  rating: number;
  points: number;
  verified?: boolean;
  // Real estate specific
  bedrooms?: number;
  bathrooms?: number;
  sqm?: number;
  price?: string;
  garage?: number;
  pool?: boolean;
  features?: string[];
  images?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    agency: string;
    photo: string;
  };
  neighbourhood?: {
    safety: number;
    schools: number;
    shopping: number;
    transport: number;
  };
  priceTrend?: { month: string; price: number }[];
  // Flash deal specific
  isFlash?: boolean;
  flashExpiry?: string;
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  points: number;
  coins: number;
  streak: number;
  dealsFound: number;
  vouchers: string[];
  rank: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  dealsFound: number;
  level: number;
}

export interface Notification {
  id: string;
  type: "deal" | "achievement" | "system" | "social";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface TreasureHunt {
  id: string;
  name: string;
  description: string;
  dealIds: string[];
  reward: string;
  rewardIcon: string;
  progress: number;
  totalSteps: number;
  completedSteps: number;
  expiresIn: string;
  waypoints: { lat: number; lng: number; label: string; completed: boolean }[];
}

export interface CoinTransaction {
  id: string;
  type: "earned" | "spent" | "purchased";
  amount: number;
  description: string;
  date: string;
}

export interface Territory {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  dealsFound: number;
  rank: number;
  totalPlayers: number;
  color: string;
}

export interface AchievementBadge {
  id: string;
  icon: string;
  label: string;
  description: string;
  unlocked: boolean;
  progress: number;
  requirement: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  current: number;
  target: number;
  reward: number;
  completed: boolean;
}

export interface SpinPrize {
  label: string;
  color: string;
  textColor: string;
  value: number;
  type: "coins" | "mystery" | "voucher" | "grand" | "none";
}

export const spinPrizes: SpinPrize[] = [
  { label: "50 Coins", color: "#F59E0B", textColor: "#fff", value: 50, type: "coins" },
  { label: "Mystery Box", color: "#8B5CF6", textColor: "#fff", value: 0, type: "mystery" },
  { label: "200 Coins", color: "#10B981", textColor: "#fff", value: 200, type: "coins" },
  { label: "Better Luck", color: "#334155", textColor: "#94a3b8", value: 0, type: "none" },
  { label: "500 Coins", color: "#EC4899", textColor: "#fff", value: 500, type: "coins" },
  { label: "Free Voucher", color: "#3B82F6", textColor: "#fff", value: 0, type: "voucher" },
  { label: "100 Coins", color: "#F97316", textColor: "#fff", value: 100, type: "coins" },
  { label: "GRAND PRIZE", color: "#EF4444", textColor: "#fff", value: 0, type: "grand" },
];

export const categories: { name: Category; icon: string; color: string }[] = [
  { name: "Food", icon: "\u{1F354}", color: "#F59E0B" },
  { name: "Retail", icon: "\u{1F6CD}\uFE0F", color: "#EC4899" },
  { name: "Real Estate", icon: "\u{1F3E0}", color: "#3B82F6" },
  { name: "Entertainment", icon: "\u{1F3AD}", color: "#8B5CF6" },
];

export const deals: Deal[] = [
  {
    id: "1",
    businessName: "Nando's Rosebank",
    description: "Buy 1 Get 1 Free on any flame-grilled chicken meal. Valid for dine-in only.",
    category: "Food",
    discount: "BOGO",
    lat: -26.1469,
    lng: 28.0436,
    expiry: "2026-04-15",
    claimed: 89,
    maxClaims: 200,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    address: "The Zone @ Rosebank, Johannesburg",
    rating: 4.5,
    points: 50,
    verified: true,
  },
  {
    id: "2",
    businessName: "Woolworths Sandton",
    description: "30% off all winter fashion essentials. In-store only, while stocks last.",
    category: "Retail",
    discount: "30% OFF",
    lat: -26.1076,
    lng: 28.0567,
    expiry: "2026-04-10",
    claimed: 156,
    maxClaims: 300,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    address: "Sandton City, Johannesburg",
    rating: 4.3,
    points: 35,
    verified: true,
  },
  {
    id: "3",
    businessName: "Pam Golding Properties",
    description: "Luxurious 3-bed apartment in Sandton with panoramic city views. Modern finishes throughout.",
    category: "Real Estate",
    discount: "NEW",
    lat: -26.1325,
    lng: 28.0310,
    expiry: "2026-05-01",
    claimed: 23,
    maxClaims: 50,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    address: "Rosebank, Johannesburg",
    rating: 4.7,
    points: 100,
    verified: true,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 145,
    price: "R2,450,000",
    garage: 1,
    pool: false,
    features: ["Alarm System", "Fiber Internet", "Open-plan Kitchen", "Built-in Cupboards", "Balcony", "Underfloor Heating"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    agent: { name: "Sarah van der Merwe", phone: "+27825551234", email: "sarah@pamgolding.co.za", agency: "Pam Golding Properties", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" },
    neighbourhood: { safety: 8, schools: 9, shopping: 7, transport: 6 },
    priceTrend: [
      { month: "Apr", price: 2600000 }, { month: "May", price: 2580000 }, { month: "Jun", price: 2550000 },
      { month: "Jul", price: 2520000 }, { month: "Aug", price: 2500000 }, { month: "Sep", price: 2490000 },
      { month: "Oct", price: 2480000 }, { month: "Nov", price: 2470000 }, { month: "Dec", price: 2460000 },
      { month: "Jan", price: 2455000 }, { month: "Feb", price: 2450000 }, { month: "Mar", price: 2450000 },
    ],
  },
  {
    id: "4",
    businessName: "Montecasino",
    description: "2-for-1 movie tickets every Tuesday. Any movie, any time slot!",
    category: "Entertainment",
    discount: "2 FOR 1",
    lat: -26.0224,
    lng: 28.0106,
    expiry: "2026-04-30",
    claimed: 312,
    maxClaims: 500,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
    address: "Montecasino Blvd, Fourways",
    rating: 4.4,
    points: 40,
    verified: true,
  },
  {
    id: "5",
    businessName: "Ocean Basket Menlyn",
    description: "25% off sushi platters. Perfect for date night!",
    category: "Food",
    discount: "25% OFF",
    lat: -25.7823,
    lng: 28.2769,
    expiry: "2026-04-20",
    claimed: 67,
    maxClaims: 150,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    address: "Menlyn Park Shopping Centre, Pretoria",
    rating: 4.2,
    points: 45,
  },
  {
    id: "6",
    businessName: "Mr Price Eastgate",
    description: "Up to 50% off summer clearance. Grab it before it's gone!",
    category: "Retail",
    discount: "50% OFF",
    lat: -26.1820,
    lng: 28.1170,
    expiry: "2026-04-05",
    claimed: 234,
    maxClaims: 400,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop",
    address: "Eastgate Shopping Centre, Bedfordview",
    rating: 4.0,
    points: 30,
  },
  {
    id: "7",
    businessName: "RE/MAX Centurion",
    description: "Spacious 4-bed family home with pool and double garage. Quiet estate living.",
    category: "Real Estate",
    discount: "REDUCED",
    lat: -25.8603,
    lng: 28.1894,
    expiry: "2026-05-15",
    claimed: 12,
    maxClaims: 30,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    address: "Centurion Mall, Pretoria",
    rating: 4.6,
    points: 120,
    verified: true,
    bedrooms: 4,
    bathrooms: 3,
    sqm: 280,
    price: "R3,850,000",
    garage: 2,
    pool: true,
    features: ["Alarm System", "Electric Fence", "Solar Panels", "Borehole", "Fiber Internet", "Staff Quarters", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    ],
    agent: { name: "James Botha", phone: "+27834445678", email: "james@remax.co.za", agency: "RE/MAX Centurion", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" },
    neighbourhood: { safety: 9, schools: 8, shopping: 8, transport: 7 },
    priceTrend: [
      { month: "Apr", price: 4100000 }, { month: "May", price: 4080000 }, { month: "Jun", price: 4050000 },
      { month: "Jul", price: 4020000 }, { month: "Aug", price: 3980000 }, { month: "Sep", price: 3950000 },
      { month: "Oct", price: 3920000 }, { month: "Nov", price: 3900000 }, { month: "Dec", price: 3880000 },
      { month: "Jan", price: 3870000 }, { month: "Feb", price: 3860000 }, { month: "Mar", price: 3850000 },
    ],
  },
  {
    id: "8",
    businessName: "Gold Reef City",
    description: "R100 off day passes this weekend! Thrills for less.",
    category: "Entertainment",
    discount: "R100 OFF",
    lat: -26.2346,
    lng: 28.0141,
    expiry: "2026-04-07",
    claimed: 178,
    maxClaims: 250,
    image: "https://images.unsplash.com/photo-1514533212735-5df27d970db0?w=400&h=300&fit=crop",
    address: "Northern Pkwy, Ormonde",
    rating: 4.3,
    points: 55,
  },
  {
    id: "9",
    businessName: "Steers Melville",
    description: "Free upgrade to large meal with any burger combo.",
    category: "Food",
    discount: "FREE UPG",
    lat: -26.1770,
    lng: 27.9990,
    expiry: "2026-04-12",
    claimed: 45,
    maxClaims: 100,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    address: "7th Street, Melville",
    rating: 4.1,
    points: 25,
  },
  {
    id: "10",
    businessName: "Vida e Caff\u00E8 Braamfontein",
    description: "Buy any coffee, get a free pastry before 10am.",
    category: "Food",
    discount: "FREE ADD",
    lat: -26.1920,
    lng: 28.0340,
    expiry: "2026-04-18",
    claimed: 92,
    maxClaims: 200,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    address: "Braamfontein, Johannesburg",
    rating: 4.4,
    points: 20,
  },
  {
    id: "11",
    businessName: "Sportscene Mall of Africa",
    description: "20% off all Nike & Adidas sneakers. Members get extra 5% off.",
    category: "Retail",
    discount: "20% OFF",
    lat: -25.9983,
    lng: 28.1076,
    expiry: "2026-04-22",
    claimed: 189,
    maxClaims: 350,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop",
    address: "Mall of Africa, Midrand",
    rating: 4.5,
    points: 40,
    verified: true,
  },
  {
    id: "12",
    businessName: "Kream Maboneng",
    description: "Free dessert with any main course. Try our famous malva pudding!",
    category: "Food",
    discount: "FREE DESSERT",
    lat: -26.2024,
    lng: 28.0562,
    expiry: "2026-04-14",
    claimed: 34,
    maxClaims: 80,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    address: "Fox Street, Maboneng",
    rating: 4.6,
    points: 35,
  },
  {
    id: "13",
    businessName: "Emperors Palace",
    description: "R500 gaming voucher for new sign-ups. Plus free show ticket!",
    category: "Entertainment",
    discount: "R500 FREE",
    lat: -26.1506,
    lng: 28.2134,
    expiry: "2026-04-25",
    claimed: 56,
    maxClaims: 100,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    address: "Jones Rd, Kempton Park",
    rating: 4.2,
    points: 75,
    verified: true,
  },
  {
    id: "14",
    businessName: "Seeff Properties Pretoria",
    description: "Modern 2-bed penthouse with rooftop terrace. Prime Brooklyn location.",
    category: "Real Estate",
    discount: "EXCLUSIVE",
    lat: -25.7461,
    lng: 28.1881,
    expiry: "2026-05-10",
    claimed: 8,
    maxClaims: 25,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    address: "Brooklyn, Pretoria",
    rating: 4.8,
    points: 110,
    verified: true,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 120,
    price: "R1,950,000",
    garage: 1,
    pool: false,
    features: ["Fiber Internet", "Rooftop Terrace", "Smart Home System", "Underfloor Heating", "Built-in Braai"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    ],
    agent: { name: "Anele Dlamini", phone: "+27843339876", email: "anele@seeff.com", agency: "Seeff Properties", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    neighbourhood: { safety: 7, schools: 9, shopping: 8, transport: 7 },
    priceTrend: [
      { month: "Apr", price: 2100000 }, { month: "May", price: 2080000 }, { month: "Jun", price: 2050000 },
      { month: "Jul", price: 2020000 }, { month: "Aug", price: 2000000 }, { month: "Sep", price: 1990000 },
      { month: "Oct", price: 1980000 }, { month: "Nov", price: 1970000 }, { month: "Dec", price: 1965000 },
      { month: "Jan", price: 1960000 }, { month: "Feb", price: 1955000 }, { month: "Mar", price: 1950000 },
    ],
  },
  {
    id: "15",
    businessName: "Mugg & Bean Clearwater",
    description: "All-day breakfast special: R79 for full English. Every weekday!",
    category: "Food",
    discount: "R79 SPECIAL",
    lat: -26.1274,
    lng: 27.8985,
    expiry: "2026-04-30",
    claimed: 122,
    maxClaims: 300,
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop",
    address: "Clearwater Mall, Roodepoort",
    rating: 4.3,
    points: 30,
  },
  {
    id: "16",
    businessName: "Cape Union Mart Fourways",
    description: "Buy 2 Get 1 Free on all outdoor gear. Adventure awaits!",
    category: "Retail",
    discount: "B2G1",
    lat: -26.0152,
    lng: 28.0063,
    expiry: "2026-04-17",
    claimed: 78,
    maxClaims: 200,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    address: "Fourways Mall, Fourways",
    rating: 4.4,
    points: 45,
  },
  {
    id: "17",
    businessName: "Doppio Zero Parkhurst",
    description: "50% off all pasta dishes on Wednesdays. Dine-in only.",
    category: "Food",
    discount: "50% OFF",
    lat: -26.1477,
    lng: 28.0152,
    expiry: "2026-04-30",
    claimed: 167,
    maxClaims: 250,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    address: "4th Ave, Parkhurst",
    rating: 4.5,
    points: 40,
  },
  {
    id: "18",
    businessName: "Bounce Fourways",
    description: "Kids jump free on Saturdays (with paying adult). 1 hour session.",
    category: "Entertainment",
    discount: "KIDS FREE",
    lat: -26.0068,
    lng: 28.0012,
    expiry: "2026-04-28",
    claimed: 201,
    maxClaims: 400,
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
    address: "Cedar Rd, Fourways",
    rating: 4.6,
    points: 35,
  },
  {
    id: "19",
    businessName: "Rawson Properties Midrand",
    description: "Executive 3-bed townhouse in secure estate. Open-plan living with garden.",
    category: "Real Estate",
    discount: "HOT DEAL",
    lat: -25.9870,
    lng: 28.1271,
    expiry: "2026-05-20",
    claimed: 19,
    maxClaims: 40,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
    address: "Old Pretoria Rd, Midrand",
    rating: 4.3,
    points: 90,
    verified: true,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 185,
    price: "R2,100,000",
    garage: 1,
    pool: false,
    features: ["Alarm System", "Fiber Internet", "Open-plan Living", "Private Garden", "Pet Friendly"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    ],
    agent: { name: "Pieter Erasmus", phone: "+27827773456", email: "pieter@rawson.co.za", agency: "Rawson Properties", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    neighbourhood: { safety: 8, schools: 7, shopping: 9, transport: 8 },
    priceTrend: [
      { month: "Apr", price: 2300000 }, { month: "May", price: 2280000 }, { month: "Jun", price: 2250000 },
      { month: "Jul", price: 2220000 }, { month: "Aug", price: 2200000 }, { month: "Sep", price: 2180000 },
      { month: "Oct", price: 2150000 }, { month: "Nov", price: 2130000 }, { month: "Dec", price: 2120000 },
      { month: "Jan", price: 2110000 }, { month: "Feb", price: 2105000 }, { month: "Mar", price: 2100000 },
    ],
  },
  {
    id: "20",
    businessName: "Typo Menlyn",
    description: "Buy 3 for 2 on all stationery and lifestyle accessories.",
    category: "Retail",
    discount: "3 FOR 2",
    lat: -25.7845,
    lng: 28.2785,
    expiry: "2026-04-11",
    claimed: 145,
    maxClaims: 300,
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop",
    address: "Menlyn Park, Pretoria",
    rating: 4.1,
    points: 25,
  },
  {
    id: "21",
    businessName: "The Grillhouse Rosebank",
    description: "Complimentary bottle of house wine with any 2 main courses.",
    category: "Food",
    discount: "FREE WINE",
    lat: -26.1455,
    lng: 28.0410,
    expiry: "2026-04-19",
    claimed: 41,
    maxClaims: 75,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    address: "The Firs, Rosebank",
    rating: 4.7,
    points: 60,
    verified: true,
  },
  {
    id: "22",
    businessName: "Acrobranch Melrose",
    description: "30% off all treetop courses. Family packages available!",
    category: "Entertainment",
    discount: "30% OFF",
    lat: -26.1350,
    lng: 28.0690,
    expiry: "2026-04-26",
    claimed: 63,
    maxClaims: 120,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop",
    address: "Melrose, Johannesburg",
    rating: 4.5,
    points: 50,
  },
  {
    id: "23",
    businessName: "TFG The Glen",
    description: "R200 off when you spend R1000+. Valid on all Foschini Group brands.",
    category: "Retail",
    discount: "R200 OFF",
    lat: -26.2640,
    lng: 28.0550,
    expiry: "2026-04-16",
    claimed: 98,
    maxClaims: 200,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop",
    address: "The Glen Shopping Centre, Glenvista",
    rating: 4.2,
    points: 35,
  },
  // Flash Deals
  {
    id: "f1",
    businessName: "Spur Steak Ranches Sandton",
    description: "Flash! 60% off all ribs for the next 30 minutes. Run!",
    category: "Food",
    discount: "60% OFF",
    lat: -26.1050,
    lng: 28.0520,
    expiry: "2026-04-15",
    claimed: 12,
    maxClaims: 30,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    address: "Nelson Mandela Square, Sandton",
    rating: 4.3,
    points: 80,
    verified: true,
    isFlash: true,
    flashExpiry: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  },
  {
    id: "f2",
    businessName: "Cotton On Rosebank",
    description: "Flash Sale! Extra 40% off clearance items. Limited time!",
    category: "Retail",
    discount: "40% OFF",
    lat: -26.1480,
    lng: 28.0440,
    expiry: "2026-04-15",
    claimed: 45,
    maxClaims: 80,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop",
    address: "The Zone @ Rosebank",
    rating: 4.1,
    points: 60,
    isFlash: true,
    flashExpiry: new Date(Date.now() + 18 * 60 * 1000).toISOString(),
  },
  {
    id: "f3",
    businessName: "Nu Metro Sandton",
    description: "Flash! R49 any movie right now. All formats including IMAX!",
    category: "Entertainment",
    discount: "R49 MOVIE",
    lat: -26.1090,
    lng: 28.0540,
    expiry: "2026-04-15",
    claimed: 28,
    maxClaims: 50,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop",
    address: "Sandton City, Johannesburg",
    rating: 4.5,
    points: 70,
    verified: true,
    isFlash: true,
    flashExpiry: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
  },
  {
    id: "24",
    businessName: "Lew Geffen Sotheby's",
    description: "Luxury 5-bed villa in Sandhurst with infinity pool and staff cottage. Prestigious address.",
    category: "Real Estate",
    discount: "PREMIUM",
    lat: -26.1200,
    lng: 28.0600,
    expiry: "2026-06-01",
    claimed: 5,
    maxClaims: 15,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    address: "Sandhurst, Johannesburg",
    rating: 4.9,
    points: 150,
    verified: true,
    bedrooms: 5,
    bathrooms: 4,
    sqm: 450,
    price: "R12,500,000",
    garage: 3,
    pool: true,
    features: ["Infinity Pool", "Staff Cottage", "Wine Cellar", "Home Cinema", "Solar Panels", "Borehole", "Generator", "Smart Home"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    agent: { name: "Thandi Nkosi", phone: "+27832228765", email: "thandi@sothebys.co.za", agency: "Sotheby's Realty", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" },
    neighbourhood: { safety: 10, schools: 9, shopping: 8, transport: 5 },
  },
  {
    id: "25",
    businessName: "Century 21 Bryanston",
    description: "Charming 3-bed cluster in secure complex. Walk to Bryanston shops.",
    category: "Real Estate",
    discount: "REDUCED",
    lat: -26.0550,
    lng: 28.0250,
    expiry: "2026-05-25",
    claimed: 14,
    maxClaims: 35,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    address: "Bryanston, Johannesburg",
    rating: 4.4,
    points: 95,
    verified: true,
    bedrooms: 3,
    bathrooms: 2,
    sqm: 160,
    price: "R2,750,000",
    garage: 2,
    pool: true,
    features: ["Alarm System", "Electric Fence", "Fiber Internet", "Garden", "Braai Area", "Pet Friendly"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    ],
    agent: { name: "Mark Thompson", phone: "+27829994321", email: "mark@century21.co.za", agency: "Century 21", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
    neighbourhood: { safety: 8, schools: 9, shopping: 9, transport: 6 },
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Thabo M.", avatar: "\u{1F3C6}", points: 4850, dealsFound: 87, level: 15 },
  { rank: 2, name: "Naledi K.", avatar: "\u{1F948}", points: 4320, dealsFound: 76, level: 14 },
  { rank: 3, name: "Johan V.", avatar: "\u{1F949}", points: 3980, dealsFound: 71, level: 13 },
  { rank: 4, name: "Amahle Z.", avatar: "\u2B50", points: 3650, dealsFound: 64, level: 12 },
  { rank: 5, name: "Pieter D.", avatar: "\u2B50", points: 3420, dealsFound: 59, level: 11 },
  { rank: 6, name: "Lindiwe S.", avatar: "\u2B50", points: 3100, dealsFound: 52, level: 10 },
  { rank: 7, name: "Ryan C.", avatar: "\u2B50", points: 2870, dealsFound: 48, level: 10 },
  { rank: 8, name: "Fatima A.", avatar: "\u2B50", points: 2650, dealsFound: 44, level: 9 },
  { rank: 9, name: "Sipho N.", avatar: "\u2B50", points: 2410, dealsFound: 40, level: 8 },
  { rank: 10, name: "Emma W.", avatar: "\u2B50", points: 2200, dealsFound: 36, level: 8 },
];

export const userProfile: UserProfile = {
  name: "Shaun",
  level: 7,
  xp: 680,
  xpToNext: 1000,
  points: 1850,
  coins: 320,
  streak: 5,
  dealsFound: 28,
  vouchers: ["1", "4", "10", "15", "18"],
  rank: 14,
};

export const notifications: Notification[] = [
  { id: "n1", type: "deal", title: "New Deal Nearby!", message: "Nando's Rosebank just dropped a BOGO deal 500m from you", time: "2 min ago", read: false },
  { id: "n2", type: "achievement", title: "Achievement Unlocked!", message: "You earned the 'Deal Hunter' badge for claiming 25 deals", time: "1 hour ago", read: false },
  { id: "n3", type: "social", title: "Leaderboard Update", message: "You moved up 3 spots to #14 on the weekly leaderboard", time: "3 hours ago", read: false },
  { id: "n4", type: "deal", title: "Deal Expiring Soon", message: "Woolworths Sandton 30% OFF expires in 24 hours - claim it now!", time: "5 hours ago", read: true },
  { id: "n5", type: "system", title: "Welcome to Twaffle v3!", message: "Spin the Wheel is here! Plus treasure hunts, coin shop & more", time: "1 day ago", read: true },
  { id: "n6", type: "deal", title: "Hot Deal Alert", message: "Gold Reef City has R100 off day passes this weekend only", time: "1 day ago", read: true },
  { id: "n7", type: "achievement", title: "Streak Extended!", message: "5-day streak! Keep going to unlock the Hot Streak badge", time: "2 days ago", read: true },
  { id: "n8", type: "social", title: "Friend Activity", message: "Thabo M. just claimed a deal at Montecasino. Check it out!", time: "2 days ago", read: true },
];

export const treasureHunts: TreasureHunt[] = [
  {
    id: "h1",
    name: "Sandton Food Safari",
    description: "Visit 4 food deals in the Sandton area to win 500 coins!",
    dealIds: ["1", "21", "17", "5"],
    reward: "500 Coins",
    rewardIcon: "\u{1FA99}",
    progress: 0.5,
    totalSteps: 4,
    completedSteps: 2,
    expiresIn: "3 days",
    waypoints: [
      { lat: -26.1469, lng: 28.0436, label: "Nando's Rosebank", completed: true },
      { lat: -26.1455, lng: 28.0410, label: "The Grillhouse", completed: true },
      { lat: -26.1477, lng: 28.0152, label: "Doppio Zero", completed: false },
      { lat: -25.7823, lng: 28.2769, label: "Ocean Basket", completed: false },
    ],
  },
  {
    id: "h2",
    name: "Weekend Property Explorer",
    description: "View 3 real estate listings to unlock a mystery box prize!",
    dealIds: ["3", "7", "14"],
    reward: "Mystery Box",
    rewardIcon: "\u{1F381}",
    progress: 0.33,
    totalSteps: 3,
    completedSteps: 1,
    expiresIn: "5 days",
    waypoints: [
      { lat: -26.1325, lng: 28.0310, label: "Pam Golding", completed: true },
      { lat: -25.8603, lng: 28.1894, label: "RE/MAX Centurion", completed: false },
      { lat: -25.7461, lng: 28.1881, label: "Seeff Pretoria", completed: false },
    ],
  },
  {
    id: "h3",
    name: "Entertainment Streak",
    description: "Claim 3 entertainment deals in a week and win a grand spin!",
    dealIds: ["4", "8", "13"],
    reward: "Grand Spin",
    rewardIcon: "\u{1F3B0}",
    progress: 0.67,
    totalSteps: 3,
    completedSteps: 2,
    expiresIn: "2 days",
    waypoints: [
      { lat: -26.0224, lng: 28.0106, label: "Montecasino", completed: true },
      { lat: -26.2346, lng: 28.0141, label: "Gold Reef City", completed: true },
      { lat: -26.1506, lng: 28.2134, label: "Emperors Palace", completed: false },
    ],
  },
];

export const coinTransactions: CoinTransaction[] = [
  { id: "ct1", type: "earned", amount: 50, description: "Daily spin reward", date: "2026-03-25" },
  { id: "ct2", type: "spent", amount: -50, description: "Spin the Wheel", date: "2026-03-25" },
  { id: "ct3", type: "earned", amount: 100, description: "Claimed Nando's BOGO deal", date: "2026-03-24" },
  { id: "ct4", type: "purchased", amount: 350, description: "Purchased Popular pack", date: "2026-03-23" },
  { id: "ct5", type: "earned", amount: 200, description: "Treasure Hunt: Food Safari", date: "2026-03-22" },
  { id: "ct6", type: "spent", amount: -50, description: "Spin the Wheel", date: "2026-03-22" },
  { id: "ct7", type: "earned", amount: 75, description: "Achievement: Deal Hunter", date: "2026-03-21" },
  { id: "ct8", type: "purchased", amount: 100, description: "Purchased Starter pack", date: "2026-03-20" },
  { id: "ct9", type: "earned", amount: 50, description: "Daily login bonus", date: "2026-03-19" },
  { id: "ct10", type: "spent", amount: -50, description: "Spin the Wheel", date: "2026-03-18" },
];

export const territories: Territory[] = [
  { id: "t1", name: "Sandton CBD", lat: -26.1076, lng: 28.0567, radius: 1500, dealsFound: 12, rank: 1, totalPlayers: 45, color: "#10B981" },
  { id: "t2", name: "Rosebank", lat: -26.1469, lng: 28.0436, radius: 1200, dealsFound: 8, rank: 2, totalPlayers: 32, color: "#10B981" },
  { id: "t3", name: "Fourways", lat: -26.0152, lng: 28.0063, radius: 2000, dealsFound: 6, rank: 5, totalPlayers: 28, color: "#7C3AED" },
  { id: "t4", name: "Braamfontein", lat: -26.1920, lng: 28.0340, radius: 800, dealsFound: 4, rank: 3, totalPlayers: 18, color: "#10B981" },
];

export const categoryColors: Record<Category, string> = {
  Food: "#F59E0B",
  Retail: "#EC4899",
  "Real Estate": "#3B82F6",
  Entertainment: "#8B5CF6",
};

export const achievementBadges: AchievementBadge[] = [
  { id: "ab1", icon: "\u{1F525}", label: "Hot Streak", description: "Maintain a 5 day streak of claiming deals", unlocked: true, progress: 100, requirement: "Claim deals 5 days in a row" },
  { id: "ab2", icon: "\u{1F3AF}", label: "Deal Hunter", description: "Successfully claim 25 deals from local businesses", unlocked: true, progress: 100, requirement: "Claim 25 deals total" },
  { id: "ab3", icon: "\u{1F5FA}\uFE0F", label: "Explorer", description: "Discover deals across 10 different areas", unlocked: true, progress: 100, requirement: "Visit 10 unique areas" },
  { id: "ab4", icon: "\u{1F451}", label: "Top 10", description: "Break into the top 10 on the leaderboard", unlocked: false, progress: 60, requirement: "Reach top 10 ranking" },
  { id: "ab5", icon: "\u{1F48E}", label: "Diamond", description: "Reach the prestigious Level 20 status", unlocked: false, progress: 35, requirement: "Reach Level 20" },
  { id: "ab6", icon: "\u{1F31F}", label: "Legendary", description: "Claim 100 deals to become a legend", unlocked: false, progress: 28, requirement: "Claim 100 deals total" },
  { id: "ab7", icon: "\u{1F3C3}", label: "Speed Runner", description: "Claim 5 deals in a single day", unlocked: false, progress: 40, requirement: "Claim 5 deals within 24 hours" },
  { id: "ab8", icon: "\u{1F30D}", label: "Globe Trotter", description: "Find deals in 5 different cities", unlocked: false, progress: 20, requirement: "Claim deals in 5 cities" },
  { id: "ab9", icon: "\u{1F91D}", label: "Social Star", description: "Refer 10 friends to Twaffle", unlocked: false, progress: 10, requirement: "Refer 10 friends" },
];

export const dailyChallenges: DailyChallenge[] = [
  { id: "dc1", title: "Claim 3 Deals", current: 2, target: 3, reward: 50, completed: false },
  { id: "dc2", title: "Visit 2 New Areas", current: 2, target: 2, reward: 75, completed: true },
  { id: "dc3", title: "Earn 100 Points", current: 65, target: 100, reward: 30, completed: false },
];
