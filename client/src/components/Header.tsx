import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InputBase from '@mui/material/InputBase';

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections } = props;
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    fetch(`http://localhost:5000/coffee-locations?query=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <button className="light-dark-button btn btn-info btn-sm" value="Subscribe">
          <b>Subscribe</b>
        </button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
        </Typography>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <button className="light-dark-button btn btn-info btn-sm" value="Labryinth Locator">
          <b>Labryinth Locator</b>
        </button>{' '}
        |{' '}
        <button value="Latte Locator" className="light-dark-button btn btn-info btn-sm">
          <b>Latte Locator</b>
        </button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0, '&.white-text': { color: 'white' } }} 
            className="white-text" 
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
