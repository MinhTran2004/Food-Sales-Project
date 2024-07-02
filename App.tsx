import React from "react";
import MainPageNavigation from "./View/MainPageNavigation";
import { Provider } from "react-redux";
import store from "./Redux/Store";

export default function App() {
  return (
    <Provider store={store}>
      <MainPageNavigation />
    </Provider>
  );
}
