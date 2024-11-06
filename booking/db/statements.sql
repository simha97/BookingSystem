CREATE TABLE IF NOT EXISTS Rooms (
            room_id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_name TEXT NOT NULL,
            capacity INTEGER
            )

INSERT INTO Rooms (room_name, capacity) 
VALUES ("Grace", 20)


DROP TABLE bookings