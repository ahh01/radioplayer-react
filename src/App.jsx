import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import Stations from "./components/Stations.jsx";

const App = () => {
  const [station, setStation] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.sr.se/api/v2/channels?format=json&size=100"
        );
        const data = await response.json();
        setStation(data.channels);
        setFilteredStations(data.channels);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = station.filter((station) =>
      station.name.toLowerCase().includes(term)
    );
    setFilteredStations(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search stations"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <Skeleton count={5} height={100} />
      ) : (
        <div>
          {filteredStations.map((station) => (
            <Stations key={station.id} {...station} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
