"use client";

export default function RestaurantSearch() {
  return (
    <div className="w-full max-w-xl text-center space-y-6 text-white">
      {/* Decorative elements */}
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl"></div>
        
        {/* Title with gradient */}
        <h1 className="relative text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
          Find Your Restaurant
        </h1>
      </div>

      <p className="text-base md:text-lg text-white/70 font-light">
        Search restaurants, tables, or menus instantly
      </p>

      {/* Search Box with enhanced design */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
        
        <div className="relative flex items-center w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:border-transparent">
          
          {/* Search Icon */}
          <div className="pl-4 md:pl-5 text-white/50 group-focus-within:text-amber-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search restaurant..."
            className="flex-1 min-w-0 px-3 py-3 md:py-3.5 outline-none text-sm md:text-base bg-transparent text-white placeholder:text-white/40 focus:placeholder:text-white/20 transition-all"
          />

          <button className="shrink-0 mx-1.5 md:mx-2 px-4 md:px-6 py-1.5 md:py-2 text-sm md:text-base font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
            Search
          </button>
        </div>
      </div>

      {/* Popular searches */}
      <div className="pt-4">
        <p className="text-xs text-white/50 mb-3">Popular searches:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["Italian", "Sushi", "Burger", "Pizza", "Vegan"].map((term) => (
            <button
              key={term}
              className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-105"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}