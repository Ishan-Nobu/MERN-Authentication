const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const generateToken = require('../utility/genToken')

// register user
exports.registerUser = async(req, res) => {

    const errors =  validationResult(req);

    if (!errors.isEmpty()) 
    {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try
    {
        let user = await User.findOne({ email });

        if (user) 
        {
            return res.status(400).json({ msg: 'E-mail already exists' });
        }

        user = new User({ username, email, password });

        await user.save();
        generateToken(user._id, res);
        res.status(200)
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    }
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// login user
exports.loginUser = async(req, res) => {
    const errors =  validationResult(req);

    if (!errors.isEmpty()) 
    {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try 
    {
        let user = await User.findOne( { email } );

        if(!user)
        {
            return res.status(400).json({ msg: "Invalid email" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch)
        {
            return res.status(400).json({ msg: "Invalid password" });
        }

        generateToken(user._id, res);
        res.status(200)
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// logout user
exports.logoutUser = async(req, res) => {

    res.cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict"
    })

    res.status(200).json({ msg: 'Logout successful' });
}

// get user profile
exports.getUser = async(req, res) => {

    try 
    {
        const user = await User.findById(req.user.user_id).select('-password');
        if(user)
        {
            res.status(200).json(user);
        }
        else
        {
            res.status(404);
            throw new Error('User not found');
        }
    } 
    catch (err) 
    {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

//update user profile
exports.updateUser = async(req, res) => {

    try 
    {
        const user = await User.findById(req.user.user_id);

        const passwordMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if(!passwordMatch)
        {
            return res.status(400).json({ msg: "Invalid password" });
        }

        if(user)
        {   
            user.username = req.body.username || user.username;       
            user.email = req.body.email || user.email;

            if(req.body.newPassword)
            {
                user.password = req.body.newPassword;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
            })
        }
        else
        {
            res.status(404);
            throw new Error('User not found');
        }
    } 
    catch (err) 
    {   
        if(err.code === 11000)
        {
            res.status(409).json({ msg: 'E-mail already registered' })
        }
        else
        {
            console.error(err.message);
            res.status(500).send('Server error');
        }    
    }
}