import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ title, amount }) => {
  const [isPaid, setIsPaid] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // console.log(totalPrice);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (elements == null) {
        return;
      }

      await elements.submit();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          amount: amount,
          title: title,
        }
      );

      const clientSecret = response.data.client_secret;

      const stripeResponse = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        redirect: "if_required",
      });

      if (stripeResponse.error) {
        alert("Une erreur est survenue, veuillez réssayer.");
      }

      if (stripeResponse.paymentIntent.status === "succeeded") {
        setIsPaid(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <p>Merci pour votre achat.</p>
  ) : (
    <div className="form-payment">
      <div className="stripe-elements-wrapper">
        <form onSubmit={handleSubmit}>
          <PaymentElement className="StripeElement" />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
