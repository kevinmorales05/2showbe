enum EEventType {
  soccer,
  sports,
  museum,
  park,
  social_event,
  concert,
  teather,
  cars,
  other,
}
export type TEventType = keyof typeof EEventType;

enum EModalityType {
  online,
  presential,
}
export type TModalityType = keyof typeof EModalityType;

