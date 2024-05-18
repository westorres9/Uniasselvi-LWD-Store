import "./styles.css";

type Props = {
imageUrl: string;
title: string;
subtitle: string;
};
export default function CardIcon({imageUrl,title,subtitle}:Props){
    return(
        <div className="card-icon-container">
            <div className="card-icon-img">
                <img src={imageUrl} alt={title}/>
            </div>
            <div className="card-icon-text">
                <h5>{title}</h5>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}