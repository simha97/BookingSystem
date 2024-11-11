'use client';

import Calender from './components/Calender';
import { useState } from 'react';

export default function Home() {
  interface Room {
    roomID: number;
    roomName: string;
    capacity: number;
  }

  const rooms: Room[] = [
    { roomID: 1, roomName: 'Margret', capacity: 4 },
    { roomID: 2, roomName: 'Steve', capacity: 6 },
    { roomID: 3, roomName: 'Ada', capacity: 10 },
    { roomID: 4, roomName: 'Edmund', capacity: 10 },
    { roomID: 5, roomName: 'Grace', capacity: 20 },
  ];

  const [roomsFiltered, setRoomsFiltered] = useState<string[]>([]);

  return (
    <div>
      <Calender
        rooms={rooms}
        roomsFiltered={roomsFiltered}
        setRoomsFiltered={setRoomsFiltered}
      />
    </div>
  );
}
