import RestaurantSearch from "@/components/main/RestaurantSearch";
import RestaurantList from "@/components/main/RestaurantList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      {/* SEARCH SECTION (FULL HEIGHT CENTER) */}
      <section
        className="min-h-[90vh] flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full flex justify-center">
          <RestaurantSearch />
        </div>
      </section>

      {/* RESTAURANT LIST SECTION */}
      <section className="w-full max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Popular Restaurants
          </h2>
          <Link href="/restaurant">View all restaurants</Link>
        </div>
        <RestaurantList />
      </section>
    </>
  );
}