import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Post from './components/Post'
import { supabase } from './client'

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('created_at'); 

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase
        .from('Posts')
        .select('*')
        .order(orderBy, { ascending: false });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        console.log('Posts fetched:', data);
        setPosts(data);
      }
    };

    fetchPosts();
  }, [searchTerm, orderBy]);

  return (
    <div>
      <NavBar isHome={true} setSearchTerm={setSearchTerm}/>
      <div className="main-content">
        <div className="order-buttons">
          <p>Order By: </p>
          <button 
            onClick={() => setOrderBy('num_likes')}
            className={orderBy == 'num_likes' ? 'order-button-selected' : 'order-button'}
          >
            Popular
          </button>
          <button 
            onClick={() => setOrderBy('created_at')}
            className={orderBy == 'created_at' ? 'order-button-selected' : 'order-button'}
          >
            Latest
          </button>
        </div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <p>Create the first post!</p>
        )}
      </div>
    </div>
  )
}

export default App
