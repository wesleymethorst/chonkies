export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  category: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Captain America",
    price: 14.99,
    image: "/products/marvel/captainamerica.png",
    images: [
      "/products/marvel/captainamerica.png",
      "/products/marvel/ironman.png"
    ],
    description: "De heldhaftige Captain America als Funko Pop.",
    category: "Marvel",
  },
  {
    id: "2",
    name: "Iron Man",
    price: 15.99,
    image: "/products/marvel/ironman.png",
    images: [
      "/products/marvel/ironman.png",
      "/products/marvel/ironman.png"
    ],
    description: "De iconische Iron Man als Funko Pop.",
    category: "Marvel",
  },
  {
    id: "3",
    name: "Peter Parker Symbiote",
    price: 15.49,
    image: "/products/marvel/peterparkersymbiote.png",
    images: [
      "/products/marvel/peterparkersymbiote.png",
      "/products/marvel/peterparkersymbiote.png"
    ],
    description: "Peter Parker in zijn symbiote suit als Funko Pop.",
    category: "Marvel",
  },
  {
    id: "4",
    name: "Super Red Hulk",
    price: 16.49,
    image: "/products/marvel/superredhulk.png",
    images: [
      "/products/marvel/superredhulk.png",
      "/products/marvel/superredhulk.png"
    ],
    description: "De krachtige Super Red Hulk als Funko Pop.",
    category: "Marvel",
  },
  {
    id: "9",
    name: "Doctor Doom",
    price: 17.49,
    image: "/products/marvel/doctordoom.png",
    images: [
      "/products/marvel/doctordoom.png",
      "/products/marvel/doctordoom.png"
    ],
    description: "De beruchte schurk Doctor Doom als Funko Pop.",
    category: "Marvel",
  },
  {
    id: "10",
    name: "Captain Falcon America",
    price: 16.99,
    image: "/products/marvel/captainfalconamerica.png",
    images: [
      "/products/marvel/captainfalconamerica.png",
      "/products/marvel/captainfalconamerica.png"
    ],
    description: "Captain Falcon America als unieke Funko Pop.",
    category: "Marvel",
  },
  {
    id: "5",
    name: "Belle",
    price: 13.99,
    image: "/products/disney/belle.png",
    images: [
      "/products/disney/belle.png",
      "/products/disney/belle.png"
    ],
    description: "Onze schattigste Funko Pop, altijd vrolijk!",
    category: "Disney",
  },
  {
    id: "6",
    name: "Mickey Mouse",
    price: 12.99,
    image: "/products/disney/mickey.png",
    images: [
      "/products/disney/mickey.png",
      "/products/disney/mickey.png"
    ],
    description: "Disney's bekendste muis als Funko Pop.",
    category: "Disney",
  },
  {
    id: "7",
    name: "Chucky",
    price: 17.99,
    image: "/products/horror/chucky.png",
    images: [
      "/products/horror/chucky.png",
      "/products/horror/chucky.png"
    ],
    description: "De beruchte pop uit horrorfilms.",
    category: "Horror",
  },
  {
    id: "8",
    name: "Terrifier",
    price: 16.99,
    image: "/products/horror/terrifier.png",
    images: [
      "/products/horror/terrifier.png",
      "/products/horror/terrifier.png"
    ],
    description: "Voor wie durft! Stoer en uniek als Funko Pop.",
    category: "Horror",
  },
];
