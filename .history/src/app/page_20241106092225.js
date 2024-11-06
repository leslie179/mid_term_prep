"use client"; // Next.js directive to run this component on the client side

import { useState } from "react"; // Importing useState to manage component state in React

export default function Home() { // Defines the main functional component, Home
  const [artworks, setArtworks] = useState(null); // State to store fetched artwork data, initially null
  const [loading, setLoading] = useState(false); // State to track loading status, initially false

  // Asynchronous function to fetch artworks from the Art Institute API
  async function fetchArtworks() {
    setLoading(true); // Start the loading indicator by setting loading to true
    const API_URL = "https://api.artic.edu/api/v1/artworks?limit=5"; // API endpoint to get 5 artwork items
    const response = await fetch(API_URL); // Sends a GET request to the API
    const data = await response.json(); // Parses the API response to JSON format
    setArtworks(data.data); // Updates the artworks state with the data array evneloped in data arra
    setLoading(false); // Ends the loading indicator by setting loading to false
  }

  // Header component with a title and button to trigger the fetch function
  const Header = () => (
    <header>
      <h1>Art Institute of Chicago Artworks</h1> // Displays the title of the page
      <button
        disabled={loading} // Disables the button while loading is true, preventing multiple requests
        className="border-2 border-black p-2" // Styling for the button
        onClick={fetchArtworks} // Triggers the fetchArtworks function when clicked
      >
        Fetch Artworks
      </button>
    </header>
  );

  // Component to display artworks data or a loading message based on state
  const ArtworksDisplay = () => {
    if (loading) {
      return <section>Loading...</section>; // Displays a loading message if data is being fetched
    }

    if (artworks) { // Only renders if artworks data exists (i.e., has been fetched)
      const artworksList = []; // Array to hold each artwork component
      artworks.forEach((artwork, i) => { // Iterates over each artwork item in the artworks array
        // Constructs the image URL using the `image_id` provided in the API response
        const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
        artworksList.push(
          <article key={i} className="artwork-article"> // Creates an article element for each artwork
            <img src={imageUrl} alt={artwork.title} className="artwork-image" /> // Displays artwork image using constructed URL
            <h2>{artwork.title}</h2> // Displays the artwork's title
            <p className="label">Artist:</p> {artwork.artist_display} // Displays the artist's name
            <p className="label">Date:</p> {artwork.date_display} // Displays the date of creation
            <hr /> // Adds a horizontal line between artworks for separation
          </article>
        );
      });
      return <section className="artworks-section">{artworksList}</section>; // Renders the list of artwork items
    }

    return <section>No artworks have been fetched</section>; // Default message if no artworks are loaded
  };

  return (
    <div className="container"> // Main container for the component, used for styling
      <Header /> // Renders the Header component
      <ArtworksDisplay /> // Renders the ArtworksDisplay component
    </div>
  );
}
