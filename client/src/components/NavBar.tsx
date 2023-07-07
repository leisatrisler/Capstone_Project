import { Link } from "react-router-dom";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const baseUrl = "https://api.foursquare.com/v3/places/search";
      const queryParams = new URLSearchParams({
        query: searchQuery,
      });
      const url = `${baseUrl}?${queryParams.toString()}`;

      const headers = {
        accept: "application/json",
        Authorization: "fsq3n3Ueb4SV9jBmr/+NdNy5QhutJaMrXZHItqZwdqZ6/IM=",
      };

      const response = await fetch(url, { headers });
      const data = await response.json();
      console.log("Search results:", data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <AppBar position="static" style={{ filter: 'grayscale(100%)' }}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/" edge="start" color="inherit" aria-label="Home">
            <HomeIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="inherit" component={Link} to="/" style={{ textDecoration: 'none', marginLeft: '8px' }}>
            Home
          </Typography>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            style={{ flexGrow: 1, marginRight: '8px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton color="inherit" aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/login" color="inherit" aria-label="Login">
            <LoginIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="inherit" component={Link} to="/login" style={{ textDecoration: 'none', marginLeft: '8px' }}>
            Login
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/register" color="inherit" aria-label="Register">
            <AssignmentIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="inherit" component={Link} to="/register" style={{ textDecoration: 'none', marginLeft: '8px' }}>
            Register
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/editprofile" color="inherit" aria-label="Edit Profile">
            <PersonIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="inherit" component={Link} to="/editprofile" style={{ textDecoration: 'none', marginLeft: '8px' }}>
            Edit Profile
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/createcoffee" color="inherit" aria-label="Create Coffee">
            <AddCircleIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="inherit" component={Link} to="/createcoffee" style={{ textDecoration: 'none', marginLeft: '8px' }}>
            Create Coffee
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to="/editcoffee" color="inherit" aria-label="Edit Coffee">
            <EditIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="inherit" component={Link} to="/editcoffee" style={{ textDecoration: 'none', marginLeft: '8px' }}>
            Edit Coffee
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
