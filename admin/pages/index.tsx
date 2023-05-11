import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home({ status }: any) {
  console.log(status);
  const { tagsStatus, ingredientStatus, CategoryStatus } = status;
  const data1 = {
    labels: ingredientStatus.map((st: { name: string }) => st.name),
    datasets: [
      {
        label: "# of Votes",
        data: ingredientStatus.map((st: { count: number }) => st.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: tagsStatus.map((st: { name: string }) => st.name),
    datasets: [
      {
        label: "# of Votes",
        data: tagsStatus.map((st: { count: number }) => st.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: CategoryStatus.map((st: { name: string }) => st.name),
    datasets: [
      {
        label: "# of Votes",
        data: CategoryStatus.map((st: { count: number }) => st.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full">
      {" "}
      <div className="w-full flex justify-between">
        <div className=" w-[500px]">
          <p>ingredient</p>
          <Doughnut data={data1} updateMode={"reset"} redraw={true} />
        </div>
        <div className=" w-[500px]">
          <p>tags</p>
          <Doughnut data={data2} updateMode={"reset"} redraw={true} />
        </div>
        <div className=" w-[500px]">
          <p>category</p>
          <Doughnut data={data3} updateMode={"reset"} redraw={true} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const result = await axios.get("http://localhost:3030/recipes/status");
  const status = result.data;
  return {
    props: { status }, // will be passed to the page component as props
  };
}
