const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub: googleId, email, name } = ticket.getPayload();
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = new User({ email, username: name, googleId });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Generate JWT token
    res.json({ token: jwtToken, user }); // Return JWT token and user info
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
