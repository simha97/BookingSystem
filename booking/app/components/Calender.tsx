'use client';
import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import Image from 'next/image';
import PopUp from './PopUp';

type Room = {
  roomID: number;
  roomName: string;
  capacity: number;
};

type Slot = {
  roomId: number;
  date: string;
  timeSlot: string;
  roomName: string;
};

type CalenderProps = {
  rooms: Room[];
  slots: string[];
  dates: string[];
};

function Calender({ rooms, slots, dates }: CalenderProps) {
  const [roomsFiltered, setRoomsFiltered] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [username, setUsername] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [step, setStep] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const daysToShow = 3;

  // Fetchign API
  useEffect(() => {
    const fetchBookedSlots = async () => {
      const response = await fetch('api/bookedSlots');
      const data = await response.json();
      setBookedSlots(data);
    };

    fetchBookedSlots();
  }, []);

  const handleBooking = async () => {
    if (!username.trim()) {
      alert('Please enter your name to book a slot.');
      return;
    }
    // POST to API
    try {
      const response = await fetch('api/bookedSlots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: selectedSlot?.roomId,
          date: selectedSlot?.date,
          timeSlot: selectedSlot?.timeSlot,
          name: username,
        }),
      });

      if (response.ok) {
        setStep(1);
        setSelectedSlot(null);
        setUsername('');
        setConfirmed(true);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log('Booking failed.');
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

  const handleNextDates = () => {
    if (startIndex + daysToShow < dates.length) {
      setStartIndex(startIndex + daysToShow);
    }
  };

  const handlePrevDates = () => {
    if (startIndex - daysToShow >= 0) {
      setStartIndex(startIndex - daysToShow);
    }
  };

  const visibleDates = dates.slice(startIndex, startIndex + daysToShow);

  return (
    <div>
      {confirmed && <PopUp />}
      {step === 1 && (
        <div className="p-4">
          <h1 className="text-6xl font-bold mb-6">Boka ett rum</h1>
          <button
            className="bg-black text-white rounded-lg mt-6 px-4 py-2 w-full"
            onClick={() => setStep(2)}>
            Nästa
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h1 className="text-5xl font-bold mb-6"> Välj en tid </h1>

          <Checkbox
            rooms={rooms}
            roomsFiltered={roomsFiltered}
            setRoomsFiltered={setRoomsFiltered}
          />

          <div className="flex items-center justify-between p-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-l bg-transparent "
              onClick={handlePrevDates}
              disabled={startIndex === 0}>
              <Image
                src="/LeftArrow.svg"
                alt="Left Arrow"
                width={24}
                height={24}
              />
            </button>
            <span className="mx-4 font-bold">
              {visibleDates[0]} - {visibleDates[visibleDates.length - 1]}
            </span>
            <button
              className="bg-gray-300 px-4 py-2 rounded-r bg-transparent "
              onClick={handleNextDates}
              disabled={startIndex + daysToShow >= dates.length}>
              <Image
                src="/RightArrow.svg"
                alt="Right Arrow"
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="grid grid-cols-3">
            {visibleDates.map((date, dateIndex) => (
              <div key={dateIndex} className="border">
                <h3 className="text-center border-b py-1">{date}</h3>
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
                            className={`border p-2 text-center rounded-md m-2 cursor-pointer transition-all duration-200 min-w-[80px] ${
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
                            <h4 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg">
                              {room.roomName} ({room.capacity})
                            </h4>
                            <div className="text-xs sm:text-sm md:text-base">
                              {timeSlot}
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>

          <button
            className="bg-black text-white rounded-lg px-4 my-3 py-2 w-full"
            onClick={() => {
              if (!selectedSlot) {
                alert('Välj en tid innan du går vidare');
                return;
              }
              setStep(3);
            }}>
            Nästa
          </button>
        </div>
      )}
      {step === 3 && (
        <div>
          <div className="mb-4">
            <h1 className="text-6xl font-bold mb-6">Vem bokar?</h1>

            <label htmlFor="username" className="block text-lg font-bold mb-2">
              Förnamn och efternamn
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Skriv ditt fullständiga namn här"
              className="p-2 border border-gray-400 rounded-lg w-full"
            />
          </div>

          <button
            className="bg-black text-white rounded-lg px-4 my-3 py-2 w-full"
            onClick={handleBooking}>
            Boka
          </button>
        </div>
      )}
    </div>
  );
}

export default Calender;
