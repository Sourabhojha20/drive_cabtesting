const { User, Driver, Otp, VehicleType } = require("../models/index");
const { Op } = require("sequelize");

class ApiController {
  // Static method to generate OTP
  static generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Static method to send OTP
  static async sendOtp(req, res) {
    const { phone, user_type } = req.body;

    if (!phone || !["user", "driver"].includes(user_type)) {
      console.log(phone);
      return res.status(400).json({ message: "Invalid request" });
    }

    try {
      const otpCode = ApiController.generateOtp(); // Use the static method to generate OTP
      const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutes

      // Find user/driver by phone
      const model = user_type == "user" ? User : Driver;
      const user = await model.findOne({ where: { phone } });

      if (!user) return res.status(404).json({ message: "User not found" });

      // Save OTP
      await Otp.create({
        mobile: phone,
        otp_code: otpCode,
        user_id: user.id,
        user_type,
        expires_at: expiresAt,
        verified: false,
      });

      // Replace with real SMS/Email service
      console.log(`Send OTP ${otpCode} to ${phone}`);

      res.json({ message: "OTP sent successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // Static method to verify OTP
  static async verifyOtp(req, res) {
    const { phone, otp_code, user_type } = req.body;

    if (!phone || !otp_code || !["user", "driver"].includes(user_type)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    try {
      const model = user_type == "user" ? User : Driver;
      const user = await model.findOne({ where: { phone } });

      if (!user) return res.status(404).json({ message: "User not found" });

      const otp = await Otp.findOne({
        where: {
          user_id: user.id,
          user_type,
          otp_code,
          expires_at: { [Op.gt]: new Date() }, // Check if OTP is still valid
          verified: false,
        },
        order: [["created_at", "DESC"]],
      });

      if (!otp)
        return res.status(400).json({ message: "Invalid or expired OTP" });

      // Mark OTP as verified
      otp.verified = true;
      await otp.save();

      // Delete all OTPs associated with this user
      await Otp.destroy({
        where: {
          user_id: user.id,
          user_type,
        },
      });

      // Here you would create a JWT token or session for login
      res.json({ message: "Login successful", user });
      console.error(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  static driver_register = async (req, res) => {
    const {
      name,
      email,
      mobileNumber,
      gender,
      selectedCountry,
      vehicleType,
      vehicleNumber,
      vehicleModel,
      licenseNumber,
    } = req.body;

    if (
      !name ||
      !mobileNumber ||
      !gender ||
      !selectedCountry ||
      !vehicleType ||
      !vehicleNumber ||
      !vehicleModel ||
      !licenseNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingDriver = await Driver.findOne({
        where: {
          phone: mobileNumber,
        },
      });

      if (existingDriver) {
        return res.status(409).json({
          message: "Driver already registered with this mobile number",
        });
      }

      const newDriver = await Driver.create({
        name,
        phone: mobileNumber,
        gender,
        country_code: selectedCountry,
        license_number: licenseNumber,
        vehicle_id: vehicleType,
        vehicle_number: vehicleNumber,
        vehicle_model: vehicleModel,
        status: true,
        online_status: false,
        rating: 0.0,
        profile_photo: "", // Add photo upload logic if needed
      });

      res
        .status(201)
        .json({ message: "Driver registered successfully", driver: newDriver });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  static vehicle_types = async (req, res) => {
    try {
      const vehicle_types = await VehicleType.findAll({
        attributes: ["id", "type_name"],
      });
      res
        .status(201)
        .json({ message: "send successfully", vehicle_types: vehicle_types });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

module.exports = ApiController; // Export the class directly
