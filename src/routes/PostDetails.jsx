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
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
            const fetchPostAndComments = async () => {
                const { data: postData, error: postError } = await supabase
                    .from('Posts')
                    .select('*')
                    .eq('id', id)
                    .single(); // Fetch a single post by ID
    
                if (postError) {
                    console.error('Error fetching post:', postError);
                } else {
                    setPost(postData);
                    setLikeCount(postData.num_likes);
                    console.log('Post fetched:', postData);
                }
    
                const { data: commentsData, error: commentsError } = await supabase
                    .from('Comments')
                    .select('*')
                    .eq('post_id', id); // Fetch comments for the post
                
                if (commentsError) {
                    console.error('Error fetching comments:', commentsError);
                } else {
                    setComments(commentsData);
                    console.log('Comments fetched:', commentsData);
                }
                setLoading(false);
            };
    
            fetchPostAndComments();
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

    const handleCommentSubmit = async () => {
        const { data, error } = await supabase
            .from('Comments')
            .insert([{ comment, post_id: id }]);

        if (error) {
            console.error('Error adding comment:', error);
        } else {
            console.log('Comment added successfully:');
            setComments([...comments, { comment }]);
            setComment('');
        }
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
                            <div 
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={handleLike} 
                                className="inner-icon-box"
                            >
                                <ThumbsUp 
                                    fillColor={isHovered ? "#7ee8c3" : "none"}
                                    className="icon"
                                />
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
                    <div className="comments-section">
                        <h3>Comments</h3>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.comment} className="comment">
                                    <p className="text-black">{comment.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                        />
                        <button onClick={handleCommentSubmit} className="comment-button">Add Comment</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetails;