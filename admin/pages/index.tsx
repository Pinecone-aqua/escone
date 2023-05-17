import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  BarElement,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home({ status, userStatus }: any) {
  const { tagsStatus, ingredientStatus, CategoryStatus, createStatus } = status;
  const ingredientData = {
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
  const tagData = {
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
  const categoryData = {
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

  const labels = userStatus.map((us: { date: string }) => us.date);

  const userData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Users",
        data: userStatus.map((us: { count: number }) => us.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const recipeData = {
    labels: createStatus.map((us: { name: string }) => us.name),
    datasets: [
      {
        fill: true,
        label: "Recipe",
        data: createStatus.map((us: { count: number }) => us.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="w-full">
      {" "}
      <div className="flex ">
        <div className="w-[700px]">
          <Line data={userData} />
        </div>
        <div className="w-[700px]">
          <Bar data={recipeData} />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className=" w-[500px]">
          <p>ingredient</p>
          <Doughnut data={ingredientData} updateMode={"reset"} redraw={true} />
        </div>
        <div className=" w-[500px]">
          <p>tags</p>
          <Doughnut data={tagData} updateMode={"reset"} redraw={true} />
        </div>
        <div className=" w-[500px]">
          <p>category</p>
          <Doughnut data={categoryData} updateMode={"reset"} redraw={true} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const result = await axios.get(
    `${process.env.BACK_END_URL}/recipe/statistics`
  );
  const status = result.data;
  const resultuser = await axios.get(`${process.env.BACK_END_URL}/user/status`);
  const userStatus = resultuser.data;
  return {
    props: { status, userStatus }, // will be passed to the page component as props
  };
}
