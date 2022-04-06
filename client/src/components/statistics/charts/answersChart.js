import {Line} from "react-chartjs-2";
import React from "react";

const AnswersChart = (props) => {
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
        label: "Acutal Score",
        data: [
          props.answers.mathCorrectAnswers,
          props.answers.englishCorrectAnswers,
          props.answers.verbalCorrectAnswers,
          props.answers.nonVerbalCorrectAnswers
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: "Potential Score",
        data: [
          props.answers.mathAnswers,
          props.answers.englishAnswers,
          props.answers.verbalAnswers,
          props.answers.nonVerbalAnswers
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 0.8)'
        ],
        borderWidth: 1,
      }
    ],
  };

  return (
      <Line
          height={400}
          width={600}
          options={options}
          data={data}
      />
  )
}

export default AnswersChart