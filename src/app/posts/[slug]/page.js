'use client'
import { useParams } from "next/navigation"
const PostDetails = () =>{
    const router =useParams()
    const slug = router.slug
    return (
        <div>
            <h1>Post Details</h1>
            <p>Details about the post {slug} will be displayed here.</p>
        </div>
    )
}

export default PostDetails