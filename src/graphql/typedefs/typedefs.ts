export const typeDefs = `#graphql
"Here declaring us the types "
  #types
  type Address {
  city: String!
  country: String!
  state: String!
  mainStreet: String!
  secondStreet: String
  numberStreet: String!
  reference: String!
  lat: String!
  long: String!
  languages: [String]
  mapsURL: String
}
type Event {
  eventCategoryID: EventCategory
  stageID: Stage
  scheduleID: Schedule
  eventName: String!
  artistName: String!
  shortDescription: String!
  mainDescription: String!
  banners: [String]
  videoImg: String
  status: String
  dateEvent: String!
  hourEvent: String
  urlEvent: String
  ticketsAvailable: Int
  online: Boolean
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
}
type EventCategory {
  eventID: [String]
  name: String
  shortDescription: String
  longDescription: String
  icon: String
  urlImg: String
}
type EventCost {
  name: String!
  eventID: [String]!
  description: String!
  section: String!
  cost: Int!
  ticketsAvailable: Int!
}
type EventType {
  name: String!
  description: String!
  icon: String
  urlImage: String
}
type FiscalData {
  city: String!
  country: String!
  state: String!
  mainStreet: String!
  secondStreet: String
  number: String!
  fiscalNumber: String!
  telephone: String!
  email: String!
  fullFiscalName: String!
}
type Invoicing {
  userID: [String!]!
  fiscalDataID: [String]!
  eventID: [String]!
  eventCostID: [String]!
  totalCost: Float!
  subtotalCost: Float!
  IVA: Float!
  ivaTotal: Float!
}
type Schedule {
  eventID: [String]
  dayNumber: Int!
  attendFrom: String!
  attendTo: String!
}
type Stage {
  addressID: [String]
  eventCategoryID: [String]
  name: String!
  description: String!
  longDescription: String!
  banners: [String!]
  videoURL: String
  capacity: Int
  openFrom: String!
  closeTo: String!
  daysOpen: [Int]
  onlineLink: String
}
type TicketsAvailable {
  userID: [String]!
  eventID: [String]!
  ticketTypeID: [String]
  buyDate: String!
  type: String
  ticketCode: String
  seatName: String
  status: String
  isReserved: Boolean
}
type TicketType {
  eventID: [String]!
  name: String!
  description: String!
  section: String!
  cost: String!
  currency: String!
  ticketsAvailable: String!
}
type User {
  name: String!
  lastName: String!
  firebaseID: [String]!
  email: String!
  status: Boolean
  birthday: String
  role: String
  telephone: String
  fullAddress: String
  country: String
  city: String
  gender: String
  profileImg: String
}
type UserEvent {
  userID: [String]!
  eventID: [String]!
  eventCostID: [String]!
}

"values with *!* are required"
#inputs
input UserInput {
  name: String!
  lastName: String!
  firebaseID: String!
  email: String!
  status: Boolean
  birthday: String
  role: String
  telephone: String
  fullAddress: String
  country: String
  city: String
  gender: String
  profileImg: String
}
"Definining objects for the inputs EVENT"
input inputOfEventCategory {
  name: String
  shortDescription: String
  longDescription: String
  icon: String
  urlImg: String
}

interface interfaceAddress{
  city: String!
  country: String!
  mainStreet: String!
  numberStreet: String!
  state: String
  secondStreet: String
  reference: String
  lat: String
  long: String
  languages: [String]
  mapsURL: String
}

input inputOfStage {
  name: String!
  description: String!
  longDescription: String!
  banners: [String!]
  videoURL: String
  capacity: Int
  openFrom: String!
  closeTo: String!
  daysOpen: [Int]
  onlineLink: String
}

input inputOfEventAddress {
  city: String!
  country: String!
  mainStreet: String!
  numberStreet: String!
  state: String
  secondStreet: String
  reference: String
  lat: String
  long: String
  languages: [String]
  mapsURL: String
}

input inputOfSchedule {
  dayNumber: Int!
  attendFrom: String!
  attendTo: String!
}

input inputOfEventProps {
  eventName: String!
  artistName: String!
  shortDescription: String!
  mainDescription: String!
  dateEvent: String!
  banners: [String]
  videoImg: String
  status: String
  hourEvent: String
  urlEvent: String
  ticketsAvailable: Int
  online: Boolean
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
}
"Describing EventInput"
input EventInput {
  eventCategoryID: inputOfEventCategory
  stageID: inputOfStage
  scheduleID: inputOfSchedule
  eventProps: inputOfEventProps
}

#separation...............................

input EventTypeOnline {
  online: Boolean
}
input AddressInput{
  city: String!
  country: String!
  state: String!
  mainStreet: String!
  secondStreet: String
  numberStreet: String!
  reference: String!
  lat: String!
  long: String!
  languages: [String]
  mapsURL: String
}
input EventCategoryInput{
  name: String
  shortDescription: String
  longDescription: String
  icon: String
  urlImg: String
}


input StageInput {
  addressID: AddressInput
  eventCategoryID: EventCategoryInput
  name: String!
  description: String!
  longDescription: String!
  banners: [String!]
  videoURL: String
  capacity: Int
  openFrom: String!
  closeTo: String!
  daysOpen: [Int]
  onlineLink: String
}
input StageInputByAddress {
  city: String
  country: String
}
input DetailEventInput {
  costs: String
  typeTicket: String
}

input StateInput{
  state: String
}

input inputNotification {
  title: String
  body: String
  logo: String
  urlDynamic: String
}

#outputs
type UpdatedOutput {
  message: String
  UpdatedUser: User
}

type OutputEventCategory {
  eventID: [String!]
  name: String
  shortDescription: String
  longDescription: String
  icon: String
  urlImg: String
}

type Query {
  """
  Description for field
  Supports **multi-line** description for your [API](http://example.com)!
  ###la cuquita de la Diana rayos
  [x] exit
  [-] exit
  """
  getUsers: [User]
  getEvents(input: EventTypeOnline): [Event]
  getStages(input: StageInputByAddress): [Stage]
  "Category by Event only data"
  getEventCategories: [EventCategory]
  getDetailEvent(input: DetailEventInput): [Event]
}
type Mutation {
  #Users
  createUser(input: UserInput): String
  updateUser(input: UserInput): [UpdatedOutput]

  #Events
  createEvent(input: EventInput): Event
  updateEvent(input: UserInput): [UpdatedOutput]

  #Stages
  createStage(input: StageInput): [Stage]

  #Assing Ticket to User
  createTicketToUser(input: UserInput): TicketType

  #Update State
  updateState(input: StateInput): Event


  #Notifications
  sendNotification(input: inputNotification): String
}

`;
