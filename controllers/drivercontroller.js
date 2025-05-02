const fs = require('fs');
const path = require('path'); // Add this line to import the 'path' module
const {Driver,VehicleType,DriverDocument} = require('../models/index');

class drivercontroller {

    static driver_list = async (req, res) => {
        try {
            const drivers = await Driver.findAll({
                include: [
                    {
                        model: VehicleType,
                        attributes: [ 'type_name']
                    },
                    {
                        model: DriverDocument,
                        attributes: ['vehicle_number'] // add other fields if needed
                    }
                ]
            });
            res.render("admin/driver_list", { drivers });
        } catch (error) {
            console.log(error);
            res.status(500).send("Something went wrong!");
        }
    };
    
    

}
module.exports = drivercontroller;
