"use client";
import React, { useEffect, useState } from "react";

function Calender() {
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const response = await fetch("api/booking");
      const data = await response.json();
      setBookedSlots(data);
      console.log(data); // This should now log the data from the API
    };

    fetchBookedSlots();
  }, []);
  const days = [
    {
      date: "18 okt",
      slots: [
        { name: "Steve", capacity: 6, time: "08:00-09:00", available: false },
        { name: "Ada", capacity: 10, time: "09:00-10:00", available: false },
        { name: "Margret", capacity: 4, time: "10:00-11:00", available: true },
      ],
    },
    {
      date: "19 okt",
      slots: [
        { name: "Margret", capacity: 4, time: "08:00-09:00", available: true },
        { name: "Steve", capacity: 6, time: "10:00-11:00", available: false },
        { name: "Ada", capacity: 10, time: "13:00-14:00", available: true },
      ],
    },
    {
      date: "20 okt",
      slots: [
        { name: "Ada", capacity: 10, time: "08:00-09:00", available: true },
        { name: "Edmund", capacity: 10, time: "09:00-10:00", available: false },
        { name: "Grace", capacity: 20, time: "16:00-17:00", available: true },
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
                <div key={slotIndex}>
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
