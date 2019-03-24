"use strict";

export class CloudTravel {

  //constructor to initialise with inputs
  constructor(r = 4000) {
    this.radius = r;
    this.currCordinates = [];
    this.trip = 0.0;
    this.total = 0.0;
    this.counter = 0;
    this.trips = [];
  }

  /*
   * To convert lat/long values in degree to radian
   * @params deg<float>
   * @return radian<float> 
   */
  convrtDegToRedian(deg) {
    return (deg * Math.PI / 180.0);
  }

  /*
   * To save origin and destination cordinates for current calculation
   * @params lat1<float>,lng1<float>,lat2<float>,lng2<float>
   */
  setCordinates(lat1, lng1, lat2, lng2) {
    this.currCordinates = [{ //origin
      lat: this.convrtDegToRedian(lat1),
      lng: this.convrtDegToRedian(lng1)
    }, { //destination
      lat: this.convrtDegToRedian(lat2),
      lng: this.convrtDegToRedian(lng2)
    }];
  }

  /*
   * To calculate the distance between two current cordinates using Great Circle Formula
   */
  calDistance() {
    const lat1 = this.currCordinates[0]['lat'];
    const lon1 = this.currCordinates[0]['lng'];
    const lat2 = this.currCordinates[1]['lat'];
    const lon2 = this.currCordinates[1]['lng'];

    return this.radius * (Math.acos((Math.sin(lat1) * Math.sin(lat2)) + (Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2))));
  }

  /*
   * To check wether given destination can be reached directly fro  current origin or not
   * @params origin<integer>, destination<integer>, canTravel<array>
   * @return <boolean> 
   */
  checkTravelPossible(origin, destination, canTravel) {
    const canTravelArr = canTravel.split(" ");
    return canTravelArr.indexOf(destination.toString()) >= 0 ? true : false;
  }

  /*
   * To check wether given destination has reach from any of the airport or not
   * @params destination<integer>, canTravel<array>
   * @return <boolean> 
   */
  checkRouteAvailable(destination, canTravel) {
    for (let ct of canTravel) {
      let canTravelArr = ct.split(" ");

      if (canTravelArr.indexOf(destination.toString()) >= 0) {
        return true;
        break;
      }
    }

    return false;
  }

  /*
   * To calculate the the distances going through all the possible airports and save it in
   * internal variables for later use
   * @params latitude<float>, longitude<float>, canTravel<array>, origin<integer>, destination<integer>
   */
  calShortPaths(latitude, longitude, canTravel, origin, destination) {
    if (!this.orginalDest) {
      this.orginalDest = destination;
    }


    if (origin == destination) {
      this.trips.push(parseFloat(this.total));
    } else if (this.checkRouteAvailable(destination, canTravel)) {
      if (this.checkTravelPossible(origin, this.orginalDest, canTravel[origin])) {
        //Save the origin and destination cordtinates in radians
        this.setCordinates(latitude[origin], longitude[origin], latitude[destination], longitude[destination]);

        //calulate the distance between two current coordinates
        this.trip = this.calDistance();

        //Calculate Sum
        this.total += this.trip;

        if (destination == this.orginalDest) {
          this.trips.push(parseFloat(this.total));
        }
      } else {
        if (this.counter != 0) {
          origin = destination;
        }
        this.counter++;

        let canTravelArr = canTravel[origin].split(" ");
        for (let i = 0; i < canTravelArr.length; i++) {
          destination = parseInt(canTravelArr[i]);
          this.calShortPaths(latitude, longitude, canTravel, origin, destination);
        }
      }
    }
  }

  /*
   * Function is called publicly to get the shortet courier trip
   * @params latitude<float>, longitude<float>, canTravel<array>, origin<integer>, destination<integer>
   */
  shortestCourierTrip(latitude, longitude, canTravel, origin, destination) {
    this.calShortPaths(latitude, longitude, canTravel, origin, destination);

    if (this.trips.length > 0) { //return the sortest route of all
      return this.trips.sort()[0];
    } else {
      return `-Notice given the available routes, there is no way we can get from airport ${origin} to airport ${destination}`;
    }
  }
}
