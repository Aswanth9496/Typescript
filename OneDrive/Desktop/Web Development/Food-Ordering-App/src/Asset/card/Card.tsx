import './Card.css';

const Card = ({ food }) => {

    console.log(food)
    return (
        <div className="card">
            <div className="card-image">
                <img src ={food.image} alt={food.name} />
            </div>
            <div className="category">{food.name}</div>
            <div className="heading">
                Hotel Sai Nath & Sai Restaurant
                <div className="rating">⭐{food.rating}</div>
                <div className="author">
                Location: <span className="name">{food.Location}</span> 4 days ago
                </div>
            </div>
        </div>
    );
};

export default Card;
