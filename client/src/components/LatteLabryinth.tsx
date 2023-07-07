import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPosts";
import FeaturedPost from "./FeaturedPost";
import coffee1image from "../images/coffee_1.png";
import gothicseating from "../images/gothic_seating_area.png";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import FilterFooter from "./FilterFooter";
import { IconButton } from "@mui/material";

interface CoffeeLocation {
  id: string; 
  title: string;
  description: string;
  image: string;
}

const sections = [
  { title: "Fair Traded Coffee", url: "https://www.fairtradeamerica.org/shop-fairtrade/fairtrade-products/coffee" },
  { title: "Vintage Coffee", url: "https://www.islandvintagecoffee.com/" },
  { title: "Green Coffee", url: "https://burmancoffee.com/green-coffee-beans" },
  { title: "Mature Coffee", url: "https://www.bonescoffee.com/" },
  { title: "Sun Grown Coffee", url: "https://goldstarcoffee.com/" },
];

const mainFeaturedPost = {
  title: "Lilith's Latte Labyrinth",
  description:
    "Welcome to Lilith's Latte Labyrinth, our mission is to provide users with a platform to discover hidden gems among local coffee shops, offering an alternative to popular chains such as Starbucks or Coffee Bean. The project aims to cater to individuals seeking the charm and authenticity of locally-owned and operated cafes. The vision is to create an entertaining experience that combines a spooky twist with a touch of classic elegance.",
  image: gothicseating,
  imageText: "main image description",
  linkText: "Continue reading...",
};

const featuredPosts = [
  {
    title: "Latte Labyrinth Cafe Quotes",
    date: "July 2023",
    description:
      "Words cannot espresso how much you bean to me. We are the perfect blend. I like you a latte. Bottomless thanks for visiting us. Hope you enjoy our site as much as a cup of good Joe, we made it espresso-ly for you.",
    image: coffee1image,
    imageLabel: "Image Text",
  },
  {
    title: "Latte Labyrinth Aesthetic",
    date: "July 2023",
    description:
      "Our Labyrinth Consists of A Victorian Goth Inspiration, featuring dark tones with neutral undertones. Our goal is to provide our users with an intriguing and mysterious ambiance, while providing a unique and captivating atmosphere.",
    image: coffee1image,
    imageLabel: "Image Text",
  },
  {
    title: "Perfect Blend",
    date: "July 2023",
    description:
      "Sending You A Whole Latte Love. Coffee, because anger management is too expensive. Listen, before my coffee... I did not know how awesome I was going to be today either.",
    image: coffee1image,
    imageLabel: "Image Text",
  },
];

const sidebar = {
  social: [
    { name: "GitHub", icon: GitHubIcon, link: "https://github.com/leisatrisler/Capstone_Project" } as SocialLink,
  ],
};

interface SocialLink {
  name: string;
  icon: React.ElementType;
  link: string;
}

const defaultTheme = createTheme();



const LatteLabyrinth: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CoffeeLocation[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/coffee-locations?query=${searchQuery}`);
      const data = await response.json();


      const transformedData = data.results.map((place: any) => ({
        id: place.fsq_id,
        title: place.name,
        description: place.location.formatted_address,
        image: place.categories[0]?.icon?.prefix + "88" + place.categories[0]?.icon?.suffix,
      }));

      setSearchResults(transformedData);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Homebrew" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Sidebar
              social={sidebar.social}
              archives={[]}
              description={""}
              title={""}
            />
          </Grid>
          <Grid container spacing={4} sx={{ mt: 5 }}>
            <Grid item xs={12} sm={6}>
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{ marginRight: "8px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {searchResults.map((result: CoffeeLocation) => (
              <Grid item xs={12} sm={6} md={4} key={result.id}>
                <Typography variant="body2">{result.title}</Typography>
                <Typography variant="body2">{result.description}</Typography>
              </Grid>
            ))}
          </Grid>
        </main>
        <FilterFooter
          title="Lilith's Latte Labyrinth"
          description="Thanks A Latte For Visiting Our Latte Labyrinth"
        />
      </Container>
    </ThemeProvider>
  );
};

export default LatteLabyrinth;