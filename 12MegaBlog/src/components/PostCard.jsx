import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`} className="group card-modern flex h-full w-full flex-col rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 [contain:layout_paint_style]">
       <div className="image-fallback relative aspect-[16/10] w-full overflow-hidden rounded-xl">
         <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />
         {/* UI-TODO: Appwrite getFilePreview currently accepts only fileId, so thumbnail dimensions/quality cannot be requested here. */}
         <img
           src={appwriteService.getFilePreview(featuredImage)}
           alt={title}
           loading="lazy"
           decoding="async"
           onError={(event) => event.currentTarget.classList.add('hidden')}
           className="relative z-10 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:will-change-transform motion-reduce:transform-none"
         />
       </div>
       <div className="flex flex-1 flex-col gap-3 pt-5">
         <h2 className="mt-1 line-clamp-2 text-lg font-semibold text-(--text-h)">{title}</h2>
         <span className="mt-auto flex items-center gap-1 pt-1 text-sm font-semibold text-(--primary)">
           Read more <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
         </span>
       </div>
    </Link>
  )
}

export default React.memo(PostCard)