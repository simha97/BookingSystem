"use client";

import Image from "next/image";
import Calender from "./components/Calender";
import { useState } from "react";
import Checkbox from "./components/Checkbox";

export default function Home() {
  interface Room {
    roomID: number;
    roomName: string;
    capacity: number;
  }

  const rooms: Room[] = [
    {
      roomID: 1,
      roomName: "Margret",
      capacity: 4,
    },
    {
      roomID: 2,
      roomName: "Steve",
      capacity: 6,
    },
    {
      roomID: 3,
      roomName: "Ada",
      capacity: 10,
    },
    {
      roomID: 4,
      roomName: "Edmund",
      capacity: 10,
    },
    {
      roomID: 5,
      roomName: "Grace",
      capacity: 20,
    },
  ];

  const [roomsSelected, setRoomsSelected] = useState<string[]>([]);
  return (
    <div>
      <h1> Välj en tid </h1>
      <Checkbox
        rooms={rooms}
        roomsSelected={roomsSelected}
        setRoomsSelected={setRoomsSelected}
      />
      <Calender rooms={rooms} roomsSelected={roomsSelected} />
    </div>
  );
}
