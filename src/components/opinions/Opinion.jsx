import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Opinion({ opinion }) {
    const { user } = useContext(UserContext);

    const handleDelete = async (commentId) => {
        console.log("aa");
    };

    return (
        <div className="bg-white p-4 mb-4 shadow-md rounded-md">
            <h4 className="text-xl font-semibold mb-2">Autor: {opinion.author}</h4>
            <p className="text-gray-700 mb-4">Treść: {opinion.comment}</p>
            {user && user.admin && (
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Usuń
                </button>
            )}
        </div>
    );
}

export default Opinion;
