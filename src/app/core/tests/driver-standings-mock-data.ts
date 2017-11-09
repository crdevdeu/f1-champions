export const driverStandingsMockData = {
  MRData: {
    xmlns: 'http:\\/\\/ergast.com\\/mrd\\/1.4',
    series: 'f1',
    url: 'http://ergast.com/api/f1/driverstandings/1.json',
    limit: '30',
    offset: '0',
    total: '67',
    StandingsTable: {
      driverStandings: '1',
      StandingsLists: [
        {
          season: '1979',
          round: '15',
          DriverStandings: [
            {
              position: '1',
              positionText: '1',
              points: '51',
              wins: '3',
              Driver: {
                driverId: 'scheckter',
                url: 'http:\\/\\/en.wikipedia.org\\/wiki\\/Jody_Scheckter',
                givenName: 'Jody',
                familyName: 'Scheckter',
                dateOfBirth: '1950-01-29',
                nationality: 'South African'
              },
              Constructors: [
                {
                  constructorId: 'ferrari',
                  url: 'http:\\/\\/en.wikipedia.org\\/wiki\\/Scuderia_Ferrari',
                  name: 'Ferrari',
                  nationality: 'Italian'
                }
              ]
            }
          ]
        }
      ]
    }
  }
};