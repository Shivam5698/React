// import React from 'react'

function Card({username,btnText="visit me"}) {
    console.log(username)
    return (
<div class="relative w-full max-w-sm bg-slate-900 rounded-2xl shadow-2xl overflow-hidden mx-auto mt-10">
  
  <div class="bg-emerald-500 h-1.5 w-full"></div>

  <div class="relative w-full h-[420px]">
    
    <div class="w-full h-full bg-slate-700"></div>
    
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>

    <div class="absolute bottom-0 w-full p-6">
      
      <h2 class="text-3xl font-bold text-white mb-2">{username}</h2>
      
=      <p class="text-slate-300 text-sm mb-6 leading-relaxed">
        Frontend Architect specializing in Tailwind and UI engineering. Passionate about building scalable design systems.
      </p>

      <button class="w-full bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-white rounded-xl py-3 px-5 flex justify-between items-center transition-colors duration-200 shadow-md">
        {btnText}
      </button>
      
    </div>
  </div>
</div>
    )
}

export default Card
