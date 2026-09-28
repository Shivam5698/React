import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Container ,EmptyState,PostCard} from '../components'
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux'

function AllPosts() {
    const [posts,setPosts]=useState([])
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(()=>{},[])
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
  return (
    <div className="page-enter w-full flex-1 py-12 md:py-16">
    <Container>
        <header className="mb-10">
            <p className="mb-2 text-sm font-semibold text-(--primary)">Explore the archive</p>
            <h1 className="text-3xl font-bold text-(--text-h)">All posts</h1>
            <p className="mt-3 max-w-2xl text-(--text-muted)">Ideas, notes, and stories shared by the MegaBlog community.</p>
        </header>
        {/* UI-TODO: Add a skeleton when an existing loading flag is available; an empty array currently cannot distinguish loading from no posts. */}
        {posts.length === 0 ? (
            <EmptyState title="No posts yet" description="There are no published posts to show right now." />
        ) : (
        <div className="defer-render grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {posts.map((post)=>(
            <PostCard key={post.$id} {...post}/>
         ))}
         {authStatus && (
            <Link to="/add-post" className="card-modern group flex min-h-64 flex-col justify-between rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50">
                <span className="grid size-11 place-items-center rounded-xl bg-indigo-500/10 text-2xl font-light text-(--primary)" aria-hidden="true">+</span>
                <span>
                    <span className="block text-lg font-semibold text-(--text-h)">Write your own story</span>
                    <span className="mt-2 block text-sm text-(--text-muted)">Add a fresh perspective to the collection.</span>
                </span>
                <span className="text-sm font-semibold text-(--primary)">Create a post <span aria-hidden="true">→</span></span>
            </Link>
         )}
        </div>
        )}
    </Container>

   </div>
  )
}

export default AllPosts