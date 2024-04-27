import CardBanner from "../../components/CardBanner";
import CardIconList from "../../components/CardIconList";
import MainCarousel from "../../components/MainCarousel";

export default function StoreHome() {
    return (
        <div>
            <MainCarousel />
            <CardIconList />
            <CardBanner />
        </div>
    )
}