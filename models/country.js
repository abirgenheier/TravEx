module.exports = function (sequelize, DataTypes) {
    var Trips = sequelize.define("trips", {
        // Giving the Author model a name of type STRING
        country: DataTypes.STRING,
        city: DataTypes.STRING,
        place_one: DataTypes.STRING,
        place_two: DataTypes.STRING,
        place_three: DataTypes.STRING,
        place_four: DataTypes.STRING,
        place_five: DataTypes.STRING
    })
    return Trips;
}
