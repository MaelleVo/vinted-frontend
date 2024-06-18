import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ amount }) => {
  const [success, setSuccess] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const appearance = {
    theme: "stripe",
  };

  const stripe = useStripe();
  const elements = useElements(appearance);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPaying(true);

    console.log(amount);

    try {
      const cardElement = elements.getElement(CardElement, {
        style: {
          base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: "500",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
              color: "#fce883",
            },
            "::placeholder": {
              color: "#87BBFD",
            },
          },
          invalid: {
            iconColor: "#FFC7EE",
            color: "#FFC7EE",
          },
        },
      });
      const stripeResponse = await stripe.createToken(cardElement);

      if (stripeResponse.error) {
        console.log("Stripe Error : ", stripeResponse.error.message);
        setIsPaying(false);
        return;
      }

      //   console.log(stripeResponse);

      const stripeToken = stripeResponse.token.id;
      console.log("Stripe Token : ", stripeToken);

      const dataPayment = {
        token: stripeToken,
        amount: amount,
        mode: "payment",
        currency: "eur",
      };

      const { error: submitError } = await elements.submit();

      if (submitError) {
        // console.log(submitError);
        setErrorMessage(submitError.message);
        return;
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        dataPayment
      );
      console.log("Response Data : ", response.data);

      const clientSecret = response.data.client_secret;

      // Requête à Stripe pour valider le paiement
      const { error, paymentIntent } = await stripe.confirmPayment({
        clientSecret: clientSecret,
        elements: elements,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      } else {
        console.log("Payment failed:", response.data);
      }
    } catch (error) {
      console.log("Payment error : ", error.message);
    }
    setIsPaying(false);
  };

  return success ? (
    <p>Paiement effectué</p>
  ) : (
    <div className="form-payment">
      <div className="stripe-elements-wrapper">
        <form onSubmit={handleSubmit}>
          <CardElement className="StripeElement" />
          <input
            className="button-buy"
            type="submit"
            value="Acheter"
            disabled={isPaying}
          />
          <p>{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
