import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const ShippingChart = () => {
  const [shippingData, setShippingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/order/allShipping");
        setShippingData(response.data.shippingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (!shippingData) return null;

    return {
      labels: shippingData.map(item => item.name),
      datasets: [
        {
          label: "Wykres wysyłek",
          data: shippingData.map(item => item.count),
          backgroundColor: ['#FF6384', '#36A2EB'],
        }
      ]
    };
  }, [shippingData]);

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold">Wykres wysyłek</h2>
      <div className="flex justify-center items-start" style={{ height: '300px', marginLeft: '-350px'}}>
        {chartData ? (
          <>
            <canvas id="myCanvas"></canvas>
            <Pie data={chartData} options={options} />
          </>
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
}

export default ShippingChart;
