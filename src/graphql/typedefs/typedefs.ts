export const typeDefs = `#graphql
  
  # ======= TYPES =========
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
  online: String
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
}
type EventCategory {
  id: String!
  categoryType: String!
  name: String!,
  shortDescription: String!,
  longDescription: String,
  icon: String,
  urlImg: String,
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
type UserEvent {
  userID: [String]!
  eventID: [String]!
  eventCostID: [String]!
}
  
  # ======= TYPES =========


  # ======= QUERIES =========
# Start to get Events
enum categoryOfEvent {
  SOCCER
  SPORTS
  MUSEUM
  PARK
  SOCIALEVENT
  CONCERT
  TEATHER
  CARS
}
enum enumTypeOfModality {
  ONLINE
  PRESENTIAL
}
input inputOfGetEvent {
  categoryOfEvent: categoryOfEvent
  typeOfModality: enumTypeOfModality
}
type outGetEvents {
  eventCategoryID: outOfEventCategory
  ticketTypeID: outOfTicketType
  stageID: outOfStage
  scheduleID: outOfSchedule
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
  online: String
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
}
# End to get Events

# Start to get Events by User
input inOfGetEventByUser {
  name: String!
  firebaseID: String
}
input inputOfGetEventByUser {
  user: inOfGetEventByUser
}
type outGetEventByUser {
  user: User
  event: Event
  eventCost: EventCost
}
# End to get Events by User

# Start to get Stage By Address
input inputOfGetStagesByAddress {
  city: String
  country: String
}
type outputOfGetStages {
  addressID: outOfAddress
  eventCategoryID: outOfEventCategory
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
# End to get Stage By Address

# Start DetailEventInput
input DetailEventInput {
  costs: String
  typeTicket: String
}
# End DetailEventInput


# Start Notifications
input inputNotification {
  title: String
  body: String
  logo: String
  urlDynamic: String
}
# End Notifications

  # ======= QUERIES =========



  # ======= MUTATIONS =========

# Start to create Event
"""
[x]**categoryType**: soccer, sports, museum, park, social-event, concert, teather, cars."
"""
input inputOfEventCategory {
  categoryType: categoryOfEvent!
  name: String!
  shortDescription: String!
  longDescription: String
  icon: String
  urlImg: String
}

"[x]**ticketsAvailable**: 'yes' or 'no' "
input inputOfTicketType {
  name: String!
  description: String!
  section: String!
  cost: Float!
  currency: String!
  ticketsAvailable: String!
}
input inputOfStage {
  address: inputOfAddress
  name: String!
  description: String!
  longDescription: String!
  openFrom: String!
  closeTo: String!
  banners: [String!]
  videoURL: String
  capacity: Int
  daysOpen: [Int]
  onlineLink: String
}
input inputOfAddress {
  city: String!
  country: String!
  state: String!
  mainStreet: String!
  numberStreet: String!
  reference: String!
  lat: String!
  long: String!
  secondStreet: String
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
  online: String
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
}
input EventInput {
  eventCategory: inputOfEventCategory
  ticketType: inputOfTicketType
  stage: inputOfStage
  schedule: inputOfSchedule
  address: inputOfAddress
  eventProps: inputOfEventProps
}
# End to create Event

# Start to create Stage
input intputOfCreateStage {
  eventCategory: inputOfEventCategory
  address: inputOfAddress
  stageParams: inputOfStage
}
type outputOfCreateStage {
  eventCategory: outputOfEventCategory
  address: outOfAddress
  stageParams: outOfStageParams
}
type outputOfEventCategory {
  name: String
  shortDescription: String
  longDescription: String
  icon: String
  urlImg: String
}
type outOfStageParams {
  name: String!
  description: String!
  longDescription: String!
  openFrom: String!
  closeTo: String!
  banners: [String!]
  videoURL: String
  capacity: Int
  daysOpen: [Int]
  onlineLink: String
}
# End to create Stage

# Start Output to create Event
type outCreateEvent {
  eventCategoryRef: outOfEventCategory
  ticketTypeRef: outOfTicketType
  stageRef: outOfStage
  scheduleRef: outOfSchedule
  addressRef: outOfAddress
  eventPropsRef: outOfEventProps
}
type outOfEventCategory {
  categoryType: String!
  name: String!
  shortDescription: String!
  longDescription: String
  icon: String
  urlImg: String
}
type outOfTicketType {
  name: String!
  description: String!
  section: String!
  cost: Float!
  currency: String!
  ticketsAvailable: String!
}
type outOfStage {
  address: outOfAddress
  name: String!
  description: String!
  longDescription: String!
  openFrom: String!
  closeTo: String!
  banners: [String!]
  videoURL: String
  capacity: Int
  daysOpen: [Int]
  onlineLink: String
}
type outOfAddress {
  city: String!
  country: String!
  state: String!
  mainStreet: String!
  numberStreet: String!
  reference: String!
  lat: String!
  long: String!
  secondStreet: String
  languages: [String]
  mapsURL: String
}
type outOfSchedule {
  dayNumber: Int!
  attendFrom: String!
  attendTo: String!
}
type outOfEventProps {
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
  online: String
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
}
# End Output to create Event

# Start to create Event to User
"To create a ticket is necessary to find an searchEvent with the param: **search** by **name** and user by **name**"
input inUser {
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
input inTicketProps {
  buyDate: String!
  type: String
  ticketCode: String
  seatName: String
  status: String
  isReserved: Boolean
}
"To create a ticket is necessary to find an event with the param: **search** by **name** and User by **name** for the moment name"
input inSearchEvent {
  name: String
  eventID: String
}
input inputOfCreateTicket {
  searchUser: inUser
  searchEvent: inSearchEvent
  ticketProps: inTicketProps
}
type outOfTicketAvailable {
  userID: String
  eventID: String
  ticketTypeID: String
  buyDate: String!
  type: String
  ticketCode: String
  seatName: String
  status: String
  isReserved: Boolean
}
# End to create Event to User

# Start to allowEvent
enum ticketTypeSoccer {
  GENERAL
  PREFERENCIAL
  TRIBUNA
  PALCO
}
enum catalogSports {
  Basketball
  EcuaVolley
  Fights
  Horses
  Other
}
enum ticketTypeSports {
  GENERAL
  PREFERENCIAL
  TRIBUNA
  PALCO
}
enum ticketTypeMuseums {
  GENERAL
}
enum ticketTypeNationalParks {
  GENERAL
}
enum ticketTypeSocialEvents {
  GENERAL
  PREFERENCIAL
}
enum ticketTypeConcerts {
  GENERAL
  PREFERENCIAL
  BUTACA
  GOLDEN_BOX
  TOP_BOX
  PREMIUM_BOX
}
enum ticketTypeTeathers {
  START_BOX
  BUTACAS_VIP
  PLATEA_BAJA
  LUNETA_BAJA
  LUNETA_ALTA
}
enum ticketTypeCars {
  GENERAL
  PREFERENCIAL
}
input inCreateTicketsSoccer {
  list: [ticketTypeSoccer]
  quantity: [Int!]!
  nameSpecific: [String]
}
input inCreateTicketsSports {
  list: [ticketTypeSports]
  quantity: [String!]!
  nameSpecific: [String]
}
input inCreateTicketsMuseums {
  list: ticketTypeMuseums
  quantity: [String!]!
  nameSpecific: [String]
}
input inCreateTicketsNationalParks {
  list: ticketTypeNationalParks
  quantity: [String!]!
  nameSpecific: [String]
}
input inCreateTicketsSocialEvents {
  list: ticketTypeSocialEvents
  quantity: [String!]!
  nameSpecific: [String]
}
input inCreateTicketsConcerts {
  list: ticketTypeConcerts
  quantity: [String!]!
  nameSpecific: [String]
}
input inCreateTicketsTeathers {
  list: ticketTypeTeathers
  quantity: [String!]!
  nameSpecific: [String]
}
input inCreateTicketsCars {
  list: ticketTypeCars
  quantity: [String!]!
  nameSpecific: [String]
}
input inTicketsToCreate {
  soccers: inCreateTicketsSoccer
  sports: inCreateTicketsSports
  museums: inCreateTicketsMuseums
  nationalParks: inCreateTicketsNationalParks
  socialEvents: inCreateTicketsSocialEvents
  concerts: inCreateTicketsConcerts
  teathers: inCreateTicketsTeathers
  cars: inCreateTicketsCars
}
input inputOfAllowEvent {
  searchEventByID: String!
  status: String!
  amountTicketToCreate: inTicketsToCreate
}
# End to allowEvent


#Start to create user
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
# End to create user


# Start to testing
input inputOfTesting {
    in: [String!]!
}
# End to testing


  # ======= MUTATIONS =========



  # ======= MAIN QUERIES && MUTATIONS =========
  type Query {
  getUsers: [User]

  #Get Events
  getEventCategories: [EventCategory]

  getEvents(input: inputOfGetEvent, offset: Int, limit: Int): [outGetEvents]

  getEventByUser(
    input: inputOfGetEventByUser
    offset: Int
    limit: Int
  ): outGetEventByUser

  getStages(
    input: inputOfGetStagesByAddress
    offset: Int
    limit: Int
  ): [outputOfGetStages]

  getDetailEvent(input: DetailEventInput): [Event]
}

# =================================================================

type Mutation {
  #Users
  createUser(input: UserInput): String

  #Events
  createEvent(input: EventInput): outCreateEvent

  testing(input: inputOfTesting): String

  #Stages
  createStage(input: intputOfCreateStage): outputOfCreateStage

  #Assing Ticket to User
  createTicketToUser(input: inputOfCreateTicket): outOfTicketAvailable

  #Update State
  allowEvent(input: inputOfAllowEvent): String

  #Notifications
  sendNotification(input: inputNotification): String
}

  # ======= MAIN QUERIES && MUTATIONS =========
`;
