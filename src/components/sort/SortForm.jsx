import React, { useContext } from "react";
import { SortContext } from "../context/SortContext";

function SortForm({ handleSort }) {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice, category, setCategory, orderBy, setOrderBy, sortOrder, setSortOrder } = useContext(SortContext);
  const { allCategories } = useContext(SortContext);
  return (
    <div className="sortForm">
        <form onSubmit={handleSort}>
            <label htmlFor="minPrice">Minimalna cena: </label>
            <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <br/>

            <label htmlFor="maxPrice">Maksymalna cena: </label>
            <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <br/>

            <label htmlFor="category">Kategoria: </label>
            <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Wybierz kategorię</option>
                {allCategories.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                    {categoryOption}
                </option>
                ))}
            </select>
            <br/>
                    
            <label htmlFor="orderBy">Sortuj: </label>
            <select
                id="orderBy"
                name="orderBy"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
            >
                <option value="date">Data dodania</option>
                <option value="average">Średnia ocena</option>
                <option value="price">Cena</option>
            </select>
            <br/>
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
            <br/>
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
            <br/>
            <button type="submit">Sortuj</button>
        </form>
    </div>
    
  );
}

export default SortForm;
