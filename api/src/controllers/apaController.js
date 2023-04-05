const mongoose = require('mongoose');
const Apa = require('../models/Apa');


// POST| /create - OK
const createApa = async(name, password, email, cbu_cvu, description, location, url, telephone, provincia, cuit) => {
    const newApa = await Apa.create({name, password, email, cbu_cvu, description, location, url, telephone, provincia, cuit});
    return newApa;
}


// PUT| /edit/:id - OK (apretar dos veces Send)
const putApa = async(id, name, password, email, cbu_cvu, description, location, url, telephone, provincia, cuit, pets, reviews, newReview ) => { 
    reviews = [...reviews, newReview]
    const modifyApa = await Apa.findByIdAndUpdate(id, {name, password, email, cbu_cvu, description, location, url, telephone, provincia, cuit, pets, reviews}); 
    // modifyApa.reviews.push(newReview);
    await modifyApa.save();
    // console.log(reviews)
    return modifyApa;
}


// GET BY ID| /:id - OK
const getApaById = async(id) => {
    const newApa = await Apa.findById(id).populate('pets');
    return newApa;
};

// GET ALL| / - OK
const getAllApas = async() => {
    const allApas = await Apa.find({});
    return allApas;
}
const getApasByName = async(name) => {
    const ApaByName = await getAllApas();
    const ApaFounded = await ApaByName.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    return ApaFounded;
} 

// DELETE BY ID| /delete/:id - OK
const deleteApaById = async(id) => {
    const delApa = await Apa.findByIdAndDelete(id);
    return delApa;
};


module.exports = { createApa, putApa, getApaById, getAllApas, getApasByName, deleteApaById };