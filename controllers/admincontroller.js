const Image = require('../models/image');
// const Booking = require('../models/Booking');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const { User, Booking, Ride } = require('../models/index');
var jwt = require('jsonwebtoken');

class admincontroller {

    static login = async (req, res) => {
        try {
            res.render("admin/login",{ message: req.flash('error')});
        } catch (error) {
            console.log(error);
        }
    }

    static logincheck = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await User.findOne({ email: email });
                if (user != null) {
                    // Direct string comparison since passwords are stored in plain text
                    if (password === user.password) {
                        const token = jwt.sign({ ID: user._id }, 'sourabh@123345566');
                        res.cookie('token', token);
    
                        // Set a success flash message and then redirect to the dashboard
                        req.flash('success', 'Logged in successfully');
                        return res.redirect('/home');
                    } else {
                        // Set an error flash message for invalid email or password
                        req.flash('error', 'Email or password is not valid');
                        return res.redirect('/');
                    }
                } else {
                    // Set an error flash message for unregistered users
                    req.flash('error', 'You are not a registered user');
                    return res.redirect('/');
                }
            } else {
                // Set an error flash message for missing fields
                req.flash('error', 'All fields are required');
                return res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect("/")
        } catch (error) {
            console.log(error)
        }
    }

    static home = async (req, res) => {
        try {
            res.render("admin/home");
        } catch (error) {
            console.log(error);
        }
    }


    static users_list = async (req, res) => {
        try {
            const users = await User.findAll();
            res.render("admin/users_list",{ users });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = admincontroller;
