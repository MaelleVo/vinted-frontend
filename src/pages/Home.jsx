import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>En cours de chargement ...</p>
  ) : (
    <div>
      <section className="start-selling">
        <div className="container square-start-selling">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </section>
      <div className="middle-tear-paper">
        <img src="tear-white-paper.svg" alt="tear-paper" />
      </div>
      <section className="item-for-sale container">
        {data.offers.map((item) => {
          // console.log(item._id);
          //   console.log(item.product_details[0].MARQUE);
          //   console.log(item.owner.account.avatar.secure_url);
          // console.log(data);
          return (
            <article className="item-article" key={item._id}>
              <div className="banner-owner">
                {item.owner.account.avatar && (
                  <img
                    className="img-owner"
                    src={item.owner.account.avatar.secure_url}
                    alt="avatar-owner"
                  />
                )}

                <span> {item.owner.account.username} </span>
              </div>

              {/* ONCLICK Article Item */}

              <Link
                to={`offer/${item._id}`}
                style={{
                  textDecoration: "none",
                  color: "#c7c7c7",
                  fontsize: "14px",
                }}
              >
                <img
                  className="img-item"
                  src={item.product_image.secure_url}
                  alt="item-picture"
                />
                <p className="price-item">{item.product_price}€</p>
                <p> {item.product_details[1].TAILLE} </p>
                <p> {item.product_details[0].MARQUE} </p>
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Home;
