import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SellingReport.css";
import moment from 'moment'; // Import Moment.js
import * as XLSX from 'xlsx';

const SellingReport = () => {
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDish, setSelectedDish] = useState('');
  const [error, setError] = useState(null);

  const [totalcost, setTotalCost] = useState(0); 


  useEffect(() => {
    if (formData.length === 0) {
      axios.get('http://localhost:9090/api/displaysellingreport')
        .then(response => {
          setFormData(response.data);
          setFilteredData(response.data); // Set filteredData initially to all data
        })
        .catch(error => {
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
    filterData(selectedMonth, selectedDate); 
  };
  

  const handleDishChange = (event) => {
    const selectedDish = event.target.value;
    setSelectedDish(selectedDish);
    filterData(selectedMonth, selectedDish);
  };

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
  
    const sumOfCost = filtered.reduce((total, item) => total + item.cost, 0);
  
    setFilteredData(filtered);
    setTotalCost(sumOfCost);
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
        <>
        

        <div className="sellingreport-container">
        <div style={{display: "flex"}}>
        <div>
        <h1 style={{paddingLeft: "235%", fontSize: "2rem", marginRight: "-450%", fontFamily: "cursive"}}>Selling report</h1>
        </div>
        
        </div>
        <div style={{display: "flex"}}>
        <div style={{marginLeft: "10%"}}>
        <label style={{fontSize: "1.5rem", fontFamily: "cursive"}}>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange} style={{width: "50%", height: "4vh", marginLeft: "2%"}}>
          <option value="">All</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div style={{marginLeft: "15%", marginTop: "1%", marginRight: "-50%"}}>
        <button onClick={exportToExcel} 
        style={{cursor: "pointer", backgroundColor: "lightskyblue"}}>Export to Excel</button>
        </div>
        <div style={{ marginLeft: "80%" }}>
        <label style={{ fontSize: "1.5rem" ,fontFamily: "cursive"}}>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ width: "50%", height: "4vh", marginLeft: "2%" }}
        />
      </div>
      {/* <div style={{marginLeft: "25%"}}>
        <label style={{fontSize: "1.5rem"}}>Select Dish:</label>
        <select value={selectedDish} onChange={handleDishChange} style={{width: "50%", height: "4vh", marginLeft: "2%"}}>
          <option value="">All</option>
          <option value="01">biryani</option>
          <option value="02">veg meals</option>
          <option value="03">veg biryani</option>
          <option value="04">chicken curry</option>
          <option value="05">pizza</option>
          <option value="06">burger</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div> */}
      </div> <br/>
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
                    <th>lastUpdate</th>
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
        </>
    );
};
  
export default SellingReport;

