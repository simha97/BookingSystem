'use client';

import BookingPage from './components/BookingPage';

export default function Home() {
  type Room = {
    roomID: number;
    roomName: string;
    capacity: number;
  };

  const rooms: Room[] = [
    { roomID: 1, roomName: 'Margret', capacity: 4 },
    { roomID: 2, roomName: 'Steve', capacity: 6 },
    { roomID: 3, roomName: 'Ada', capacity: 10 },
    { roomID: 4, roomName: 'Edmund', capacity: 10 },
    { roomID: 5, roomName: 'Grace', capacity: 20 },
  ];

  const slots: string[] = ['10:00-11:00', '11:00-12:00', '13:00-14:00'];
  const dates: string[] = [
    '18 okt',
    '19 okt',
    '20 okt',
    '21 okt',
    '22 okt',
    '23 okt',
    '24 okt',
  ];

  return (
    <div>
      <BookingPage rooms={rooms} slots={slots} dates={dates} />
    </div>
  );
}
