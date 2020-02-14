export interface Booking {
  _id?: number
  entityName: String
  entityType?: String

  username?: String;
  firstName?: String;
  lastName?:String;
  userPhoneNumber?: String;
  userAddress?: String

  ticketsBooked?: Number
  totalBookingPrice?: Number
  bookingId?: String

  cardName?:String
  cardNo?:String

}
