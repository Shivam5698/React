import {useState,useEffect} from 'react'
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, EmptyState, PostCard } from '../components';

function Home() {
    const [posts,setPosts]=useState([])
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    },[])
 const hero = (
        <section className="hero-glow mx-auto flex min-h-[20rem] max-w-5xl items-center justify-center px-5 py-10 text-center sm:min-h-[22rem] sm:px-12 sm:py-14">
            <div className="relative z-10 flex flex-col items-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-500/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-(--primary) sm:text-sm">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-(--primary)" />
          Ideas, stories, and perspectives
        </p>
        <h1 className="gradient-text mt-6 pb-2 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-normal">
          Welcome to Mega Blog
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-(--text-muted) sm:text-lg">
            A place to share what you know, discover new perspectives, and find your next great read.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/all-posts" className="btn-primary">Explore posts</Link>
          {authStatus && <Link to="/add-post" className="btn-secondary">Write a post</Link>}
        </div>
            </div>
    </section>
 )
 return(
        <div className="page-enter w-full flex-1 py-12 md:py-16">
        <Container>
            {hero}
            {/* UI-TODO: Initial post loading cannot show a skeleton without a loading flag from the existing data flow. */}
            {posts.length === 0 ? (
                <div className="mt-12">
                    <EmptyState title="Login to read posts" description="Sign in to explore the stories shared by the MegaBlog community.">
                        <Link to={authStatus ? "/add-post" : "/login"} className="btn-primary">
                            {authStatus ? "Write a post" : "Sign in"}
                        </Link>
                    </EmptyState>
                </div>
            ) : (
                        <section className="defer-render mt-16 md:mt-20" aria-labelledby="latest-posts-heading">
                        <div className="mb-6 flex items-end justify-between gap-4">
                            <div>
                                <p className="mb-2 text-sm font-semibold text-(--primary)">Fresh from the community</p>
                                <h2 id="latest-posts-heading" className="text-2xl font-bold text-(--text-h)">Latest posts</h2>
                            </div>
                            <Link to="/all-posts" className="hidden text-sm font-semibold text-(--primary) hover:underline sm:inline-flex">View all posts</Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                        </section>
            )}
        </Container>
    </div>
 )
}

export default Home