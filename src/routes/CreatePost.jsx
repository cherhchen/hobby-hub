import NavBar from "../components/NavBar";
import { useState } from "react";
import './CreatePost.css'
import { supabase } from "../client";

const CreatePost = () => {
    const emptyPost = {
        title: "",
        content: "",
        image_url: "",
    };
    const [formData, setFormData] = useState({...emptyPost});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Post Created:', formData);
        // TODO: Send this data to your backend or state store
        const { data, error } = await supabase.from("Posts").insert(formData);
        if (error) {
            console.error('Error creating post:', error);
        } else {
            console.log('Post created successfully:', data);
            setFormData({...emptyPost});
        }
    };

    return (
        <div>
            <NavBar isHome={false}/>
            <div className="main-content">
                <h1>Create a New Post</h1>
                <div className="create-post-form" onSubmit={handleSubmit}>
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

                        <button type="submit">Create Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;