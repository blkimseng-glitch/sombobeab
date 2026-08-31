export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#contact" },
];

export interface MenuItem {
  restaurant_id: number | string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  drink_type: string;
}

// Swap these Unsplash URLs for your own food photos
export const menuItems: MenuItem[] = [
  {
      restaurant_id: 1,
      name: "Muffins",
      description: "Soft, moist and perfectly baked little treats.",
      price: "$3.99",
      image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=60",
      category: "",
      drink_type: ""
  },
  {
      restaurant_id: 2,
      name: "Pancakes",
      description: "Fluffy and delicious pancakes to power your day.",
      price: "$5.99",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=60",
      category: "",
      drink_type: ""
  },
  {
      restaurant_id: 3,
      name: "Waffles",
      description: "Crispy, golden waffles with a hint of vanilla.",
      price: "$4.99",
      image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=400&q=60",
      category: "",
      drink_type: ""
  },
  {
      restaurant_id: 4,
      name: "Bagels",
      description: "Freshly baked bagels with the perfect chew and taste.",
      price: "$3.49",
      image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=400&q=60",
      category: "",
      drink_type: ""
  },
  {
      restaurant_id: 5,
      name: "Oatmeal",
      description: "Healthy, hearty and full of essential nutrients.",
      price: "$3.99",
      image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=60",
      category: "",
      drink_type: ""
  },
  {
      restaurant_id: 6,
      name: "Omelette",
      description: "Fluffy, protein-rich omelette with fresh veggies and herbs.",
      price: "$4.99",
      image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=400&q=60",
      category: "",
      drink_type: ""
  },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah L.",
    role: "Food Blogger",
    quote:
      "The food is amazing, delivery was quick, and everything arrived warm and fresh. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Michael T.",
    role: "Verified Customer",
    quote:
      "Fresh ingredients and generous portions. Foodeza has become my go-to for healthy meals!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Jessica R.",
    role: "Nutritionist",
    quote:
      "Best healthy meals I've ordered online. Quick delivery, delicious dishes and beautiful packaging.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export interface Chef {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const chefs: Chef[] = [
  {
    id: 1,
    name: "Daniel Carter",
    role: "Head Chef",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 2,
    name: "Olivia Bennett",
    role: "Pastry Chef",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Sous Chef",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=70",
  },
];
