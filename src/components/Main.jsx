import React, { useContext, useState, useEffect } from "react";
import ItemCard from "./items/ItemCard";
import { ItemsContext } from "./context/ItemsContext";
import { SortContext } from "./context/SortContext";
import SortForm from "./sort/SortForm";
import axios from "axios";
import '../styles/mainComponent.css';

const validateNumber = (input) => {
  return isFinite(input);
};

function Main() {
  const { items, setItems, fetchData, loading, error } = useContext(ItemsContext);
  const [sortedItems, setSortedItems] = useState([]);
  const {minPrice, setMinPrice} = useContext(SortContext);
  const {maxPrice, setMaxPrice} = useContext(SortContext);
  const {category, setCategory} = useContext(SortContext);
  const {allCategories, setAllCategories} = useContext(SortContext);
  const {orderBy, setOrderBy} = useContext(SortContext);
  const {sortOrder, setSortOrder} = useContext(SortContext);

  useEffect(()=>{
    fetchData();
  }, [setItems]);

  const handleSort = async (e) => {
    e.preventDefault();
    
    if(
      !validateNumber(minPrice) ||
      !validateNumber(maxPrice) ||
      (parseFloat(maxPrice) < parseFloat(minPrice) && parseFloat(maxPrice) !== 0) ||
      parseFloat(maxPrice) < 0
    ){
      console.log("Błąd w min albo max");
      return;
    }

    if(minPrice===0 && maxPrice===0 && category==='' && orderBy==='' && sortOrder==='desc'){
      fetchData();
    }

    try{
      console.log(minPrice);
      const response = await axios.get('http://localhost:3001/api/item/sort',{
      params: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        category: category,
        orderBy: orderBy,
        sortOrder: sortOrder,
      }});

      console.log(response.data.items)
      setSortedItems(response.data.items);

    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
      <div className="itemCards-container">
      <SortForm handleSort={handleSort} />
        {sortedItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
  );
}

export default Main;