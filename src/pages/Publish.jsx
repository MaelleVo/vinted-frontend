import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Cookies
import Cookies from "js-cookie";

const Publish = () => {
  const token = Cookies.get("token");

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [swipe, setSwipe] = useState(false);

  const [pictureOnCloudinary, setPictureOnCloudinary] = useState(null);

  const handlePictureChange = (event) => {
    const value = event.target.files[0];
    setPicture(value);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleBrandChange = (event) => {
    const value = event.target.value;
    setBrand(value);
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSize(value);
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleConditionChange = (event) => {
    const value = event.target.value;
    setCondition(value);
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleSwipeChange = (event) => {
    const checked = event.target.checked;
    setSwipe(checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      picture,
      title,
      description,
      brand,
      size,
      color,
      condition,
      city,
      price
    );

    try {
      const formData = new FormData();

      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // console.log(response.data.token); // => token here
      //   console.log(token);
      console.log(formData);
      console.log(pictureOnCloudinary);
      setPictureOnCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="section-publish">
      <div className="form-publish container">
        <form onSubmit={handleSubmit}>
          <h2>Vends ton article</h2>
          <div className="add-picture divider-form">
            <div className="inside-border">
              <label htmlFor="file" className="label-picture">
                <i>
                  <FontAwesomeIcon className="icon-plus" icon="plus" />
                </i>
                Ajouter une photo
              </label>
              <input
                type="file"
                placeholder="Ajoute une photo"
                className="input-picture"
                onChange={handlePictureChange}
              />
            </div>
          </div>
          <div className="divider-form">
            <label htmlFor="title">
              Titre
              <input
                type="text"
                name="title"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={handleTitleChange}
              />
            </label>
            <label htmlFor="description">
              Décris ton article
              <input
                type="text"
                name="description"
                placeholder="ex: porté quelques fois, taille correctement"
                value={description}
                onChange={handleDescriptionChange}
                style={{ height: "100px" }}
              />
            </label>
          </div>
          <div className="divider-form">
            <label htmlFor="brand">
              Marque
              <input
                type="text"
                name="brand"
                placeholder="ex: Zara"
                value={brand}
                onChange={handleBrandChange}
              />
            </label>
            <label htmlFor="size">
              Taille
              <input
                type="text"
                name="size"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={handleSizeChange}
              />
            </label>
            <label htmlFor="color">
              Couleur
              <input
                type="text"
                name="color"
                placeholder="ex: Fushia"
                value={color}
                onChange={handleColorChange}
              />
            </label>
            <label htmlFor="condition">
              État
              <input
                type="text"
                name="condition"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={handleConditionChange}
              />
            </label>
            <label htmlFor="city">
              Lieu
              <input
                type="text"
                name="city"
                placeholder="ex: Paris"
                value={city}
                onChange={handleCityChange}
              />
            </label>
          </div>
          <div className="divider-form">
            <label htmlFor="price">
              Prix
              <input
                type="text"
                name="price"
                placeholder="0,00€"
                value={price}
                onChange={handlePriceChange}
              />
            </label>
            <div className="checkbox-div">
              <input
                id="checkbox"
                type="checkbox"
                name="swipe"
                checked={swipe}
                onChange={handleSwipeChange}
              />
              <label htmlFor="checkbox">
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </div>
          <div className="button-form-publish">
            <Link to="/">
              <button
                type="submit"
                value="Submit"
                style={{ cursor: "pointer" }}
              >
                Ajouter
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Publish;
