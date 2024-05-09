import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import * as XLSX from 'xlsx';
import "./table.scss";

const List = () => {
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDish, setSelectedDish] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (formData.length === 0) {
      axios
        .get('http://localhost:9090/api/displaysellingreport')
        .then((response) => {
          setFormData(response.data);
          setFilteredData(response.data.slice(-10));
        })
        .catch((error) => {
          setError(error.message);
          console.error('Error fetching data:', error);
        });
    }
  }, [formData.length]);


  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    filterData(selectedMonth, selectedDish);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    filterData(selectedMonth, selectedDate); // Pass selectedDate instead of selectedDish
  };
  

  const handleDishChange = (event) => {
    const selectedDish = event.target.value;
    setSelectedDish(selectedDish);
    filterData(selectedMonth, selectedDish);
  };

  const [totalcost, setTotalCost] = useState(0); // State for storing the total cost

const filterData = (month, date, dish) => {
  let filtered = formData;
  if (month) {
    filtered = filtered.filter(
      (item) => moment(item.lastUpdate).format('MM') === month
    );
  }
  if (date) {
    filtered = filtered.filter(
      (item) => moment(item.lastUpdate).format('YYYY-MM-DD') === date
    );
  }

  if (dish) {
    filtered = filtered.filter((item) =>
      item.dishes.toLowerCase().includes(dish.toLowerCase())
    );
  }

  // Calculate the sum of the cost column for the filtered data
  const sumOfCost = filtered.reduce((total, item) => total + item.cost, 0);

  // Update the state with the filtered data and the sum of cost
  setFilteredData(filtered);
  setTotalCost(sumOfCost); // Update the totalCost state with the calculated sum
};

  
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SellingReports');
    XLSX.writeFile(workbook, 'SellingReports.xlsx');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }



  const totalCost = filteredData.reduce((total, user) => total + user.cost, 0);

    return(
        <div className="sellingreport-container">
        <div style={{display: "flex"}}>
        <div>
        </div>
        
        </div>
         <br/>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>S.NO.</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Address</th>
                    <th>Dishes</th>
                    <th>Cost</th>
                    <th>Date & Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredData.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td> 
                                <td>{user.id} </td>
                                <td>{user.name}</td>
                                <td>{user.number} </td>
                                <td>{user.address}</td>
                                <td>{user.dishes}</td>
                                <td>{user.cost}</td>
                                <td>{moment(user.lastUpdate).format('YYYY-MM-DD HH:mm:ss')}</td> {/* Format date using Moment.js */}
                            </tr>
                        )
                    })
                }
          <tr>
            <td colSpan="5"></td>
            <td>Total Cost:</td>
            <td>{totalCost}</td>
            <td></td>
          </tr>
            </tbody>
        </table>

        </div>
    );
};
  
export default List;

