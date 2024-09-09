"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-chart-financial';
import 'chartjs-adapter-moment';

const Candlestick = dynamic(() => import('react-chartjs-2').then((mod) => mod.Chart), {
  ssr: false,
});

ChartJS.register(...registerables);
ChartJS.register(
  require('chartjs-chart-financial').CandlestickController,
  require('chartjs-chart-financial').CandlestickElement
);

const CandlestickChart = ({ dataInput }) => {
  const structuredData = {
    datasets: [
      {
        label: 'Candlestick Chart',
        data: dataInput["data"].map((point) => ({
          x: point['x'],
          o: point['open'],
          h: point['high'],
          l: point['low'],
          c: point['close'] 
        })),
        type: 'candlestick',
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
        barWidth: 0.8,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time', 
        time: {
          unit: 'day', 
        },
      },
      y: {
        beginAtZero: false,
        min: Math.min(...dataInput["data"].map(point => point.low)) - 10,
        max: Math.max(...dataInput["data"].map(point => point.high)) + 10,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div>
      <Candlestick data={structuredData} options={options} />
    </div>
  );
};

export default CandlestickChart;
