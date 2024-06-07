import React,{useEffect, useState} from 'react'
import Service from "../appwrite/config";
import PostForm from "../components/post-form/PostForm";
import  Container  from "../components/container/Container";
import { useNavigate,useParams } from 'react-router-dom';


export const EditPost = () => {
const [post, setPosts] = useState(null)
const {slug} = useParams()
const navigate = useNavigate()

useEffect(() => {
    if (slug) {
        Service.getPost(slug).then((post) => {
            if (post) {
                setPosts(post)
            }
        })
    } else {
        navigate('/')
    }

}, [slug,navigate])



  return (
    post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
  )
}
