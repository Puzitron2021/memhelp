import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem"
import Content from "./Content";
import Footer from "./Footer";
import apiRequest from "./apiRequest";
import { useState, useEffect } from "react";
import useWindowSize from "./hooks/useWindowSize";
import Counter from "./Counter";

function App() {
  // const API_URL = "http://localhost:3500/items";
  const API_URL = "http://" + process.env.REACT_APP_API_IP + ":3500/items";
  const LOADING_TIME = 0;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(
    () => {
      const fetchItems = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw Error(`Did not receive expected data`);
          const listItems = await response.json();
          setItems(listItems);
          setFetchError(null);
        } catch (error) {
          setFetchError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      setTimeout(() => {
        (async () => await fetchItems())();
      }, LOADING_TIME);
    }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? {
      ...item,
      checked: !item.checked
    } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE"
    }
    const reqURL = `${API_URL}/${id}`;
    const result = await apiRequest(reqURL, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem(''); // clear previous value
  }

  return (
    <div className="App">
      <Header title="MEMHELP" width={width} height={height}/>
      {/* <Counter /> */}
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading &&
          <Content
            items={
              items.filter(item => (
                (item.item).toLowerCase()).includes(search.toLowerCase())
              )
            }
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        }
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
