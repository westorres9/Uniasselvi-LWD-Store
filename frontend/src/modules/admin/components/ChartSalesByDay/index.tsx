import { useEffect, useState } from "react";
import * as orderService from "../../../../services/order-service";
import Highcharts from "highcharts";

export default function ChartSalesByDay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    orderService.getSalesByDay().then((response) => {
      setData(response.data.content);
    });
  }, []);

  useEffect(() => {
    const chartData = data.map((item: { day: any; totalSales: any }) => ({
      name: item.day,
      y: item.totalSales,
    }));

    const customColors = ["#33FF99"];

    Highcharts.chart("sales-by-day", {
      chart: {
        type: "column",
      },
      title: {
        text: "Vendas por Dia",
      },
      xAxis: {
        categories: chartData.map((item) => item.name),
      },
      yAxis: {
        title: {
          text: "Total de Vendas",
        },
      },
      series: [
        {
          type: "column",
          name: "Vendas Diárias",
          data: chartData,
        },
      ],
      colors: customColors,
    } as Highcharts.Options); // Adicione o tipo Highcharts.Options
  }, [data]);

  return (
    <div id="sales-by-day" className="h-[300px] w-full lg:h-[400px]"></div>
  );
}
