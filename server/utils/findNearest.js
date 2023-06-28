const volunteerData = require("../models/volunteerSchema");
const bloodDonationData = require("../models/donation/bloodDonation")
const geolib = require("geolib");

module.exports = async function findNearest(coordinates, who) {
  if (who == "volunteer") {
    const volunteers = await volunteerData.find();
    const volunteerWithDistance = volunteers.map((data) => {
      const volunteerCoordinate = JSON.parse(data.coordinates);
      const donorCoordinate = JSON.parse(coordinates)
      console.log("v coord ", volunteerCoordinate, "d coord ", donorCoordinate, "name ", data.name)
      const distance = geolib.getDistance(donorCoordinate, volunteerCoordinate, accuracy = 0.01);
      console.log("distance", distance);
      return {
        volunteer: data,
        distance: distance,
      };
    });

    await volunteerWithDistance.sort((a, b) => Number(a.distance) - Number(b.distance));


    return volunteerWithDistance;
  }

  else if (who == "bloodDonor") {
    const donors = await bloodDonationData.find();
    const donorsWithDistance = donors.map((data) => {
      const donorsCoordinate = JSON.parse(data.coordinates);
      const receiversCoordinate = JSON.parse(coordinates)
      console.log("v coord ", donorsCoordinate, "d coord ", receiversCoordinate, "name ", data.name)
      const distance = geolib.getDistance(receiversCoordinate, donorsCoordinate, accuracy = 0.01);
      console.log("distance", distance);
      return {
        donor: data,
        distance: distance,
      };
    });

    await donorsWithDistance.sort((a, b) => Number(a.distance) - Number(b.distance));


    return donorsWithDistance;
  }
};
