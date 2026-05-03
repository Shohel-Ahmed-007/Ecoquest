const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['student', 'teacher'], default: 'student' },
  class:    { type: String, default: '' },
  school:   { type: String, default: '' },
  avatar:   { type: String, default: '' },

  // ── Gamification ──────────────────────────────────────────
  xp:          { type: Number, default: 0 },
  level:       { type: Number, default: 1 },
  streak:      { type: Number, default: 0 },
  lastActive:  { type: Date, default: Date.now },
  badges:      [{ type: String }],
  activityLog: [{ date: String, count: Number }],
  interests:   [{ type: String }],
  ecoLevel:    { type: String, enum: ['beginner', 'intermediate', 'advanced', ''], default: '' },

  // ── Email Verification ────────────────────────────────────
  isVerified:              { type: Boolean, default: false },
  verificationToken:       { type: String, default: null },
  verificationTokenExpiry: { type: Date,   default: null },

=======
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student' },
  class: { type: String, default: '' },
  school: { type: String, default: '' },
  avatar: { type: String, default: '' },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  badges: [{ type: String }],
  activityLog: [{ date: String, count: Number }],
  interests: [{ type: String }],
>>>>>>> 0a438a8b55346cfc102d70054270e29f3136dd0d
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
