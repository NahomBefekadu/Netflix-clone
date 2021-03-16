import React from "react";
import Banner from "../Banner/Banner";
import NavBar from "../NavBar/NavBar";
import "./HomeScreen.css";
import requests from "../../request";
import Row from "../Row/Row";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <NavBar />

      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Action Movies" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default HomeScreen;
