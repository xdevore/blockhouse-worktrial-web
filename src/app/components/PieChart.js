"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
  ssr: false,
});

const PieChart = ( {dataInput} ) => {
  
    const structuredData = {
      labels: dataInput["labels"],
      datasets: [{
        label: 'Pie Chart',
        data: dataInput["data"],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // red
          'rgba(54, 162, 235, 0.2)', // blue
          'rgba(255, 205, 86, 0.2)' // yellow
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    }
  
    return (
      <div>
        <Pie data={structuredData} plugins={[ChartDataLabels]}/>
      </div>
    );
  };
  
  export default PieChart;