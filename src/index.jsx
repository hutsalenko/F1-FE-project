import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

// http[s]://ergast.com/api/<series>/<season>/<round>/...

//Season List
//http://ergast.com/api/f1/seasons
//http://ergast.com/api/f1/drivers/alonso/constructors/renault/seasons
//http://ergast.com/api/f1/drivers/alonso/driverStandings/1/seasons
//http://ergast.com/api/f1/constructors/renault/constructorStandings/1/seasons

//Qualifying Results
//http://ergast.com/api/f1/2008/5/qualifying
//http://ergast.com/api/f1/2008/drivers/alonso/qualifying
//http://ergast.com/api/f1/drivers/alonso/constructors/renault/qualifying
//http://ergast.com/api/f1/2008/qualifying/1

//Constructor Information
//http://ergast.com/api/f1/constructors
//http://ergast.com/api/f1/2010/constructors
//http://ergast.com/api/f1/2010/2/constructors
//http://ergast.com/api/f1/constructors/mclaren
//http://ergast.com/api/f1/drivers/alonso/circuits/monza/constructors
//http://ergast.com/api/f1/constructorStandings/1/constructors

//Lap Times
//http://ergast.com/api/f1/2011/5/laps/1
//http://ergast.com/api/f1/2011/5/drivers/alonso/laps/1

//Race Schedule
//http://ergast.com/api/f1/2012
//http://ergast.com/api/f1/current
//http://ergast.com/api/f1/2008/5
//http://ergast.com/api/f1/drivers/alonso/circuits/monza/races

//Standings
//http://ergast.com/api/f1/2008/5/driverStandings
//http://ergast.com/api/f1/2008/5/constructorStandings
//http://ergast.com/api/f1/2008/driverStandings
//http://ergast.com/api/f1/2008/constructorStandings
//http://ergast.com/api/f1/current/driverStandings
//http://ergast.com/api/f1/current/constructorStandings
//http://ergast.com/api/f1/driverStandings/1
//http://ergast.com/api/f1/constructorStandings/1
//http://ergast.com/api/f1/drivers/alonso/driverStandings
//http://ergast.com/api/f1/constructors/renault/constructorStandings

//Circuit Information
//http://ergast.com/api/f1/circuits
//http://ergast.com/api/f1/2010/circuits
//http://ergast.com/api/f1/2010/2/circuits
//http://ergast.com/api/f1/circuits/monza
//http://ergast.com/api/f1/drivers/alonso/constructors/mclaren/circuits

//Pit Stops
//http://ergast.com/api/f1/2011/5/pitstops
//http://ergast.com/api/f1/2011/5/pitstops/1
//http://ergast.com/api/f1/2011/5/drivers/alonso/pitstops

//Race Results
//http://ergast.com/api/f1/2008/5/results
//http://ergast.com/api/f1/current/last/results
//http://ergast.com/api/f1/2008/drivers/alonso/results
//http://ergast.com/api/f1/drivers/alonso/constructors/renault/results
//http://ergast.com/api/f1/2008/drivers/alonso/results/2
//http://ergast.com/api/f1/2008/results/1
//http://ergast.com/api/f1/2010/1/fastest/1/results

//Driver Information
//http://ergast.com/api/f1/drivers
//http://ergast.com/api/f1/2010/drivers
//http://ergast.com/api/f1/2010/2/drivers
//http://ergast.com/api/f1/drivers/alonso
//http://ergast.com/api/f1/constructors/mclaren/circuits/monza/drivers
//http://ergast.com/api/f1/driverStandings/1/drivers

//Finishing Status
//http://ergast.com/api/f1/status
//http://ergast.com/api/f1/2010/status
//http://ergast.com/api/f1/2010/2/status
//http://ergast.com/api/f1/2008/drivers/alonso/status
