import './NavBar.css'; // We'll create this file next

const NavBar = ({ isHome }) => {
  return (
    <nav className="navbar">
        <div className="logo">HobbyHub</div>
        <div className="search-bar">
            { isHome ??
                <input type="text" placeholder="Search..." />
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