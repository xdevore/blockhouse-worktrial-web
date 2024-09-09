import Image from "next/image";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import CandlestickChart from "./components/CandlestickChart";
import PieChart from "./components/PieChart";

export default async function Dashboard() {

  async function getData(dataPath) {
    const res = await fetch("http://127.0.0.1:8000/api/" + dataPath);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  
  const candlestickData = await getData("candlestick-data/")
  const lineChartData = await getData("line-chart-data/")
  const barChartData = await getData("bar-chart-data/")
  const pieChartData = await getData("pie-chart-data/")

  const ChartSpacingWrapper = ({ title, children }) => {
    return (
      <div className="w-full h-full flex flex-col items-center">
        <h1>{title}</h1>
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-0 pb-20 gap-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 items-center">
        <h1 className="font-Poppins font-bold text-[34px] md:text-[55px] leading-[40px] md:leading-[60px] w-full text-center">
          <div className='mt-2 mb-2'>
            BLOCKHOUSE DASHBOARD
          </div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ChartSpacingWrapper title="Bar Chart">
            <BarChart dataInput={barChartData} />
          </ChartSpacingWrapper>
          <ChartSpacingWrapper title="Line Chart">
            <LineChart dataInput={lineChartData} />
          </ChartSpacingWrapper>
          <ChartSpacingWrapper title="Pie Chart">
            <PieChart dataInput={pieChartData} />
          </ChartSpacingWrapper>
          <ChartSpacingWrapper title="Candlestick Chart">
            <CandlestickChart dataInput={candlestickData} />
          </ChartSpacingWrapper>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center pt-20">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/xavier-devore/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Xavier DeVore
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Repository
        </a>
      </footer>
    </div>
  );
}
