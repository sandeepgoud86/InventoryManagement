import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Stats = () => {
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9090/api/displaysellingreport')
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (formData.length > 0) {
      createCharts();
    }
  }, [formData]);

  const createCharts = () => {
    const januaryData = formData.filter(item => moment(item.lastUpdate).format('MM') === '01');
    const daysInJanuary = Array.from({ length: 31 }, (_, i) => i + 1);
    
    daysInJanuary.forEach(day => {
      const dailyData = januaryData.filter(item => moment(item.lastUpdate).format('DD') === String(day));
      const totalCosts = {};

      dailyData.forEach(item => {
        if (!totalCosts[item.dishes]) {
          totalCosts[item.dishes] = item.cost;
        } else {
          totalCosts[item.dishes] += item.cost;
        }
      });

      renderChart(day, totalCosts);
    });
  };

  const renderChart = (day, data) => {
    const ctx = document.getElementById(`myChart${day}`);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: `Total Cost for ${moment().month(0).date(day).format('MMMM DD')}`,
          data: Object.values(data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 style={{marginLeft: "40%"}}>Stats for January</h2> <br/>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
          <div key={day} style={{ width: '300px', margin: '10px' }}>
            <canvas id={`myChart${day}`} width="300" height="300"></canvas>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
