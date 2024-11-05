import { NextResponse } from "next/server";
import Database from "better-sqlite3";

export async function GET() {
  const db = new Database("db/database.db");

  // Query to get all booked slots
  const sql = `
      SELECT rooms.roomName, rooms.capacity, bookings.date, bookings.timeSlot
      FROM bookings
      JOIN rooms ON bookings.roomId = rooms.roomId
    `;
  const bookedSlots = db.prepare(sql).all();

  return NextResponse.json(bookedSlots);
}
