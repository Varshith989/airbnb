const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const sampleListings = [
  {
    title: "Sunny Beachfront Villa",
    description: "Wake up to the sound of ocean waves in this stunning beachfront property with direct private sand access.",
    imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    category: "Beach",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    locationValue: "GR",
    price: 280,
  },
  {
    title: "Historic Dutch Windmill Retreat",
    description: "Experience an authentic Dutch heritage windmill restored into a cozy modern architectural masterpiece.",
    imageSrc: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    category: "Windmills",
    roomCount: 2,
    bathroomCount: 1,
    guestCount: 4,
    locationValue: "NL",
    price: 195,
  },
  {
    title: "Tuscan Countryside Stone Cottage",
    description: "Charming stone cottage nestled in rolling olive groves and cypress hills of the Italian countryside.",
    imageSrc: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
    category: "Countryside",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 5,
    locationValue: "IT",
    price: 210,
  },
  {
    title: "Infinity Pool Luxury Oasis",
    description: "Perched over panoramic jungle valleys with an iconic infinity pool and private cocktail terrace.",
    imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    category: "Pools",
    roomCount: 4,
    bathroomCount: 4,
    guestCount: 8,
    locationValue: "ID",
    price: 450,
  },
  {
    title: "Private Tropical Island Bungalow",
    description: "Exclusive overwater bungalow on a secluded private island surrounded by turquoise coral lagoons.",
    imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    category: "Islands",
    roomCount: 2,
    bathroomCount: 2,
    guestCount: 4,
    locationValue: "MV",
    price: 590,
  },
  {
    title: "Tranquil Alpine Lakehouse",
    description: "Peaceful waterfront timber lodge with private boat dock, kayak rentals, and glassy lake reflections.",
    imageSrc: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    category: "Lake",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    locationValue: "CH",
    price: 320,
  },
  {
    title: "Chamonix Ski-in/Ski-out Chalet",
    description: "Step right onto world-class powder slopes from your warm cedar sauna and roaring stone fireplace.",
    imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    category: "Skiing",
    roomCount: 5,
    bathroomCount: 3,
    guestCount: 10,
    locationValue: "FR",
    price: 490,
  },
  {
    title: "Scottish Highland Fortress Castle",
    description: "Live like royalty in a restored 16th-century fortress surrounded by lochs, ancient hills, and banquet halls.",
    imageSrc: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=1200&q=80",
    category: "Castles",
    roomCount: 8,
    bathroomCount: 6,
    guestCount: 16,
    locationValue: "GB",
    price: 850,
  },
  {
    title: "Cappadocia Historic Cave Suite",
    description: "Carved directly into volcanic fairy chimneys, featuring hand-loomed Turkish kilims and sunrise balloon views.",
    imageSrc: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1200&q=80",
    category: "Caves",
    roomCount: 2,
    bathroomCount: 1,
    guestCount: 3,
    locationValue: "TR",
    price: 180,
  },
  {
    title: "Redwood Glamping Dome",
    description: "Eco-luxury dome nestled deep beneath ancient towering redwood canopy with transparent stargazing roof.",
    imageSrc: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    category: "Camping",
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 2,
    locationValue: "US",
    price: 140,
  },
  {
    title: "Tromso Northern Lights Glass Igloo",
    description: "Witness the magical dancing Aurora Borealis from your heated glass bed inside the arctic circle.",
    imageSrc: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    category: "Arctic",
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 2,
    locationValue: "NO",
    price: 380,
  },
  {
    title: "Sahara Desert Luxury Tent Camp",
    description: "Camp under billions of stars amidst endless golden sand dunes with camel treks and authentic Berber music.",
    imageSrc: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    category: "Desert",
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 2,
    locationValue: "MA",
    price: 165,
  },
  {
    title: "Modernized Rustic Red Barn",
    description: "Striking open-concept converted barn featuring high beamed ceilings, fire pit, and wildflower meadows.",
    imageSrc: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    category: "Barns",
    roomCount: 4,
    bathroomCount: 3,
    guestCount: 8,
    locationValue: "CA",
    price: 290,
  },
  {
    title: "Beverly Hills Ultra-Lux Penthouse",
    description: "Private elevator access, bespoke Italian marble, helipad concierge, and panoramic skyline vistas.",
    imageSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    category: "Lux",
    roomCount: 5,
    bathroomCount: 5,
    guestCount: 10,
    locationValue: "US",
    price: 1200,
  },
]

async function seed() {
  const user = await prisma.user.findFirst()
  if (!user) {
    console.log("No user found")
    return
  }

  for (const item of sampleListings) {
    const existing = await prisma.listing.findFirst({
      where: { category: item.category },
    })

    if (!existing) {
      await prisma.listing.create({
        data: {
          ...item,
          userId: user.id,
        },
      })
      console.log("Added listing for category:", item.category)
    } else {
      console.log("Category already exists:", item.category)
    }
  }

  console.log("ALL_CATEGORIES_SEEDED_SUCCESSFULLY")
}

seed()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
  })
