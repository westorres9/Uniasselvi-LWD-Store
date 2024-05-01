import ChartClientsWhoMostPurchased from '../../components/ChartClientsWhoMostPurchased';
import ChartMostSoldProducts from '../../components/ChartMostSoldProducts';
import ChartSalesByDay from '../../components/ChartSalesByDay';
import ChartSalesByMonth from '../../components/ChartSalesByMonth';
import './styles.css';

export default function AdminHome() {
    return (
        <div className="container admin-dashboard">
            <h1>Dashboard</h1>
            <div className='dashboard-container'>
                <div className='dashboard-item'>
                <ChartMostSoldProducts/>
                </div>
                <div className='dashboard-item'>
                <ChartClientsWhoMostPurchased/>
                </div>
            </div>
            <div className='dashboard-container'>
                <div className='dashboard-item'>
                <ChartSalesByDay/>
                </div>
                <div className='dashboard-item'>
                <ChartSalesByMonth/>
                </div>
            </div>
        </div>
    )
}