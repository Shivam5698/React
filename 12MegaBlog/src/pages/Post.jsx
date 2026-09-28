import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="page-enter w-full flex-1 py-12 md:py-16">
            <Container>
                <article className="mx-auto w-full max-w-4xl">
                {isAuthor && (
                    <div className="danger-toolbar mb-6 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-2xl p-1.5">
                        <>
                            <Link to={`/edit-post/${post.$id}`} className="btn-secondary h-11 px-4">
                                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16Z" /><path d="M13.5 6.5 17.5 10.5" /></svg>
                                Edit
                            </Link>
                            <button type="button" className="btn-danger-soft h-11 px-4" onClick={deletePost}>
                                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16m-10 4v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
                                Delete
                            </button>
                        </>
                    </div>
                )}
                <div className="relative mb-10 aspect-[16/9] max-h-[28rem] overflow-hidden rounded-3xl border border-(--border) bg-(--surface) p-1.5 shadow-lg shadow-slate-950/5">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="size-full rounded-[1.35rem] object-cover"
                    />
                </div>
                <div className="mb-8 w-full">
                    <h1 className="text-4xl font-bold leading-tight text-(--text-h) sm:text-5xl">{post.title}</h1>
                </div>
                <div className="prose-content mx-auto max-w-prose">
                    {parse(post.content)}
                </div>
                </article>
            </Container>
        </div>
    ) : null;
}