import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import ReactPaginate from 'react-js-pagination';
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
  const { sortedItems, setSortedItems } = useContext(SortContext);
  const { minPrice, setMinPrice } = useContext(SortContext);
  const { maxPrice, setMaxPrice } = useContext(SortContext);
  const { category, setCategory } = useContext(SortContext);
  const { allCategories, setAllCategories } = useContext(SortContext);
  const { orderBy, setOrderBy } = useContext(SortContext);
  const { sortOrder, setSortOrder } = useContext(SortContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useLayoutEffect(() => {
    fetchData();
  }, [setItems]);

  const handleSort = async (e) => {
    e.preventDefault();

    if (
      !validateNumber(minPrice) ||
      !validateNumber(maxPrice) ||
      (parseFloat(maxPrice) < parseFloat(minPrice) && parseFloat(maxPrice) !== 0) ||
      parseFloat(maxPrice) < 0
    ) {
      return;
    }

    if (minPrice === 0 && maxPrice === 0 && category === '' && orderBy === '' && sortOrder === 'desc') {
      fetchData();
    }

    try {
      const response = await axios.get('http://localhost:3001/api/item/sort', {
        params: {
          minPrice: minPrice,
          maxPrice: maxPrice,
          category: category,
          orderBy: orderBy,
          sortOrder: sortOrder,
        },
      });

      setSortedItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-4">
      <SortForm handleSort={handleSort} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((item) => (
          <div key={item._id} className="flex justify-center mt-8">
            <ItemCard item={item} />
          </div>
        ))}
      </div>

      <ReactPaginate
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={sortedItems.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="inline-block mr-2"
        linkClass="text-gray-700 px-3 py-1 border rounded hover:bg-gray-200 no-underline bg-white"
      />

    </div>
  );
}

export default Main;
