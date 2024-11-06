"use client";
import React, { useEffect, useState } from "react";


  type Room = {
    roomID: number;
    roomName: string;
    capacity: number;
  };

  interface CalenderProps {
    rooms: Room[];
    roomsSelected: string[];
  }

  function Calender({ rooms, roomsSelected }: CalenderProps) {
    const [bookedSlots, setBookedSlots] = useState([]);

    const slots: string[] = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
    ];
    const dates: string[] = ["18 okt", "19 okt", "20 okt"];

    useEffect(() => {
      const fetchBookedSlots = async () => {
        const response = await fetch("api/bookedSlots");
        const data = await response.json();
        setBookedSlots(data);
        console.log(data);
      };

      fetchBookedSlots();
    }, []);
    console.log(roomsSelected);
    const handleBooking = async (
      roomId: number,
      date: string,
      timeSlot: string
    ) => {
      try {
        const response = await fetch("api/bookedSlots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomId, date, timeSlot }),
        });

        if (response.ok) {
          alert("Booking successful!");
        } else {
          alert("Booking failed.");
        }
      } catch (error) {
        console.error("Error booking slot:", error);
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
        <div className="grid grid-cols-3">
          {dates.map((date, dateIndex) => (
            <div key={dateIndex} className="border p-3">
              <h3>{date}</h3>
              {rooms
                .filter(
                  (room) =>
                    roomsSelected.length === 0 ||
                    roomsSelected.includes(room.roomName)
                )
                .map((room, roomIndex) => (
                  <div key={roomIndex}>
                    {slots
                      .filter(
                        (timeSlot) => !isSlotBooked(room.roomID, date, timeSlot)
                      )
                      .map((timeSlot, slotIndex) => (
                        <div
                          key={slotIndex}
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            margin: "5px 0",
                            backgroundColor: "#fff",
                          }}
                          onClick={() =>
                            handleBooking(room.roomID, date, timeSlot)
                          }
                        >
                          <h4 style={{ fontWeight: "bold" }}>
                            {room.roomName} ({room.capacity})
                          </h4>
                          <div
                            style={{
                              color: "blue",
                            }}
                          >
                            {timeSlot}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
export default Calender;
