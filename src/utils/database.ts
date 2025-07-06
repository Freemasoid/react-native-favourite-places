import { Place } from "@/types/types";
import * as SQLite from "expo-sqlite";

let database: SQLite.SQLiteDatabase | null = null;

export async function initDb() {
  database = await SQLite.openDatabaseAsync("places.db");

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )
  `);
}

async function getDb() {
  if (!database) {
    await initDb();
  }
  return database!;
}

export async function insertPlace(place: Place) {
  const db = await getDb();

  await db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [
      place.title,
      place.imageUri,
      place.address || "",
      place.location.lat,
      place.location.lng,
    ]
  );
}
