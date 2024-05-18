import { useEffect, useState } from "react";
import * as orderService from "../../../../services/order-service";
import Highcharts from "highcharts";

export default function ChartSalesByMonth() {
  const [data, setData] = useState([]);

  useEffect(() => {
    orderService.getSalesByMonth().then((response) => {
      setData(response.data.content);
    });
  }, []);

  useEffect(() => {
    const chartData = data.map((item: { month: any; totalSales: any }) => ({
      name: item.month,
      y: item.totalSales,
    }));

    Highcharts.chart("sales-by-month", {
      chart: {
        type: "column",
      },
      title: {
        text: "Vendas por Mês",
      },
      xAxis: {
        categories: chartData.map((item) => item.name),
      },
      yAxis: {
        title: {
          text: "Total de Vendas Mensal",
        },
      },
      series: [
        {
          type: "column",
          name: "Vendas Mensais",
          data: chartData,
        },
      ],
    } as Highcharts.Options); // Adicione o tipo Highcharts.Options
  }, [data]);

  return <div id="sales-by-month"></div>;
}
