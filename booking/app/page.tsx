'use client';

import Calender from './components/Calender';

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

  const slots: string[] = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
  ];
  const dates: string[] = ['18 okt', '19 okt', '20 okt'];

  return (
    <div>
      <Calender rooms={rooms} slots={slots} dates={dates} />
    </div>
  );
}
