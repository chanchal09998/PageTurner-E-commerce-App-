import AuthModel from "../models/AuthModels.js";

export const userDetails = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email not provided" });
    }

    // Find the user's details by email
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
