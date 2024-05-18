import { useEffect, useState } from "react";
import * as orderService from '../../../../services/order-service';
import Highcharts from 'highcharts';


export default function ChartClientsWhoMostPurchased() {
 
    const [data, setData] = useState([]);

  useEffect(() => {
    orderService.getClientsWhoMostPurchased().then((response) => {
        setData(response.data.content);
    });
  },[]);

  useEffect(() => {
      
    const chartData = data.map((item: { client: string; totalPurchased: number; }) => ({
        name: item.client,
        y:  item.totalPurchased
      }));
    console.log(chartData);

    Highcharts.chart('clients-who-most-purchase', {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Clientes que mais compram',
        },
        series: [
          {
            name: 'Compras',
            data: chartData,
          },
        ]
      } as Highcharts.Options);
  },[data])

  return (
    <div id="clients-who-most-purchase"></div>
  );
}