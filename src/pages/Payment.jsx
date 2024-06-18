import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title, amount } = location.state;

  const delivery = 1;
  const insuranceBuyer = 2;
  const total = delivery + insuranceBuyer + amount;

  const dataPayment = {
    amount: amount,
    mode: "payment",
    currency: "eur",
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="payment-page">
      <section className="payment-section container">
        <div className="info-payment">
          <p>Résumé de la commande</p>
          <div className="resume-payment">
            <div className="payment-list">
              <p>Commande</p>
              <span>{amount}€</span>
            </div>
            <div className="payment-list">
              <p>Frais protection acheteurs</p>
              <span>{delivery}€</span>
            </div>
            <div className="payment-list">
              <p>Frais de port</p>
              <span>{insuranceBuyer}€</span>
            </div>
          </div>
          <div className="total-payment">
            <p>Total</p>
            <span>{total}€</span>
          </div>
          <p className="text">
            Il ne vous reste plus qu'un étape pour vous offrir{" "}
            <span>{title}</span> 😍. Vous allez payer <span>{total}</span> €
            (frais de protection et frais de port inclus)
          </p>
        </div>
        <Elements stripe={stripePromise} option={dataPayment}>
          <CheckoutForm amount={total} />
        </Elements>
      </section>
    </div>
  );
};

export default Payment;
