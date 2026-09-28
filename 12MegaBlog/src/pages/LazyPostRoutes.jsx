import { lazy } from 'react'
import { Skeleton } from '../components'

export const AddPostPage = lazy(() => import('./AddPost.jsx'))
export const EditPostPage = lazy(() => import('./EditPost.jsx'))

export function PostFormFallback() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col justify-center gap-5 px-4 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading editor">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full rounded-3xl" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}
