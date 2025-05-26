// src/BottomSheet.js
import React, { useRef, useEffect, useState } from "react";
import "./BottomSheet.css";
import useSpring from "./useSpring";

const snapPoints = {
  closed: 100,
  half: window.innerHeight / 2,
  full: 100,
};

export default function BottomSheet() {
  const dragStartY = useRef(0);
  const dragStartPosition = useRef(0);
  const [target, setTarget] = useState(window.innerHeight - snapPoints.closed);
  const [position, setPosition] = useSpring(target);

  useEffect(() => {
    setPosition(target);
  }, [target]);

  const startDrag = (clientY) => {
    dragStartY.current = clientY;
    dragStartPosition.current = position;
  };

  const onMove = (clientY) => {
    const delta = clientY - dragStartY.current;
    const newY = dragStartPosition.current + delta;
    setPosition(newY);
  };

  const snapToClosest = (y) => {
    const positions = [
      window.innerHeight - snapPoints.closed,
      window.innerHeight - snapPoints.half,
      snapPoints.full,
    ];

    let closest = positions.reduce((prev, curr) =>
      Math.abs(curr - y) < Math.abs(prev - y) ? curr : prev
    );

    setTarget(closest);
  };

  const handleTouchStart = (e) => {
    startDrag(e.touches[0].clientY);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    onMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    snapToClosest(position);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    startDrag(e.clientY);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    onMove(e.clientY);
  };

  const handleMouseUp = () => {
    snapToClosest(position);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="bottom-sheet"
      style={{ transform: `translateY(${position}px)` }}
    >
      <div
        className="drag-area"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="handle" />
      </div>
      <div className="content">
        <h2>Bottom Sheet Content</h2>
        <p>This is a responsive bottom sheet with drag and snap points.</p>
        <div className="buttons">
          <button onClick={() => setTarget(window.innerHeight - snapPoints.closed)}>Close</button>
          <button onClick={() => setTarget(window.innerHeight - snapPoints.half)}>Half</button>
          <button onClick={() => setTarget(snapPoints.full)}>Open</button>
        </div>
      </div>
    </div>
  );
}
