const fs = require('fs');
const path = require('path'); // Add this line to import the 'path' module
const {VehicleType} = require('../models/index');

class vehiclecontroller {

    static vehicle_list = async (req, res) => {
        try {
            // Fetch all vehicles from the VehicleType table
            const vehicles = await VehicleType.findAll();
    
            // Pass the vehicle data to the view
            res.render("admin/vehicle_list", { vehicles });
        } catch (error) {
            console.log(error);
        }
    }

    static store_vehicle = async (req, res) => {
        try {
          const {
            type_name,
            fixed_charge,
            fixed_charge_per_km,
            charge_after_fixed,
            access_fee,
            platform_fee,
            description
          } = req.body;
      
          const vehicleImage = req.files['vehicle_image'] ? req.files['vehicle_image'][0].filename : null;
          const vehicleLogo = req.files['vehicle_logo'] ? req.files['vehicle_logo'][0].filename : null;
      
          await VehicleType.create({
            type_name,
            fixed_charge,
            fixed_charge_per_km,
            charge_after_fixed,
            access_fee,
            platform_fee,
            description,
            vehicle_image: vehicleImage,
            vehicle_logo: vehicleLogo
          });
          req.flash('success', 'Vehicle add successfully');
          res.redirect("/vehicles");
         
        } catch (error) {
            req.flash('error', 'Vehicle not Stored');
          console.log("❌ Error storing vehicle:", error);
          res.status(500).send("Something went wrong");
        }
      };

       // 🧨 Delete vehicle along with its image/logo files
       static delete_vehicle = async (req, res) => {
        try {
            const { id } = req.params;
            const vehicle = await VehicleType.findByPk(id);

            if (!vehicle) {
                req.flash('error', 'Vehicle not found'); // Flash error message
                return res.redirect('/vehicles');
            }

            // Define paths to images folder
            const imagePath = path.join(__dirname, '..', 'public', 'uploads', 'vehicles');

            // Delete image files if they exist
            if (vehicle.vehicle_image) {
                const imageFullPath = path.join(imagePath, vehicle.vehicle_image);
                if (fs.existsSync(imageFullPath)) fs.unlinkSync(imageFullPath);
            }

            if (vehicle.vehicle_logo) {
                const logoFullPath = path.join(imagePath, vehicle.vehicle_logo);
                if (fs.existsSync(logoFullPath)) fs.unlinkSync(logoFullPath);
            }

            // Delete from DB
            await VehicleType.destroy({ where: { id } });

            req.flash('success', 'Vehicle deleted successfully'); // Flash success message
            res.redirect("/vehicles");
        } catch (error) {
            console.log("❌ Error deleting vehicle:", error);
            req.flash('error', 'Something went wrong'); // Flash error message
            res.redirect('/vehicles');
        }
    };

}
module.exports = vehiclecontroller;
