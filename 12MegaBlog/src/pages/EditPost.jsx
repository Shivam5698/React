import {useEffect,useState} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post,setPosts]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div className='page-enter w-full flex-1 py-12 md:py-16'>
        <Container>
            <header className="mb-8">
                <p className="mb-2 text-sm font-semibold text-(--primary)">Creator studio</p>
                <h1 className="text-3xl font-bold text-(--text-h)">Edit post</h1>
                <p className="mt-3 text-(--text-muted)">Refine your story and update its details.</p>
            </header>
            <PostForm post={post}/>
        </Container>

    </div>
  ): null
    
}

export default EditPost