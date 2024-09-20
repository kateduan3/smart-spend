// src/pages/UploadPage/UploadPage.js
import React, { useState } from 'react';
import './uploadpage.css';
import { parse } from 'papaparse';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [biggestEarning, setBiggestEarning] = useState(null);
  const [biggestSpending, setBiggestSpending] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalSpendings, setTotalSpendings] = useState(0);
  const [timeRange, setTimeRange] = useState({ start: null, end: null });

  const handleFileUpload = (event) => {
    setLoading(true);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result;
        parse(csvData, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            processCSVData(result.data);
          },
        });
      };
      reader.readAsText(file);
    }
  };

  const processCSVData = (rows) => {
    const monthlyData = {};
    let maxEarning = { date: '', amount: 0 };
    let maxSpending = { date: '', amount: 0 };
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let firstDate = null;
    let lastDate = null;

    rows.forEach((row) => {
      const [date, description, credit, debit] = row;
      let amount = 0;
      const isDeposit = row[3] !== '' && row[2] === ''; // If the row ends with ,,num (indicates deposit)
      const isWithdrawal = row[3] === '' && row[2] !== ''; // If the row ends with ,num, (indicates withdrawal)

      // Check if it's a deposit or a withdrawal
      if (isDeposit) {
        amount = parseFloat(debit);
        totalDeposits += amount; // Add to total deposits
      } else if (isWithdrawal) {
        amount = parseFloat(credit);
        totalWithdrawals += amount; // Add to total withdrawals
      }

      // Format the date into a comparable key
      const parsedDate = new Date(date);
      const monthKey = `${parsedDate.getFullYear()}-${parsedDate.getMonth() + 1}`;

      // Create an object entry for each unique monthKey
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { earning: 0, spending: 0 };
      }

      if (isDeposit) {
        monthlyData[monthKey].earning += amount;
        if (amount > maxEarning.amount) {
          maxEarning = { date, amount };
        }
      } else if (isWithdrawal) {
        monthlyData[monthKey].spending += amount;
        if (amount > maxSpending.amount) {
          maxSpending = { date, amount };
        }
      }

      // Determine the range of dates
      if (!firstDate || new Date(date) < new Date(firstDate)) {
        firstDate = date;
      }
      if (!lastDate || new Date(date) > new Date(lastDate)) {
        lastDate = date;
      }
    });

    setBiggestEarning(maxEarning);
    setBiggestSpending(maxSpending);
    setTotalEarnings(totalDeposits);
    setTotalSpendings(totalWithdrawals);
    setTimeRange({ start: firstDate, end: lastDate });

    // Prepare data for the chart with sorted month labels
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => new Date(a.split('-')[0], a.split('-')[1] - 1) - new Date(b.split('-')[0], b.split('-')[1] - 1));
    const earningsData = sortedMonths.map((month) => monthlyData[month].earning);
    const spendingsData = sortedMonths.map((month) => monthlyData[month].spending);

    // Format month names for display (e.g., "Jan 2024")
    const formattedLabels = sortedMonths.map((month) => {
      const [year, monthIndex] = month.split('-');
      const date = new Date(year, monthIndex - 1);
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    });

    const chartData = {
      labels: formattedLabels,
      datasets: [
        {
          label: 'Earnings',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: earningsData,
        },
        {
          label: 'Spendings',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: spendingsData,
        },
      ],
    };

    setChartData(chartData);
    setLoading(false);
  };

  return (
    <div className="upload-page">
      <h1>Upload CSV File for Analysis</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {loading && <div className="loading-bar">Processing...</div>}
      {chartData && (
        <>
          <div className="chart-container">
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="summary">
            {biggestEarning && (
              <p>
                The biggest deposit from {timeRange.start} to {timeRange.end} is {biggestEarning.amount} on {biggestEarning.date}.
              </p>
            )}
            {biggestSpending && (
              <p>
                The biggest withdrawal from {timeRange.start} to {timeRange.end} is {biggestSpending.amount} on {biggestSpending.date}.
              </p>
            )}
            <p style={{ color: 'green' }}>
              The total deposit from {timeRange.start} to {timeRange.end} is ${totalEarnings.toFixed(2)}.
            </p>
            <p style={{ color: 'red' }}>
              The total withdrawal from {timeRange.start} to {timeRange.end} is ${totalSpendings.toFixed(2)}.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default UploadPage;
