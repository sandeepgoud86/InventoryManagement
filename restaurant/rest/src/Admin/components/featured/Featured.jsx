import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'; 

const Featured = () => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/displaysellingreport');
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (filteredData.length === 0) {
      fetchData();
    }
  }, [filteredData.length]);

  const calculateLastWeekRevenue = () => {
    const startDate = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
    const endDate = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');

    const lastWeekData = filteredData.filter(
      (item) => moment(item.lastUpdate).isBetween(startDate, endDate, null, '[]')
    );

    return lastWeekData.reduce((total, item) => total + item.cost, 0);
  };

  const calculateLastMonthRevenue = () => {
    const startDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    const endDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');

    const lastMonthData = filteredData.filter(
      (item) => moment(item.lastUpdate).isBetween(startDate, endDate, null, '[]')
    );

    return lastMonthData.reduce((total, item) => total + item.cost, 0);
  };

  const calculateTotalSalesToday = () => {
    const today = moment().format('YYYY-MM-DD');

    const todaySales = filteredData.filter(
      (item) => moment(item.lastUpdate).isSame(today, 'day')
    );

    return todaySales.reduce((total, item) => total + item.cost, 0);
  };

  const totalSalesToday = calculateTotalSalesToday();
  const targetSales = 10000; // Example target sales for today

  const percentage = Math.min((totalSalesToday / targetSales) * 100, 100).toFixed(1); // Ensure the percentage does not exceed 100%

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        {/* <MoreVertIcon fontSize="small" /> */}
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount" style={{color: "blue", fontWeight: "bolder"}}>{totalSalesToday} Rs/-</p>
        
        <h4>Last Week Revenue: {calculateLastWeekRevenue()} Rs/-</h4>
        <h4>Last Month Revenue: {calculateLastMonthRevenue()}</h4>
      </div>
    </div>
  );
};

export default Featured;
