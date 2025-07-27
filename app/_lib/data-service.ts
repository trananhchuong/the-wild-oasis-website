import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import { supabase } from "@/app/_lib/supabase";
import { BookingType } from "@/app/_components/ReservationCard";
import { CabinType } from "@/app/_components/CabinCard";

// Base Types
export interface CountryType {
  name: string;
  flag: string;
  independent: boolean;
}


export interface CabinPriceType {
  regularPrice: number;
  discount: number;
}

export interface GuestType {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
}

export interface BookingWithCabinType extends BookingType {
  cabins: {
    name: string;
    image: string;
  };
}

export interface BookingSummaryType {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  };
}

export interface SettingsType {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

// Input Types for CREATE/UPDATE operations
export interface NewGuestInput {
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
}

export interface NewBookingInput {
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status?: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid?: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
}

export interface UpdateGuestInput {
  fullName?: string;
  email?: string;
  nationalID?: string;
  nationality?: string;
  countryFlag?: string;
}

export interface UpdateBookingInput {
  startDate?: string;
  endDate?: string;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  status?: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations?: string;
}

/////////////
// GET

export async function getCabin(id: number): Promise<CabinType> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabinPrice(
  id: number
): Promise<CabinPriceType | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as CabinPriceType;
}

export const getCabins = async function (): Promise<CabinType[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as CabinType[];
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<GuestType | null> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number): Promise<BookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(
  guestId: number
): Promise<BookingWithCabinType[]> {
  const { data, error } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select("*, cabins(name, image)")
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as BookingWithCabinType[];
}

export async function getBookedDatesByCabinId(
  cabinId: number
): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayISO},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking: BookingType) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<SettingsType> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries(): Promise<CountryType[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries: CountryType[] = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: NewGuestInput): Promise<GuestType> {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(
  newBooking: NewBookingInput
): Promise<BookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: number,
  updatedFields: UpdateGuestInput
): Promise<GuestType> {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(
  id: number,
  updatedFields: UpdateBookingInput
): Promise<BookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number): Promise<void> {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
