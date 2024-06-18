import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  // console.log(params);

  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        // console.log(response.data);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchOffer();
  }, [id]);

  // console.log(id);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="offer">
      <section className="offer-section container">
        <aside className="product-picture">
          <img
            className="picture-product"
            src={offer.product_image.secure_url}
            alt="product-picture"
          />
        </aside>
        <aside className="product-description">
          {/* <p>the id is : {id}</p> */}
          <p className="price">{offer.product_price}€</p>
          <div className="descriptions">
            {offer.product_details.map((description, index) => {
              // console.log(description);
              const keys = Object.keys(description);
              const key = keys[0];
              return (
                <p key={index}>
                  {key} : {description[key]}
                </p>
              );
            })}
          </div>
          <div className="ref">
            <p>{offer.product_name} </p>
            <p> {offer.product_description} </p>
          </div>

          <div className="owner-description">
            <img
              className="avatar-product"
              src={offer.owner.account.avatar.secure_url}
              alt="avatar-owner"
            />
            <span>{offer.owner.account.username}</span>
          </div>
          <Link to="/payment">
            <button>Acheter</button>
          </Link>
        </aside>
      </section>
    </div>
  );
};

export default Offer;
