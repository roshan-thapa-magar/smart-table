"use client";

export default function RestaurantSearch() {
  return (
    <div className="w-full max-w-xl text-center space-y-8 text-white">
      
      {/* Animated background elements */}
      <div className="relative">
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Title with simpler gradient (no animation needed) */}
        <h1 className="relative text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-amber-400 to-white bg-clip-text text-transparent">
          Find Your Restaurant
        </h1>
      </div>

      <p className="text-base md:text-lg text-white/80 font-light max-w-md mx-auto">
        Search restaurants, tables, or menus instantly
      </p>

      {/* Enhanced Search Box */}
      <div className="relative group mt-8">
        {/* Simpler hover effect without custom animation */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"></div>
        
        <div className="relative flex items-center w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 focus-within:shadow-2xl focus-within:shadow-amber-500/30">
          
          {/* Search Icon */}
          <div className="pl-5 md:pl-6 text-white/60 group-focus-within:text-amber-400 transition-all duration-300">
            <svg className="w-5 h-5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search restaurant..."
            className="flex-1 min-w-0 px-3 py-3.5 md:py-4 text-base md:text-base bg-transparent text-white placeholder:text-white/40 focus:placeholder:text-white/20 outline-none transition-all duration-300"
          />

          <button className="shrink-0 mx-2 md:mx-2 px-5 md:px-7 py-2 md:py-2.5 text-sm md:text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 whitespace-nowrap">
            Search →
          </button>
        </div>
      </div>

      {/* Popular searches */}
      <div className="pt-6 space-y-3">
        <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">
          Popular Searches
        </p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {["Italian Cuisine", "Sushi Bar", "Burger Joint", "Pizza Place", "Vegan Options", "Seafood"].map((term) => (
            <button
              key={term}
              className="px-4 py-1.5 text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md border border-white/10 hover:border-amber-500/50"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Stats badges */}
      <div className="flex justify-center gap-4 pt-4 text-xs text-white/40">
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>10,000+ Restaurants</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span>Real-time Availability</span>
        </div>
      </div>
    </div>
  );
}