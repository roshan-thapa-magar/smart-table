"use client";

export default function RestaurantSearch() {
  return (
    <div className="w-full max-w-xl text-center space-y-6 text-white">
      
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
        Find Your Restaurant
      </h1>

      <p className="text-sm text-white/70">
        Search restaurants, tables, or menus instantly
      </p>

      {/* Search Box */}
      <div className="flex items-center border border-white/20 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-white/20">
        <input
          type="text"
          placeholder="Search restaurant..."
          className="w-full px-5 py-3 outline-none text-sm bg-transparent text-white placeholder:text-white/50"
        />
        <button className="px-5 py-3 bg-white text-black text-sm hover:bg-white/90 transition">
          Search
        </button>
      </div>
      
    </div>
  );
}