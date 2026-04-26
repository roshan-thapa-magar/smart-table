"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

type Restaurant = {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  category: string;
};

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Kyirmu Cafe",
    image: "/logo.jpg",
    location: "Kapan, Kathmandu",
    rating: 4.5,
    category: "Cafe",
  },
  {
    id: 2,
    name: "Momo House",
    image: "/logo.jpg",
    location: "Thamel, Kathmandu",
    rating: 4.2,
    category: "Nepali Food",
  },
  {
    id: 3,
    name: "Burger Hub",
    image: "/logo.jpg",
    location: "Baneshwor, Kathmandu",
    rating: 4.6,
    category: "Fast Food",
  },
  {
    id: 4,
    name: "Pizza Corner",
    image: "/logo.jpg",
    location: "Lalitpur",
    rating: 4.3,
    category: "Italian",
  },
  {
    id: 5,
    name: "Kyirmu Cafe",
    image: "/logo.jpg",
    location: "Kapan, Kathmandu",
    rating: 4.5,
    category: "Cafe",
  },
  {
    id: 6,
    name: "Momo House",
    image: "/logo.jpg",
    location: "Thamel, Kathmandu",
    rating: 4.2,
    category: "Nepali Food",
  },
  {
    id: 7,
    name: "Burger Hub",
    image: "/logo.jpg",
    location: "Baneshwor, Kathmandu",
    rating: 4.6,
    category: "Fast Food",
  },
  {
    id: 8,
    name: "Pizza Corner",
    image: "/logo.jpg",
    location: "Lalitpur",
    rating: 4.3,
    category: "Italian",
  },
   {
    id: 9,
    name: "Pizza Corner",
    image: "/logo.jpg",
    location: "Lalitpur",
    rating: 4.3,
    category: "Italian",
  },
  {
    id: 10,
    name: "Kyirmu Cafe",
    image: "/logo.jpg",
    location: "Kapan, Kathmandu",
    rating: 4.5,
    category: "Cafe",
  },
  {
    id: 11,
    name: "Momo House",
    image: "/logo.jpg",
    location: "Thamel, Kathmandu",
    rating: 4.2,
    category: "Nepali Food",
  },
  {
    id: 12,
    name: "Burger Hub",
    image: "/logo.jpg",
    location: "Baneshwor, Kathmandu",
    rating: 4.6,
    category: "Fast Food",
  }
];

export default function RestaurantList() {
  return (
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {restaurants.map((item) => (
          <Link
            key={item.id}
            href="#"
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition "
          >
            {/* Image */}
            <div className="relative w-full h-40">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3 space-y-1">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.location}</p>

              <div className="flex items-center justify-between text-xs mt-2">
                <Badge variant={"secondary"} className="px-2 py-1 rounded">
                  {item.category}
                </Badge>
                <span className="text-yellow-500 font-medium">
                  ⭐ {item.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
  );
}