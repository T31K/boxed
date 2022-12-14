import { useState, useEffect } from "react";
import TableBase from "./components/TableBase";
import axios from "axios";
import { tableHeaders } from "./helpers/tableHeaders";
import "./App.css";

function App() {
  const [resource, setResource] = useState([]);
  const [headers, setHeaders] = useState(tableHeaders);
  const [count, setCount] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [pageCount]);

  const fetchData = async () => {
    setIsLoading(true);
    const base_url = "https://swapi.dev/api/people";
    const { data } = await axios.get(`${base_url}?page=${pageCount}`);
    if (data) {
      let { results, next, count } = data;
      setResource(results);
      setCount(count);
      setTimeout(() => {
        setIsLoading(false);
      }, 1250);
    }
  };

  return (
    <div className="App">
      <TableBase
        title="Star Wars"
        resource={resource}
        minLoadingItems={8}
        isLoading={isLoading}
        headers={headers}
        count={count}
        limitPerPage="10"
        prevPage={() => setPageCount(pageCount - 1)}
        nextPage={() => setPageCount(pageCount + 1)}
      />
    </div>
  );
}

export default App;
