import Database from "better-sqlite3";

const db = new Database("database.db");

// query to create a table for rooms (roomId, roomName, capacity)
const createRoomsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS rooms (
      roomId INTEGER PRIMARY KEY AUTOINCREMENT,
      roomName TEXT NOT NULL,
      capacity INTEGER
    )
  `;
  db.prepare(sql).run();
};

// another query to create a table for bookings (bookingId, roomID, date, timeSlot)
const createBookingsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS bookings (
      bookingId INTEGER PRIMARY KEY AUTOINCREMENT,
      roomId INTEGER,
      date TEXT NOT NULL,
      timeSlot TEXT NOT NULL,
      FOREIGN KEY(roomId) REFERENCES rooms(roomId)
    )
  `;
  db.prepare(sql).run();
};

const addRoom = (name, capacity) => {
  const sql = `
    INSERT INTO rooms (roomName, capacity)
    VALUES (?, ?)
  `;
  db.prepare(sql).run(name, capacity);
};

const addBooking = (roomId, date, timeSlot) => {
  const sql = `
    INSERT INTO bookings (roomId, date, timeSlot)
    VALUES (?, ?, ?)
  `;
  db.prepare(sql).run(roomId, date, timeSlot);
};

createRoomsTable();
createBookingsTable();

addRoom("Margret", 4);
addRoom("Steve", 6);
addRoom("Ada", 10);
addRoom("Edmund", 10);
addRoom("Grace", 20);

addBooking(1, "18 okt", "08:00-09:00");
addBooking(2, "19 okt", "09:00-10:00");
addBooking(3, "19 okt", "10:00-11:00");
