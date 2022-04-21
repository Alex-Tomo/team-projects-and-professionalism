import {Pie} from "react-chartjs-2";
import React from "react";

/**
 * Chart of tests taken
 * @author Titas Sriubas, W19001588
 */

const TestsTakenChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: true
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels: ["Math", "English", "Verbal", "Non Verbal"],
    datasets: [
      {
        label: 'Total Tests Taken',
        data: [
          props.testsTaken.math,
          props.testsTaken.english,
          props.testsTaken.verbal,
          props.testsTaken.nonVerbal
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
      borderWidth: 1,
      }
    ],
  };

    return (
      <Pie
        height={400}
        width={600}
        options={options}
        data={data}
      />
    )
}

export default TestsTakenChart