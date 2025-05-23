import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const initialItems = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

function App() {
  const [mainList, setMainList] = useState(initialItems);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const timeouts = useRef({});

  const handleClickMain = (item, index) => {
    const newList = [...mainList];
    newList.splice(index, 1);
    setMainList(newList);

    if (item.type === "Fruit") {
      setFruits((prev) => [...prev, item]);
      setAutoReturn(item, "Fruit");
    } else {
      setVegetables((prev) => [...prev, item]);
      setAutoReturn(item, "Vegetable");
    }
  };

  const setAutoReturn = (item, type) => {
    const id = setTimeout(() => {
      if (type === "Fruit") {
        setFruits((prev) => prev.filter((i) => i !== item));
      } else {
        setVegetables((prev) => prev.filter((i) => i !== item));
      }
      setMainList((prev) => [...prev, item]);
    }, 5000);
    timeouts.current[item.name] = id;
  };

  const handleClickType = (item, type) => {
    clearTimeout(timeouts.current[item.name]);
    if (type === "Fruit") {
      setFruits((prev) => prev.filter((i) => i !== item));
    } else {
      setVegetables((prev) => prev.filter((i) => i !== item));
    }
    setMainList((prev) => [...prev, item]);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">🍽️ Auto Delete Todo List</h2>
      <div className="row">
        <div className="col-md-4">
          <h5>Main List</h5>
          {mainList.map((item, i) => (
            <button
              key={i}
              className="btn btn-outline-primary w-100 mb-2"
              onClick={() => handleClickMain(item, i)}
            >
              {item.name} ({item.type})
            </button>
          ))}
        </div>
        <div className="col-md-4">
          <h5>Fruit</h5>
          {fruits.map((item, i) => (
            <button
              key={i}
              className="btn btn-warning w-100 mb-2"
              onClick={() => handleClickType(item, "Fruit")}
            >
              🍎 {item.name}
            </button>
          ))}
        </div>
        <div className="col-md-4">
          <h5>Vegetable</h5>
          {vegetables.map((item, i) => (
            <button
              key={i}
              className="btn btn-success w-100 mb-2"
              onClick={() => handleClickType(item, "Vegetable")}
            >
              🥦 {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
