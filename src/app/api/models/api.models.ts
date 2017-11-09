export interface DriverStandingsData {
  MRData: DriverStandingsMRData;
}

export interface DriverStandingsMRData {
  StandingsTable: DriverStandingsTable;
  limit: string;
  offset: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
}

export interface DriverStandingsTable {
  driverStandings: string;
  StandingsLists: DriverStandingsResults[];
}

export interface DriverStandingsResults {
  season: string;
  round: string;
  DriverStandings: DriverStandings[];
  driverData?: Driver;
}

export interface DriverStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructors: Object[];
  Driver: Driver;
}

export interface Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
}

export interface SeasonResultsData {
  MRData: SeasonResultsMRData;
}

export interface SeasonResultsMRData {
  RaceTable: RaceTable;
  limit: string;
  offset: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
}

export interface RaceTable {
  Races: Race[];
  position: string;
  season: string;
}

export interface Race {
  Circuit: Object;
  Results: any[];
  date: string;
  raceName: string;
  round: string;
  season: string;
  time: string;
  url: string;
  winner?: string;
}

export interface FilteredSeasonResults {
  races: Race[];
  season: number;
  totalItems: number;
}

