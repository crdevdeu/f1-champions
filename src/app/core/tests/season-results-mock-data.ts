export const seasonResultsMockData = {
  MRData: {
    xmlns: 'http:\\/\\/ergast.com\\/mrd\\/1.4',
    series: 'f1',
    url: 'http://ergast.com/api/f1/2009/results/1.json',
    limit: '30',
    offset: '0',
    total: '17',
    RaceTable: {
      season: '2009',
      position: '1',
      Races: [
        {
          season: '2009',
          round: '17',
          url: 'http:\\/\\/en.wikipedia.org\\/wiki\\/2009_Abu_Dhabi_Grand_Prix',
          raceName: 'Abu Dhabi Grand Prix',
          Circuit: {
            circuitId: 'yas_marina',
            url: 'http://en.wikipedia.org/wiki/Yas_Marina_Circuit',
            circuitName: 'Yas Marina Circuit',
            Location: {
              lat: '24.4672',
              long: '54.6031',
              locality: 'Abu Dhabi',
              country: 'UAE'
            }
          },
          date: '2009-11-01',
          time: '11:00:00Z',
          Results: [
            {
              number: '15',
              position: '1',
              positionText: '1',
              points: '10',
              Driver: {
                driverId: 'vettel',
                permanentNumber: '5',
                code: 'VET',
                url: 'http:\\/\\/en.wikipedia.org\\/wiki\\/Sebastian_Vettel',
                givenName: 'Sebastian',
                familyName: 'Vettel',
                dateOfBirth: '1987-07-03',
                nationality: 'German'
              },
              Constructor: {
                constructorId: 'red_bull',
                url: 'http:\\/\\/en.wikipedia.org\\/wiki\\/Red_Bull_Racing',
                name: 'Red Bull',
                nationality: 'Austrian'
              },
              grid: '2',
              laps: '55',
              status: 'Finished',
              Time: {
                millis: '5643414',
                time: '1:34:03.414'
              },
              FastestLap: {
                rank: '1',
                lap: '54',
                Time: {
                  time: '1:40.279'
                },
                AverageSpeed: {
                  units: 'kph',
                  speed: '199.387'
                }
              }
            }
          ]
        }
      ]
    }
  }
};
