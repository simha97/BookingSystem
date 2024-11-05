"use client";
import React, { useEffect, useState } from "react";

function Calender() {
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const response = await fetch("api/bookedSlots");
      const data = await response.json();
      setBookedSlots(data);
      console.log(data);
    };

    fetchBookedSlots();
  }, []);

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

  const days = [
    {
      date: "18 okt",
      slots: [
        {
          roomID: 2,
          name: "Steve",
          capacity: 6,
          time: "08:00-09:00",
          available: false,
        },
        {
          roomID: 1,
          name: "Ada",
          capacity: 10,
          time: "09:00-10:00",
          available: false,
        },
        {
          roomID: 3,
          name: "Grace",
          capacity: 4,
          time: "10:00-11:00",
          available: true,
        },
      ],
    },
    {
      date: "19 okt",
      slots: [
        {
          roomID: 3,
          name: "Grace",
          capacity: 4,
          time: "08:00-09:00",
          available: true,
        },
        {
          roomID: 2,
          name: "Steve",
          capacity: 6,
          time: "10:00-11:00",
          available: false,
        },
        {
          roomID: 1,
          name: "Ada",
          capacity: 10,
          time: "13:00-14:00",
          available: true,
        },
      ],
    },
    {
      date: "20 okt",
      slots: [
        {
          roomID: 1,
          name: "Ada",
          capacity: 10,
          time: "08:00-09:00",
          available: true,
        },
        {
          roomID: 2,
          name: "Steve",
          capacity: 10,
          time: "09:00-10:00",
          available: false,
        },
        {
          roomID: 3,
          name: "Grace",
          capacity: 20,
          time: "16:00-17:00",
          available: true,
        },
      ],
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3">
        {days.map((day, index) => (
          <div key={index} className="border p-3">
            <h3>{day.date}</h3>
            {day.slots.map((slot, slotIndex) =>
              slot.available ? (
                <div
                  key={slotIndex}
                  onClick={() =>
                    handleBooking(slot.roomID, day.date, slot.time)
                  }
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  <div>
                    {slot.name} ({slot.capacity})
                  </div>
                  <div>{slot.time}</div>
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
