import "./style.css";
import { useState, useEffect } from "react";
// import React from "react";
import {
  createInstance,
  OptimizelyFeature,
  OptimizelyProvider,
  withOptimizely,
} from "@optimizely/react-sdk";
import React from "react";

const optimizely = createInstance({
  sdkKey: "LSiWB4D6YY7vpYo5GRuGE",
});

class Buy_Now_Button extends React.Component {
  onClick = () => {
    const { optimizely } = this.props;
    // after we’ve confirmed purchase completed
    optimizely.track("buy_now");
  };

  render() {
    return <button onClick={this.onClick}>Buy Now</button>;
  }
}

const WrappedBuyNowButton = withOptimizely(Buy_Now_Button);

class Add_to_Cart_Button extends React.Component {
  onClick = () => {
    const { optimizely } = this.props;
    // after we’ve confirmed purchase completed
    optimizely.track("add_to_cart");
  };

  render() {
    return <button onClick={this.onClick}>Buy Now</button>;
  }
}

const WrappedAddaToCartButton = withOptimizely(PurchaseButton);

function App() {
  const [store, setStore] = useState([]);

  function update() {
    fetch("http://localhost:1337/api/stores")
      .then((res) => res.json())
      .then((store) => {
        setStore(store.data);
      });
  }
  useEffect(() => {
    update();
  }, []);

  return (
    <OptimizelyProvider
      optimizely={optimizely}
      user={{
        id: "user983",
      }}
    >
      <div>
        <center>
          <h3> eCommerce store</h3>
          <div className="body">
            {store.map((list, i) => {
              return (
                <div className="card">
                  <img className="image" src={list.attributes.productIMG} />
                  <span>{list.attributes.productName}</span>
                  <br />
                  <br />
                  <span>
                    Price:<b>${list.attributes.productPrice}</b>
                  </span>
                  <br />
                  <br />
                  <WrappedBuyNowButton></WrappedBuyNowButton>
                  <WrappedAddaToCartButton></WrappedAddaToCartButton>
                  {/* <button>Add to cart</button> */}
                </div>
              );
            })}
          </div>
        </center>
      </div>
    </OptimizelyProvider>
  );
}

export default App;
