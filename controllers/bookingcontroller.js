const { Driver, VehicleType, Ride, User, DriverDocument, Rating_Reviews } = require('../models/index');

class bookingcontroller {
    // Existing booking_list function
    static booking_list = async (req, res) => {
        try {
            const bookings = await Ride.findAll({
                include: [
                    {
                        model: Driver,
                        attributes: ['id', 'name'], // Include driver name
                        include: [
                            {
                                model: DriverDocument,
                                attributes: ['vehicle_number']
                            },
                            {
                                model: VehicleType,
                                attributes: ['type_name']
                            }
                        ]
                    },
                    {
                        model: User,
                        attributes: ['name', 'email']
                    },
                    {
                        model: Rating_Reviews,  // Include the Rating_Reviews model
                        attributes: ['rated_by_driver', 'rated_by_user', 'reviewed_by_user', 'reviewed_by_driver']  // Add necessary rating and review fields
                    }
                ]
            });

            // Send the complete array to the view
            res.render("admin/booking_list", { bookings });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error fetching booking data");
        }
    }

    // New booking_details function
    static booking_details = async (req, res) => {
        try {
            const bookingId = req.params.id; // Get the booking ID from the request parameters
            
            const booking = await Ride.findOne({
                where: { id: bookingId },
                include: [
                    {
                        model: Driver,
                        attributes: ['id', 'name','phone'], 
                        include: [
                            {
                                model: DriverDocument,
                                attributes: ['vehicle_number']
                            },
                            {
                                model: VehicleType,
                                attributes: ['type_name']
                            }
                        ]
                    },
                    {
                        model: User,
                        attributes: ['name', 'phone']
                    },
                    {
                        model: Rating_Reviews,  
                        attributes: ['rated_by_driver', 'rated_by_user', 'reviewed_by_user', 'reviewed_by_driver'] 
                    }
                ]
            });

            if (!booking) {
                return res.status(404).send("Booking not found");
            }

            // Send the booking details to the view
            console.log(booking)
            res.render("admin/booking_details", { booking });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error fetching booking details");
        }
    }
}

module.exports = bookingcontroller;
