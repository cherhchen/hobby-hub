import './NavBar.css'; // We'll create this file next

const NavBar = ({ isHome, setSearchTerm }) => {
  return (
    <nav className="navbar">
        <a href="/">
          <div className="logo">AnimalHub</div>
        </a>
        <div className="search-bar">
            { isHome &&
                <input 
                  type="text" 
                  placeholder="Search..." 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            }
        </div>
        <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/create">Create New Post</a></li>
        </ul>
    </nav>
  );
};

export default NavBar;