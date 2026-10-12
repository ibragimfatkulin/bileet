export type SeatZone = "standard" | "comfort" | "vip";

export interface Seat {
  id: string;
  row: string;
  number: number;
  zone: SeatZone;
  price: number;
  occupied: boolean;
}

export interface Session {
  id: string;
  movieId: string;
  cinemaName: string;
  date: string;
  time: string;
  hallLabel: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  durationMin: number;
  ageRating: string;
  genre: string;
  description: string;
  posterPath: string;
  sessions: Session[];
}

export interface CartSeat {
  id: string;
  row: string;
  number: number;
  zone: SeatZone;
  price: number;
}

export interface CartLine {
  lineId: string;
  sessionId: string;
  movieId: string;
  movieTitle: string;
  cinemaName: string;
  date: string;
  time: string;
  seats: CartSeat[];
}

export interface BookingRequest {
  name: string;
  email: string;
  sessionId: string;
  seatIds: string[];
}

export interface BatchBookingRequest {
  name: string;
  email: string;
  items: { sessionId: string; seatIds: string[] }[];
}

export interface BookingResult {
  orderId: string;
  name: string;
  email: string;
  total: number;
  lines: {
    sessionId: string;
    movieTitle: string;
    cinemaName: string;
    date: string;
    time: string;
    seats: CartSeat[];
    subtotal: number;
  }[];
  createdAt: string;
}
