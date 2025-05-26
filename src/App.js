import React from "react";
import BottomSheet from "./BottomSheet";

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col justify-end items-center bg-gray-100">
      <h1 className="text-2xl mt-6">React Bottom Sheet with Snap Points</h1>
      <BottomSheet />
    </div>
  );
}