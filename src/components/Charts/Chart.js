import { useContext, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { ThemeContext } from 'styled-components';
import ResultsContext from '../../context/ResultsContext';
import chartsData from './data';

function Chart({ id }) {
  const { state } = useContext(ResultsContext);
  const theme = useContext(ThemeContext);
  const chartRef = useRef();
  const { title, yLabel, xLabel } = chartsData[id];
  const { datasets } = state.charts[id];
  const data = (_) => {
    return {
      labels: Array.from({ length: datasets[0].data.length }, (_, k) =>
        (k * state.samplingTime).toFixed(1)
      ),
      datasets: datasets.map((dataset, idx) => ({
        ...dataset,
        ...chartsData[id].datasets[idx],
        borderColor: theme.charts.colors[idx], // TUTAJ
      })),
    };
  };
  const options = {
    title: {
      display: true,
      text: title,
      fontColor: 'white', // TUTAJ
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: 'white', // TUTAJ
          },
          scaleLabel: {
            display: true,
            labelString: yLabel,
            fontSize: 16,
            fontColor: 'white', // TUTAJ
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 11,
            fontColor: 'white', // TUTAJ
          },
          scaleLabel: {
            display: true,
            labelString: xLabel,
            fontSize: 16,
            fontColor: 'white', // TUTAJ
          },
        },
      ],
    },
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'white', // TUTAJ
      },
    },
  };
  return (
    <div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}

export default Chart;
