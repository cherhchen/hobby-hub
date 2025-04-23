import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { supabase } from '../client';
import NavBar from '../components/NavBar';

const PostDetails = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single(); // Fetch a single post by ID

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
                setLikeCount(data.num_likes);
                console.log('Post fetched:', data);
            }
            setLoading(false);
        };

        fetchPost();
    }, [id]);
    
    const handleLike = async () => {
        supabase
            .from('Posts')
            .update({ num_likes: post.num_likes + 1 })
            .eq('id', post.id)
            .then(({ data, error }) => {
                if (error) {
                    console.error('Error liking post:', error);
                } else {
                    console.log('Post liked successfully:', data);
                    setLikeCount(likeCount + 1);
                }
            });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return <p>Post not found.</p>;
    }

    return (
        <div>
            <NavBar isHome={false}/>
            <div className="main-content">
                <h2 className="text-black">{post.title}</h2>
                {post.content && <p className="text-black">{post.content}</p>}
                {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}
                <p className="text-black">{new Date(post.created_at).toLocaleString()}</p>
                <button className="like-button" onClick={handleLike}>
                    Like
                </button>
                <p className="text-black">number of likes: {likeCount}</p>
            </div>
        </div>
    );
}

export default PostDetails;