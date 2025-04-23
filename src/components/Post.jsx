import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Post.css';
import { supabase } from '../client';

// post object type
// post = {
//     id: number,
//     title: string,
//     content: string,
//     image_url: string,
//     created_at: string,
//     num_likes: number,
// }

const Post = ({post}) => {
    const navigate = useNavigate();
    const redirectPostDetails = () => {
        navigate(`/details/${post.id}`); // Navigate to the post details page
    };

    return (
        <div className="content-box" onClick={redirectPostDetails}>
            <h2 className="text-black">{post.title}</h2>
            <p className="text-black">{new Date(post.created_at).toLocaleString()}</p>
            <p className="text-black">{post.num_likes} Upvotes</p>
        </div>
    );
}

export default Post;