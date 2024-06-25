import React from "react";
import { NativeBaseProvider } from 'native-base';
import MainPageNavigation from "./View/MainPageNavigation";

export default function App() {
  return (
    <NativeBaseProvider>
      <MainPageNavigation />
    </NativeBaseProvider>
  );
}
