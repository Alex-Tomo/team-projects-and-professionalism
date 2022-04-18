import {Bar} from "react-chartjs-2";
import React from "react";

/**
 * Student chart
 * @author Titas Sriubas, W19001588
 */

const MyStudentsChart = (props) => {

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
        label: "Actual Score",
        data: [
          (props.myStudents.lessons[0].actual_score !== null) ? props.myStudents.lessons[0].actual_score : 0,
          (props.myStudents.lessons[1].actual_score !== null) ? props.myStudents.lessons[1].actual_score : 0,
          (props.myStudents.lessons[2].actual_score !== null) ? props.myStudents.lessons[2].actual_score : 0,
          (props.myStudents.lessons[3].actual_score !== null) ? props.myStudents.lessons[3].actual_score : 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderWidth: 1,
      },
      {
        label: "Potential Score",
        data: [
          (props.myStudents.lessons[0].possible_score !== null) ? props.myStudents.lessons[0].possible_score : 0,
          (props.myStudents.lessons[1].possible_score !== null) ? props.myStudents.lessons[1].possible_score : 0,
          (props.myStudents.lessons[2].possible_score !== null) ? props.myStudents.lessons[2].possible_score : 0,
          (props.myStudents.lessons[3].possible_score !== null) ? props.myStudents.lessons[3].possible_score : 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
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
      <Bar
          height={400}
          width={600}
          options={options}
          data={data}
      />
  )
}

export default MyStudentsChart