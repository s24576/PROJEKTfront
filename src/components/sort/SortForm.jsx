import React, { useContext, useRef, useEffect } from "react";
import { SortContext } from "../context/SortContext";

function SortForm({ handleSort }) {
  const {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    category,
    setCategory,
    orderBy,
    setOrderBy,
    sortOrder,
    setSortOrder,
  } = useContext(SortContext);
  const { allCategories } = useContext(SortContext);
  const minPriceInputRef = useRef(null);

  useEffect(() => {
    minPriceInputRef.current.focus();
  }, []);

  return (
    <div className="sortForm p-4 border rounded-md shadow-md mb-4">
      <form onSubmit={handleSort} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="minPrice" className="mb-1">
            Minimalna cena:
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            ref={minPriceInputRef}
            className="p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="mb-1">
            Maksymalna cena:
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1">
            Kategoria:
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Wybierz kategorię</option>
            {allCategories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="orderBy" className="mb-1">
            Sortuj:
          </label>
          <select
            id="orderBy"
            name="orderBy"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="date">Data dodania</option>
            <option value="average">Średnia ocena</option>
            <option value="price">Cena</option>
          </select>
        </div>

        <div className="space-x-4">
          <label>
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={() => setSortOrder("desc")}
            />
            Malejąco
          </label>

          <label>
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={() => setSortOrder("asc")}
            />
            Rosnąco
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sortuj
        </button>
      </form>
    </div>
  );
}

export default SortForm;
