import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';

export async function GET() {
  const db = new Database('db/database.db');

  const sql = `
    SELECT 
      rooms.roomId, 
      rooms.roomName, 
      rooms.capacity, 
      bookings.date, 
      bookings.timeSlot, 
      bookings.name
    FROM bookings
    JOIN rooms ON bookings.roomId = rooms.roomId
  `;
  const bookedSlots = db.prepare(sql).all();

  return NextResponse.json(bookedSlots);
}

export async function POST(request: Request) {
  const db = new Database('db/database.db');
  const { roomId, date, timeSlot, name } = await request.json();

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json(
      {
        success: false,
        message: 'Name is required and must be a valid string.',
      },
      { status: 400 }
    );
  }

  const sql = `
    INSERT INTO bookings (roomId, date, timeSlot, name)
    VALUES (?, ?, ?, ?)
  `;
  db.prepare(sql).run(roomId, date, timeSlot, name);

  return NextResponse.json({ success: true, message: 'Booking successful!' });
}
