import { useEffect, useState } from "react";
import * as orderService from '../../../../services/order-service';
import Highcharts from 'highcharts';

export default function ChartMostSoldProducts() {
 
    const [data, setData] = useState([]);
    useEffect(() => {
      orderService.getMostSoldProducts().then((response) => {
        console.log(response.data.content)
        setData(response.data.content);
  
      })
    },[]);
  
  
    useEffect(() => {
  
      const chartData = data.map((item : {productName: any, totalQuantity: any;}) => ({
        name: item.productName,
        y: item.totalQuantity
      }));
  
      Highcharts.chart('most-sold-product', {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Quantidade de Produtos',
        },
        series: [
          {
            name: 'Vendas',
            data: chartData,
          },
        ],
      } as Highcharts.Options);
  
    }, [data]);
  
  
    return (
      <div id="most-sold-product"></div>
    );
  }