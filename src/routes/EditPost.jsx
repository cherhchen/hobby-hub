import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router";
import './CreatePost.css'

const EditPost = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: '',
    });

    useEffect(() => {
        const fetchPost = async () => {
            const {data, error} = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching data:', error);
            } else if (data) {
                console.log('Data fetched successfully:', data);
                setFormData(data);
            } else {
                console.log('No data found with that ID.');
            }
        }
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log('Post Updated:', formData);
        const { data, error } = await supabase
            .from("Posts")
            .update(formData)
            .eq("id", id);
        if (error) {
            console.error('Error fetching data:', error);
        } else if (data) {
            console.log('Data fetched successfully:', data);
            setFormData(data);
        } else {
            console.log('No data found with that ID.');
        }
        console.log(data, error)
        alert("Post updated!");
    };

    return (
        <div>
            <NavBar isHome={false}/>
            <div className="main-content">
                <h1>Edit Post</h1>
                <div className="create-post-form" onSubmit={handleUpdate}>
                    <form>
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter post title"
                            required
                        />
                        
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Enter your post content (optional)"
                            rows="6"
                        />

                        <label htmlFor="image_url">Image URL</label>
                        <input
                            type="url"
                            id="image_url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            placeholder="Enter image URL (optional)"
                        />

                        <button type="submit">Update Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPost;