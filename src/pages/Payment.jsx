import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { name } = location.state;
  const { price } = location.state;

  return (
    <div>
      <p> {name} </p>
      <p> {price} </p>
    </div>
  );
};

export default Payment;
