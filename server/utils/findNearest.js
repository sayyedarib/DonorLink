const volunteerData = require("../models/volunteerRegistration");
const geolib = require("geolib");

module.exports = async function findNearest(coordinates) {
  const volunteers = await volunteerData.find();
  const volunteerWithDistance = volunteers.map((data) => {
    const volunteerCoordinate = JSON.parse(data.coordinates);
    const donorCoordinate = JSON.parse(coordinates)
    console.log("v coord ", volunteerCoordinate, "d coord ", donorCoordinate)
    const distance = geolib.getDistance(donorCoordinate, volunteerCoordinate, accuracy=0.01);
    console.log("distance", distance);
    return {
      volunteer: data,
      distance: distance,
    };
  });

  volunteerWithDistance.sort((a, b) => a.distance - b.distance);

  return volunteerWithDistance;
};
