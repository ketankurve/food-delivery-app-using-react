import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/Header";
import Cards from "./src/Cards";
import Categories from "./src/Categories";
import { useState, useEffect } from "react";
import { IMG1_URL, MAIN_URL } from "./utils/Links";

const App = () => {
  const [listOfRes, setlistOfRes] = useState([]);
  const [listOfCat, setListOfCat] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MAIN_URL);

    const json = await data.json();

    setlistOfRes(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants,
    );
    setFilterList(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants,
    );

    setListOfCat(json.data.cards[0].card.card.gridElements.infoWithStyle.info);

    console.log(json);
  };

  return (
    <div className="main-container">
      <Header />
      <div className="search">
        <input
          type="text"
          placeholder="Search for restaurants and food..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button
          onClick={() => {
            const filteredList = listOfRes.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase()),
            );

            setFilterList(filteredList);
          }}
        >
          Search
        </button>
      </div>

      <div className="cat-heading">
        <h1>What's on your mind?</h1>
      </div>

      <div className="cat-main-container">
        {listOfCat.map((category) => (
          <Categories key={category.id} category={category} />
        ))}
      </div>

      <div className="main-card-heading">
        <div className="card-heading">
          <h1>Top Restaurants</h1>
        </div>
        <div className="filter-btn">
          <button
            onClick={() => {
              const filteredList = listOfRes.filter(
                (res) => res.info.avgRating > 4,
              );
              // Update the state
              setFilterList(filteredList);
            }}
          >
            Top Restaurants
          </button>
        </div>
      </div>
      <div className="cards">
        {filterList.map((restaurant) => (
          <Cards key={restaurant.info.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
