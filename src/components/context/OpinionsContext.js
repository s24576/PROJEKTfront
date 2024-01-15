import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const OpinionsContext = React.createContext();

export const OpinionsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [average, setAverage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllComments = async (id) => {
        try {
            const response = await axios.get("http://localhost:3001/api/opinion/all", {
                params: { itemId: id },
            });
            setComments(response.data.opinions);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while fetching comments.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchAllRatings = async (id) => {
        try {
            const response = await axios.get("http://localhost:3001/api/opinion/allRatings", {
                params: { itemId: id },
            });
            setRatings(response.data.ratings);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while fetching ratings.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchAverage = async (id) => {
        try {
            const response = await axios.get("http://localhost:3001/api/opinion/average", {
                params: { itemId: id },
            });
            setAverage(response.data.average);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred while fetching the average.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <OpinionsContext.Provider value={{
            comments, setComments, fetchAllComments,
            ratings, setRatings, fetchAllRatings,
            average, setAverage, fetchAverage,
            loading, setLoading,
            error, setError,
        }}>
            {children}
        </OpinionsContext.Provider>
    );
};
