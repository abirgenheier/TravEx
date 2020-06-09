module.exports = function (sequelize, DataTypes) {
    var Trips = sequelize.define("Trips", {
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        place_one: DataTypes.STRING,
    })

    return Trips;

}