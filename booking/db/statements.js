import Database from 'better-sqlite3';

const db = new Database('database.db');

/*const dropTables = () => {
  const dropBookings = `DROP TABLE IF EXISTS bookings`;

  db.prepare(dropBookings).run();
};*/

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

const createBookingsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS bookings (
      bookingId INTEGER PRIMARY KEY AUTOINCREMENT,
      roomId INTEGER,
      date TEXT NOT NULL,
      timeSlot TEXT NOT NULL,
      name TEXT NOT NULL,
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

const addBooking = (roomId, date, timeSlot, name) => {
  const sql = `
    INSERT INTO bookings (roomId, date, timeSlot, name)
    VALUES (?, ?, ?, ?)
  `;
  db.prepare(sql).run(roomId, date, timeSlot, name);
};

//dropTables();
createRoomsTable();
createBookingsTable();

addRoom('Margret', 4);
addRoom('Steve', 6);
addRoom('Ada', 10);
addRoom('Edmund', 10);
addRoom('Grace', 20);

addBooking(1, '18 okt', '08:00-09:00', 'Eva');
addBooking(2, '19 okt', '09:00-10:00', 'Martin');
addBooking(3, '19 okt', '10:00-11:00', 'Lukas');

console.log('Tables reset and data added successfully.');
