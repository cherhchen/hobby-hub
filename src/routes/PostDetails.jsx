import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router';
import NavBar from '../components/NavBar';
import './PostDetails.css';
import ThumbsUp from '../assets/ThumbsUp';

const PostDetails = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const navigate = useNavigate();
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

    const redirectHome = () => {
        navigate("/"); // Navigate to the post details page
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("Posts")
            .delete()
            .eq("id", id);
        console.log(data, error);
        alert("Post deleted!");
        redirectHome();
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
                <div className="post-details-box">
                    <h2 className="text-black">{post.title}</h2>
                    <p className="text-black">{new Date(post.created_at).toLocaleString()}</p>
                    {post.content && <p className="text-black">{post.content}</p>}
                    {post.image_url && <img src={post.image_url} alt="Post" className="post-image" />}
                    <div className="icon-button-container">
                        <div className="icon-container">
                            <div onClick={handleLike} className="inner-icon-box">
                                <ThumbsUp fillColor="none" className="icon"/>
                            </div>
                            <p className="text-black">{likeCount} Upvotes</p>
                        </div>
                        <div className="button-container">
                            <Link to={`../edit/${id}`}>
                                <button >Edit</button>
                            </Link>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                    <div>
                        <h3>Comments</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetails;