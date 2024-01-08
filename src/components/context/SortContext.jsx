import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const SortContext = React.createContext();

export const SortProvider = ({children}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    const [orderBy, setOrderBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(()=>{
        const fetchCategories = async () => {
            try{
                const response = await axios.get("http://localhost:3001/api/item/allCategories");
                setAllCategories(response.data.categories);
            }
            catch (error) {
                if (error.response) {
                    console.log(error);
                }
            }
        }

        fetchCategories();
    }, [])

    return(
        <SortContext.Provider value={{
            minPrice, setMinPrice,
            maxPrice, setMaxPrice,
            category, setCategory,
            allCategories, setAllCategories,
            orderBy, setOrderBy,
            sortOrder, setSortOrder,
        }}>
            {children}
        </SortContext.Provider>
    )
}