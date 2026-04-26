"use client";

import { useState } from "react";
import { SortDropdown } from "@/components/sort-dropdown";
import RestaurantList from "@/components/main/RestaurantList";
import { Filter } from "@/components/filter";

export default function Page() {
  const [sort, setSort] = useState("default");
  const [place, setPlace] = useState("kathmandu");
const [filters, setFilters] = useState<string[]>([]);

  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Distance", value: "distance" },
    { label: "Favorite First", value: "favorite" },
    { label: "Nearby Me", value: "nearby" },
    { label: "Popularity", value: "popular" },
  ];

  const placeOptions = [
    { label: "Kathmandu", value: "kathmandu" },
    { label: "Bhaktapur", value: "bhaktapur" },
    { label: "Lalitpur", value: "lalitpur" },
    { label: "Pokhara", value: "pokhara" },
    { label: "Butwal", value: "butwal" },
  ];

const filterOptions = [
  { label: "Fast Food", value: "fast_food" },
  { label: "Fine Dining", value: "fine_dining" },
  { label: "Cafe", value: "cafe" },
  { label: "Bakery", value: "bakery" },
  { label: "Street Food", value: "street_food" },
  { label: "Buffet", value: "buffet" },
  { label: "Pizza", value: "pizza" },
  { label: "Burger", value: "burger" },
  { label: "Chicken & Grill", value: "grill" },
  { label: "Desserts & Ice Cream", value: "dessert" },

  { label: "Nepali Cuisine", value: "nepali" },
  { label: "Indian Cuisine", value: "indian" },
  { label: "Chinese Cuisine", value: "chinese" },
  { label: "Japanese Sushi", value: "japanese" },
  { label: "Korean BBQ", value: "korean" },
  { label: "Italian", value: "italian" },
  { label: "Mexican", value: "mexican" },
  { label: "Seafood", value: "seafood" },
  { label: "Vegan / Healthy", value: "vegan" },
  { label: "Bar & Pub", value: "bar_pub" },
  { label: "Middle Eastern", value: "middle_eastern" },
  { label: "Thai", value: "thai" },
  { label: "Vietnamese", value: "vietnamese" },
  { label: "Spanish Tapas", value: "spanish" },
  { label: "Mediterranean", value: "mediterranean" },
  { label: "Turkish", value: "turkish" },
  { label: "American Diner", value: "american_diner" },
  { label: "Healthy Bowl", value: "healthy_bowl" },
  { label: "Juice & Smoothie", value: "juice_smoothie" },
  { label: "Coffee Shop", value: "coffee_shop" },

  { label: "Ice Cream Parlor", value: "ice_cream" },
  { label: "Pasta House", value: "pasta" },
  { label: "BBQ Grill House", value: "bbq" },
  { label: "Wings & Fried Chicken", value: "wings" },
  { label: "Sandwich & Subs", value: "sandwich" },
  { label: "Organic Food", value: "organic" },
  { label: "Fusion Cuisine", value: "fusion" },
  { label: "Seafood Grill", value: "seafood_grill" },
  { label: "Breakfast & Brunch", value: "breakfast" },
  { label: "Family Restaurant", value: "family" },
];


  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">

      {/* Place filter */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-bold">Restaurant and Cafe</h1>
        <SortDropdown
          options={placeOptions}
          value={place}
          onChange={setPlace}
        />
      </div>

      {/* Header + Sort */}
      <div className="flex justify-between items-center">
        <Filter
          title="Filter"
          options={filterOptions}
          selected={filters}
          onChange={setFilters}
        />;

        <SortDropdown
          options={sortOptions}
          value={sort}
          onChange={setSort}
        />
      </div>

      <RestaurantList />
    </div>
  );
}