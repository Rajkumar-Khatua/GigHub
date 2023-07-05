import "./Payment.scss";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckOutForm from "../../components/CheckOutForm/CheckOutForm";

const stripePromise = loadStripe(
  "STRIPE_PUBLIC_KEY"
);

function Payment() {
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#2ec27e",
      colorBackground: "#f6f5f4",
      colorText: "#241f31",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Payment">
       <h1 className="payment-page__heading">Payment Page</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
