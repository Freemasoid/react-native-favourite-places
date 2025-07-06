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

export async function fetchPlaces(): Promise<Place[]> {
  const db = await getDb();

  const result = await db.getAllAsync(`SELECT * FROM places`);

  return result.map((row: any) => ({
    id: row.id.toString(),
    title: row.title,
    imageUri: row.imageUri,
    address: row.address,
    location: {
      lat: row.lat,
      lng: row.lng,
    },
  }));
}

export async function fetchPlaceDetails(id: string): Promise<Place> {
  const db = await getDb();

  const result = await db.getAllAsync(`SELECT * FROM places WHERE id = ?`, [
    id,
  ]);

  if (result.length === 0) {
    throw new Error(`Place with id ${id} not found`);
  }

  const row = result[0] as any;

  return {
    id: row.id.toString(),
    title: row.title,
    imageUri: row.imageUri,
    address: row.address,
    location: {
      lat: row.lat,
      lng: row.lng,
    },
  };
}
