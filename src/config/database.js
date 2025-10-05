const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://deepakMelkani07:lADAnExLOH2d0x52@deepak.ygl3gey.mongodb.net/devTinder'); // Added devTinder at the end to connect to that specific database, if not added it will connect to the cluster
};

module.exports = connectDB;
