export default interface IMilitaryForm {
  ssn: number | undefined,
  lastname: string | undefined,
  firstname: string | undefined,
  positionType: string | undefined,
  orgnum: number | undefined,
  departmentInfo: string | undefined,
  serviceStartDate: Date | undefined,
  serviceEndDate: Date | undefined,
  accidentPeriod: string | undefined,
  accidentTime: string | undefined,
  death: number | undefined,
  injuredBodypart: string | undefined,
  injuryType: string | undefined,
  doctorContacted: number | undefined,
  mandatoryService: number | undefined,
  accidentPlace: string | undefined,
  accidentPlaceDescription: string | undefined,
  accidentCause: string | undefined,
  accidentBackground: string | undefined,
  feltmessigForhold: number | undefined
  accidentDescription: string | undefined
}
