const express = require('express');
const router = express.Router();

// Models
const Appointment = require('../models/Appointment');

// Helpers
const { isAuthenticated } = require('./authentication');

// New Appointment
router.get('/appointment/add', isAuthenticated, (req, res) => {
  res.render('appointment/new-appointment');
});

router.post('/appointment/new-appointment', isAuthenticated, async (req, res) => {
  const { title, description, citadate } = req.body;
  const errors = [];
  if (!title) {
    errors.push({text: 'Agregue un Titulo'});
  }
  if (!description) {
    errors.push({text: 'Por favor agregue una descripcion'});
  }
  // if (!citadate) {
    // errors.push({text: 'Por favor escoja una fecha y hora'});
  // }
  if (errors.length > 0) {
    res.render('appointment/new-appointment', {
      errors,
      title,
      description,
      citadate
    });
  } else {
    const newAppointment = new Appointment({title, description, citadate});
    newAppointment.user = req.user.id;
    await newAppointment.save();
    req.flash('success_msg', 'Nueva cita creada!');
    res.redirect('/appointment');
  }
});

// Get All appointment
router.get('/appointment', isAuthenticated, async (req, res) => {
  const appointment = await Appointment.find({user: req.user.id}).sort({date: 'desc'});
  res.render('appointment/all-appointment', { appointment });
});

// Edit Appointment
router.get('/appointment/edit/:id', isAuthenticated, async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if(appointment.user != req.user.id) {
    req.flash('error_msg', 'Acceso restringido, no autorizado');
    return res.redirect('/appointment');
  } 
  res.render('appointment/edit-appointment', { appointment });
});

router.put('/appointment/edit-appointment/:id', isAuthenticated, async (req, res) => {
  const { title, description, citadate } = req.body;
  await Appointment.findByIdAndUpdate(req.params.id, {title, description, citadate});
  req.flash('success_msg', 'La cita ha sido actualizada');
  res.redirect('/appointment');
});

// Delete Appointment
router.delete('/appointment/delete/:id', isAuthenticated, async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'La cita ha sido Eliminada');
  res.redirect('/appointment');
});

module.exports = router;
