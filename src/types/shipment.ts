export type ShipmentStatus = "Pending" | "In Transit" | "Delivered" | "Delayed";

export interface Shipment {
  id: string;
  recipient: string;
  bookTitle: string;
  status: ShipmentStatus;
  location: string;
  estimatedArrival: string;
  dateAdded: string; }