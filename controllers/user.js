const express = require('express');
const mongoose = require('mongoose');
const generateToken = require('../utility/generateToken');

const UserModel = require('../models/user');

const registerUser = async(req, res) => {
    const {name, email, password} = req.body;
    const userExists = await UserModel.findOne({email});

    if(userExists){
        res.status(400).json({message: 'User already exists'});
        throw new Error('User already exists')
    }

    try {

        const user = await UserModel.create({
            name, email, password
        });

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                user_type: user.user_type,
                token: generateToken(user._id),
            });
        }else{
            res.status(400).json({message: 'Invalid user data.'});
            throw new Error('Invalid user data')
        }
    } catch (error) {
        console.error(error);
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(401).json({message: 'Invalid email or password'});
        throw new Error('Invalid email or password');
    }
}

module.exports = {registerUser,loginUser};