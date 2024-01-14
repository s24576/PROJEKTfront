import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import ItemCard from "./items/ItemCard";
import { ItemsContext } from "./context/ItemsContext";
import { SortContext } from "./context/SortContext";
import SortForm from "./sort/SortForm";
import axios from "axios";


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

  useLayoutEffect(() => {
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
      return;
    }

    if(minPrice===0 && maxPrice===0 && category==='' && orderBy==='' && sortOrder==='desc'){
      fetchData();
    }

    try{

      const response = await axios.get('http://localhost:3001/api/item/sort',{
      params: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        category: category,
        orderBy: orderBy,
        sortOrder: sortOrder,
      }});

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
    <div className="container mx-auto p-4">
      <SortForm handleSort={handleSort} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedItems.map((item) => (
          <div key={item._id}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;