import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db from "../../firebase";
import "./Plans.css";
import { loadStripe } from "@stripe/stripe-js";

function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
        });
      });
  }, []);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  console.log(products);
  console.log(subscription);
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        //show error to customer and inspect cloud functions
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        //redirect to checkout as there is a session- init strip
        const stripe = await loadStripe(
          "pk_test_51IVmzwI7uNdnvCwFph5n16w8NdWLYxTP33AnPf89LOKJ14UPiWPhNOcTxluYuCSnpJPUO12StUXXRlSMrTyGxDzd00Bd77zOYd"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <div className="plans">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        //TODO: add logic to check for user subscription(active..)
        const isCurrentSubscription = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`plans__plan ${
              isCurrentSubscription && "plans__plan--disable"
            }`}
          >
            <div className="plans__planInfo">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentSubscription &&
                loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentSubscription ? "Current Package" : "subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;

/* <p>Renewal Date</p>
      <div className="profile__plan">
        <div className="profile__planDescription">
          <h4>Netflix Standard</h4>
          <h5>1080p</h5>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="profile__plan">
        <div className="profile__planDescription">
          <h4>Netflix Basic</h4>
          <h5>480p</h5>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="profile__plan">
        <div className="profile__planDescription">
          <h4>Netflix Premium</h4>
          <h5>4K+HDR</h5>
        </div>
        <button>Subscribe</button>
      </div> */
