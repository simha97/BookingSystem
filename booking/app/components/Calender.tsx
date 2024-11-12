'use client';
import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';

type Room = {
  roomID: number;
  roomName: string;
  capacity: number;
};

interface Slot {
  roomId: number;
  date: string;
  timeSlot: string;
  roomName: string;
}

interface CalenderProps {
  rooms: Room[];
  slots: string[];
  dates: string[];
}

function Calender({ rooms, slots, dates }: CalenderProps) {
  const [roomsFiltered, setRoomsFiltered] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const response = await fetch('api/bookedSlots');
      const data = await response.json();
      setBookedSlots(data);
      console.log('Booked slots fetched:', data);
    };

    fetchBookedSlots();
  }, []);

  const handleBooking = async () => {
    if (!userName.trim()) {
      alert('Please enter your name to book a slot.');
      return;
    }

    if (!selectedSlot) {
      alert('No slot selected.');
      return;
    }

    try {
      const response = await fetch('api/bookedSlots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: selectedSlot.roomId,
          date: selectedSlot.date,
          timeSlot: selectedSlot.timeSlot,
          name: userName,
        }),
      });

      if (response.ok) {
        alert('Booking successful!');
        const updatedSlots = await fetch('api/bookedSlots').then((res) =>
          res.json()
        );
        setBookedSlots(updatedSlots);
        setStep(1);
        setSelectedSlot(null);
        setUserName('');
      } else {
        alert('Booking failed.');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
    }
  };

  const isSlotBooked = (roomId: number, date: string, timeSlot: string) => {
    return bookedSlots.some(
      (slot: { roomId: number; date: string; timeSlot: string }) =>
        slot.roomId === roomId &&
        slot.date === date &&
        slot.timeSlot === timeSlot
    );
  };

  return (
    <div>
      {step === 1 && (
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold mb-6">Boka ett rum</h1>
          <button
            className="bg-black text-white rounded-md px-4 py-2"
            onClick={() => setStep(2)}>
            Nästa
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <h1> Välj en tid </h1>

          <Checkbox
            rooms={rooms}
            roomsFiltered={roomsFiltered}
            setRoomsFiltered={setRoomsFiltered}
          />

          <div className="grid grid-cols-3">
            {dates.map((date, dateIndex) => (
              <div key={dateIndex} className="border p-3">
                <h3>{date}</h3>
                {rooms
                  .filter(
                    (room) =>
                      roomsFiltered.length === 0 ||
                      roomsFiltered.includes(room.roomName)
                  )
                  .map((room, roomIndex) => (
                    <div key={roomIndex}>
                      {slots
                        .filter(
                          (timeSlot) =>
                            !isSlotBooked(room.roomID, date, timeSlot)
                        )
                        .map((timeSlot, slotIndex) => (
                          <div
                            key={slotIndex}
                            className={`border p-2 rounded-lg text-center m-3 cursor-pointer ${
                              selectedSlot &&
                              selectedSlot.roomId === room.roomID &&
                              selectedSlot.date === date &&
                              selectedSlot.timeSlot === timeSlot
                                ? 'bg-green-700 text-white'
                                : 'border-teal-500 text-black'
                            }`}
                            onClick={() =>
                              setSelectedSlot({
                                roomId: room.roomID,
                                date,
                                timeSlot,
                                roomName: room.roomName,
                              })
                            }>
                            <h4 style={{ fontWeight: 'bold' }}>
                              {room.roomName} ({room.capacity})
                            </h4>
                            <div>{timeSlot}</div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          <button
            className="bg-black text-white rounded-md px-4 py-2 mt-4"
            disabled={!selectedSlot}
            onClick={() => setStep(3)}>
            Nästa
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-lg font-bold mb-2">
              Förnamn och efternamn
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Skriv ditt fullständiga namn här"
              className="p-2 border border-gray-400 rounded-lg w-full"
            />
          </div>

          <button
            className="bg-black text-white rounded-md px-4 py-2"
            onClick={handleBooking}>
            Boka
          </button>
        </>
      )}
    </div>
  );
}

export default Calender;
