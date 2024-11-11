import React, { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

type Room = {
  roomID: number;
  roomName: string;
  capacity: number;
};

interface CheckboxProps {
  rooms: Room[];
  roomsFiltered: string[];
  setRoomsFiltered: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Checkbox({
  rooms,
  roomsFiltered,
  setRoomsFiltered,
}: CheckboxProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (roomName: string) => {
    setRoomsFiltered((prev) =>
      prev.includes(roomName)
        ? prev.filter((item) => item !== roomName)
        : [...prev, roomName]
    );
  };

  const handleUnmarkAll = () => {
    setRoomsFiltered([]); // Clear all selected items
  };

  return (
    <div className="relative m-4 w-72">
      <button
        className="border border-gray-300 px-3 py-2 rounded-md w-full text-left"
        onClick={() => setIsDropdownOpen((prev) => !prev)}>
        {roomsFiltered.length > 0
          ? `${roomsFiltered.length} valda rum`
          : 'Mötesrum'}
      </button>
      {isDropdownOpen && (
        <div
          className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
          style={{ maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP }}>
          {rooms.map((room) => (
            <div
              key={room.roomID}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleChange(room.roomName)}>
              <span>
                {room.roomName} ({room.capacity} personer)
              </span>
              <input
                type="checkbox"
                checked={roomsFiltered.includes(room.roomName)}
                onChange={() => {}}
                className="ml-auto"
              />
            </div>
          ))}
          <div className="flex justify-between px-4 py-3">
            <button
              className="bg-black text-white rounded-md px-4 py-2"
              onClick={() => setIsDropdownOpen(false)}>
              Välj
            </button>
            <button
              className="bg-black text-white rounded-md px-4 py-2"
              onClick={handleUnmarkAll}>
              Avmarkera
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
