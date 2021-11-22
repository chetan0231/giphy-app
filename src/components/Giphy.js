import React, { useEffect, useState } from "react";
import SecureAxios from "../config/SecureAxios";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import PaginationBar from "./PaginationBar";

const style = {
  divProps: {
    float: "left",
    margin: "2px",
  },
};

function Giphy() {
  const [data, setData] = useState([]);
  const [newGifs,setNewGifs] = useState([])
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const [flag,setFlag] = useState(false)
  const runningItems = data.slice(firstItem, lastItem);
  const length_of_items = flag ? newGifs.length : data.length 
  const searchItems = newGifs.slice(firstItem,lastItem)

  useEffect(() => {
    const getData = async () => {
      try {
        const results = await SecureAxios.get("/trending", {
          params: {
            api_key: "TZ0IHXR1tUbtta3BHmeaivzUWSFtXvsO",
            limit: 100,
          },
        });
        console.log(results);
        setData(results.data.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    getData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchData = data.filter((item) => item.title.includes(search));
    setNewGifs(searchData)
    setFlag(true)
    console.log(searchData, "seads");
    console.log(data, "new");
    console.log(flag,'flag')
  };

  const pageSelected = (PageNo) => {
    setCurrentPage(PageNo);
  };
  console.log(length_of_items,'len')
  return (
    <div className="m-2">
      <InputGroup className="mb-3">
        <FormControl
          value={search}
          placeholder="Search"
          aria-label="Search_gifs"
          aria-describedby="basic-addon2"
          onChange={handleSearchChange}
        />
        <Button variant="secondary" id="button-addon2" onClick={handleSubmit}>
          Search
        </Button>
      </InputGroup>
      <div>
        <PaginationBar
          pageSelected={pageSelected}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={length_of_items}
        />
      </div>
      {flag ?
          searchItems.map((item, ind) => {
            return (
              <div style={style.divProps} key={ind} className="gif">
                <img src={item.images.fixed_height.url} alt={item.title} />
              </div>
            );
          }):
          runningItems.map((item, ind) => {
          return (
            <div style={style.divProps} key={ind} className="gif">
              <img src={item.images.fixed_height.url} alt={item.title} />
            </div>
          );
      })}
    </div>
  );
}

export default Giphy;
