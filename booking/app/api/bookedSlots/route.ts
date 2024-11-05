import { NextResponse } from "next/server";
import Database from "better-sqlite3";

export async function GET() {
  const db = new Database("db/database.db");

  const sql = `
      SELECT rooms.roomName, rooms.capacity, bookings.date, bookings.timeSlot
      FROM bookings
      JOIN rooms ON bookings.roomId = rooms.roomId
    `;
  const bookedSlots = db.prepare(sql).all();

  return NextResponse.json(bookedSlots);
}
export async function POST(request: Request) {
  const db = new Database("db/database.db");
  const { roomId, date, timeSlot } = await request.json();

  const sql = `
    INSERT INTO bookings (roomId, date, timeSlot)
    VALUES (?, ?, ?)
  `;
  db.prepare(sql).run(roomId, date, timeSlot);

  return NextResponse.json({ success: true, message: "Booking successful!" });
}
