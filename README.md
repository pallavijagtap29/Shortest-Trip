# Shortest-Trip
Shortest-Trip

### Prerequisites

* ES6 ( Using babel-register )
* NodeJS ( version >= 6 )
* Express

### Getting Started

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot
git clone https://github.com/pallavijagtap29/Shortest-Trip.git
# Change directory
cd Shortest-Trip
# Install NPM dependencies
npm install
# Then simply start your app
node server.js
# Note: This code will run on 3000 port by default. To change this port Go to config > config.js and here change Port:<any port number>
```
### Test Cases

```sh
1.URL: http://localhost:3000
  Method: GET
  parameters: {
        latArr:[0, 0, 70],
        longArr:[90, 0, 45],
        canTravelArr:["2", "0 2","0 1"],
        start:0,
        dest:1
    }
  Example: http://localhost:3000?latArr=0, 0, 70&longArr=90, 0, 45&canTravelArr="2", "0 2","0 1"&start=0&dest=1
  Output: 10612.237799994255

2.URL: http://localhost:3000
  Method: GET
  QueryString parameters: {
        latArr:[0, 0, 70],
        longArr:[90, 0, 45],
        canTravelArr:["1 2", "0 2","0 1"],
        start:0,
        dest:1
    }
  Example: http://localhost:3000?latArr=0, 0, 70&longArr=90, 0, 45&canTravelArr="1 2", "0 2","0 1"&start=0&dest=1
  Output: 6283.185307179586

3.URL: http://localhost:3000
  Method: GET
  QueryString parameters: {
        latArr:[0, 30, 60],
        longArr:[25, -130, 78],
        canTravelArr:["1 2", "0 2","1 2"],
        start:0,
        dest:0
    }
  Example: http://localhost:3000?latArr=0, 30, 60&longArr=25, -130, 78&canTravelArr="1 2", "0 2","1 2"&start=0&dest=0
  Output: 0

3.URL: http://localhost:3000
  Method: GET
  QueryString parameters: {
        latArr:[0,20,55],
        longArr:[-20,85,42],
        canTravelArr:["1", "0","0"],
        start:0,
        dest:2
    }
  Example: http://localhost:3000?latArr=0,20,55&longArr=-20,85,42&canTravelArr="1", "0","0"&start=0&dest=2
  Output: -Notice given the available routes, there is no way we can get from airport 0 to airport 2
  
```