export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  stock: 15,
};

export const products: Product[] = [
  {
    id: "w1",
    name: "Classic White Roses",
    image: "/images/wedding-white-roses.jpg",
    price: 500,
    description: "Elegant white roses perfect for weddings.",
    category: "wedding",
    stock: 15,
  },
  {
    id: "w2",
    name: "Pastel Romance",
    image: "/images/wedding-pastel.jpg",
    price: 650,
    description: "A pastel-themed bouquet for your dreamy wedding.",
    category: "wedding",
    stock: 15,
  },

  {
    id: "b1",
    name: "Colorful Birthday Bash",
    image: "/images/birthday-colorful.jpg",
    price: 400,
    description: "Celebrate birthdays with vibrant flowers.",
    category: "birthday",
    stock: 15,
  },
  {
    id: "b2",
    name: "Sunflower Surprise",
    image: "/images/birthday-sunflower.jpg",
    price: 450,
    description: "Bright sunflowers to light up the day.",
    category: "birthday",
    stock: 15,
  },

  {
    id: "a1",
    name: "Romantic Reds",
    image: "/images/anniversary-reds.jpg",
    price: 700,
    description: "Red roses to celebrate timeless love.",
    category: "anniversary",
    stock: 15,
  },
  {
    id: "a2",
    name: "Elegant Orchids",
    image: "/images/anniversary-orchids.jpg",
    price: 750,
    description: "Orchids to show your lasting affection.",
    category: "anniversary",
    stock: 15,
  },

  {
    id: "s1",
    name: "Graduation Glory",
    image: "/images/special-graduation.jpg",
    price: 500,
    description: "Celebrate milestones with floral pride.",
    category: "special",
    stock: 15,
  },
  {
    id: "s2",
    name: "New Baby Blooms",
    image: "/images/special-baby.jpg",
    price: 550,
    description: "Soft pastels for joyful beginnings.",
    category: "special",
    stock: 15,
  },
];
