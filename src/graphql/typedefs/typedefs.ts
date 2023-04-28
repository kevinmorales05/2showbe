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
  isOnline: Boolean
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
enum inEventType {
  soccer
  sports
  museum
  park
  socialevent
  concert
  teather
  cars
  other
}
enum inModalityType {
  online 
   presential
    other
}

""" **eventType:** depict categoryType of an event
**modalityType:** depict [modality] of an event """
input inputOfGetEvent {
  eventType: inEventType
  modalityType: [inModalityType]
}
type outGetEvents {
  eventCategoryID: outOfEventCategory
  ticketTypeID: outOfTicketType
  stageID: outOfStage
  scheduleID: outOfSchedule
  eventDetails: outOfEventDetails
  # eventName: String!
  # artistName: String
  # shortDescription: String!
  # mainDescription: String!
  # dateEvent: String!
  # banners: [outOfBanners]
  # videoImg: String
  # status: String
  # hourEvent: String!
  # urlEvent: String
  # ticketsAvailable: Int
  # modality: [String!]
  # isOnline: Boolean!
  # concertPlacesIMG: String
  # visitorTeam: String
  # homeTeam: String
  # sportType: String
  # id: String!
}
# End to get Events

# Start to get Events Costs
""" **eventID:** to find an event"""
input inputOfGetEventCosts {
  eventID: String!
}
type outOfGetEventCostos {
  eventDetails: outOfEventDetails
  costsAndTicketType: outOfTicketType 
}
# End to get Events Costs


# Start to get User Tickets
input inputOfUserTickets {
  userID: String!
}
type outGetUserTickets {
  userDetails: outOfUser
  buyDetails: outOfBuyDetails
}
type outOfBuyDetails {
  event: [outOfBuyEvent]
}
type outOfBuyEvent {
  buyTicketsDetails: [outOfTicketTypeDetails]
  eventName: String!
  artistName: String
  shortDescription: String!
  mainDescription: String!
  dateEvent: String!
  banners: [outOfBanners]
  videoImg: String
  saleStatus: String
  hourEvent: String!
  urlEvent: String
  ticketsAvailable: Int
  modality: [String!]
  isOnline: Boolean!
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
  _id: String!
}
# End to get Events by User


# Start to get Stage By Address
input inputOfGetStagesByAddress {
  city: String
  country: String
}
type outputOfGetStages {
  address: outOfAddress
  eventCategory: outOfEventCategory
  stageDetails: outOfStageDetails
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
**categoryType**: it could one of them below
      \n
      [
        "soccer",
        "sports",
        "museum",
        "park",
        "social-event",
        "concert",
        "teather",
        "cars",
      ],
"""
input inputOfEventCategory {
  categoryType: inEventType!
  name: String!
  shortDescription: String!
  longDescription: String
  icon: String
  urlImg: String
}

input inputOfTicketType {
  name: String!
  description: String!
  section: String!
  cost: Float!
  currency: String!
  ticketsAvailable: Int!
}
input inputOfStageDetails {
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
input inputOfBannersEvent {
promoVideo: String
bannersUrls: [String]
}
input inputOfEventDetails {
  eventName: String!
  artistName: String
  shortDescription: String!
  mainDescription: String!
  dateEvent: String!
  hourEvent: String!
  banners: [inputOfBannersEvent]
  videoImg: String
  saleStatus: Boolean!
  urlEvent: String
  ticketsAvailable: Int
  modality: [String!]
  isOnline: Boolean!
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
}
input inputEvent {
  stageID: String!
  ticketType: [inputOfTicketType!]
  schedule: [inputOfSchedule!]
  eventDetails: inputOfEventDetails
}

# Start Outputs to create Event
type outCreateEvent {
  eventCategory: [outOfEventCategory]
  ticketType: outOfTicketType
  stage: outOfStage
  schedule: outOfSchedule
  address: outOfAddress
  eventDetails: outOfEventDetails
}
type outOfEventCategory {
  categoryType: String!
  name: String!
  shortDescription: String!
  longDescription: String
  icon: String
  urlImg: String
  id: String!
}
type outOfTicketType {
  ticketTypeDetails: [outOfTicketTypeDetails]
  _id: String!
}
type outOfTicketTypeDetails {
  name: String!
  description: String!
  section: String!
  cost: Float!
  currency: String!
  ticketsAvailable: Int!
  _id: String!
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
  id: String!
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
  scheduleDetails: [outOfScheduleDetails]
  _id: String!
}
type outOfScheduleDetails {
  dayNumber: Int!
  attendFrom: String!
  attendTo: String!
  _id: String!
}
type outOfBanners {
  promoVideo: String
  bannersUrls: [String]
  _id: String!
}
type outOfEventDetails {
  eventName: String!
  artistName: String
  shortDescription: String!
  mainDescription: String!
  dateEvent: String!
  banners: [outOfBanners]
  videoImg: String
  saleStatus: String
  hourEvent: String!
  urlEvent: String
  ticketsAvailable: Int
  modality: [String!]
  isOnline: Boolean!
  concertPlacesIMG: String
  visitorTeam: String
  homeTeam: String
  sportType: String
  _id: String!
}

# End Outputs to create Event
# End to create Event



# Start to create Stage
input inputOfCreateStage {
  eventCategory: inputOfEventCategory
  address: inputOfAddress
  stageDetails: inputOfStageDetails
}
type outputOfCreateStage {
  eventCategory: [outputOfEventCategory]
  address: outOfAddress
  stageDetails: outOfStageDetails
  id: String!
}
type outputOfEventCategory {
  categoryType: String!
  name: String!
  shortDescription: String!
  longDescription: String
  icon: String
  urlImg: String
}

type outOfStageDetails {
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
  id: String!
}
# End to create Stage



# Start to assign or create Ticket to User
"""
**modality:** eg. ["presential", "online", "other"] \n
**seatSection:** eg. "GENERAL" "PREFERENCIAL" "TRIBUNA" "PALCO" \n
**seatName:** example: '23A' '77W' and so forth the seat depict \n
**status:** eg.  "redeemed"   "active"    "noActive"    "outOfDate"\n
**isReserved:** reserving ticket to user.
"""
input inTicketDetails {
  # buyDate: String!
  # ticketCode: String
  modality: [String!]
  seatSection: String!
  seatName: String!
  status: String!
  isReserved: Boolean!
}

"""
**userFirebaseId:** firebaseID user \n
**eventID:** which event gets will asign \n
**ticketDetails:** params to asign a ticket to user
"""
input inputOfCreateTicketToUser {
  userFirebaseID: String!
  eventID: String!
  ticketDetails: inTicketDetails
}
type outOfCreateTicketToUser {
  assignTicketDetails: outOfTicketAvailable
  eventDetails: outOfEventDetails
  userDetails: outOfUser
}
type outOfUser{
  name: String!
  lastName: String!
  firebaseID: String!
  status: Boolean
  _id: String!
}
type outOfTicketAvailable {
  buyDate: String!
  modality: [String]
  seatSection: String!
  seatName: String!
  ticketCode: String!
  status: String!
  isReserved: Boolean!
  _id: String!
}
# End to assign or create Ticket to User

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
"**Search:**create tickets thourhg an event already created"
input inputOfAllowEvent {
  eventID: String!
  saleStatus: Boolean!
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


  # ======= MUTATIONS =========



  # ======= QUERIES && MUTATIONS RESOLVERS =========

  "Query to get all Users"
  type Query {
  getUsers: [User]
  
  "Query to get all Event Categories"
  getEventCategories: [EventCategory]

  "Query to get all Stages with pagination by 10"
  getStages(
    input: inputOfGetStagesByAddress
    offset: Int
    limit: Int
  ): [outputOfGetStages]

  "Query to get all Events with pagination by 5"
  getEvents(input: inputOfGetEvent, offset: Int, limit: Int): [outGetEvents]

  "Query to get events by costs and type of ticket"
  getEventCosts(input: inputOfGetEventCosts): outOfGetEventCostos


  "Query to get a ticket bought by an User"
  getUserTickets(
    input: inputOfUserTickets
    offset: Int
    limit: Int
  ): outGetUserTickets
  
}

# =================================================================

type Mutation {
  "Create an new user for the platform"
  createUser(input: UserInput): String

  "Create an new Event from an Stage already created"
  createEvent(input: inputEvent): outCreateEvent

  "Create ticket automaticatelly from an event already created"
  allowEvent(input: inputOfAllowEvent): String

  "Create an new Stage"
  createStage(input: inputOfCreateStage): outputOfCreateStage

  "Allow to an user can buy a ticket"
  createTicketToUser(input: inputOfCreateTicketToUser): outOfCreateTicketToUser
  # outOfCreateToUser

  "Notifications section"
  sendNotification(input: inputNotification): String
}

  # ======= MAIN QUERIES && MUTATIONS =========
`;
