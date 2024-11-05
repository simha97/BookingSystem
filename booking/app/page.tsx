import Image from "next/image";
import Calender from "./components/Calender";

export default function Home() {
  interface Room {
    roomId: number;
    roomName: string;
    capacity: number;
  }

  const rooms: Room[] = [
    { roomId: 1, roomName: "Steve", capacity: 6 },
    { roomId: 2, roomName: "Ada", capacity: 10 },
    { roomId: 3, roomName: "Grace", capacity: 20 },
  ];

  return (
    <div>
      <h1> Välj en tid </h1>
      <Calender />
    </div>
  );
}
