import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AdminAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminAuthModel = mongoose.model("Admin", AdminAuthSchema);

// const createAdmin = async () => {
//   const password = "@Ck991998";
//   const HashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new AdminAuthModel({
//     name: "chanchal kumar",
//     email: "chanchalbtps009@gmail.com",
//     password: HashedPassword,
//   });

//   try {
//     await newUser.save();
//     console.log("Admin saved successfully!");
//   } catch (error) {
//     console.error("Error saving admin:", error);
//   }
// };
// createAdmin();
export default AdminAuthModel;
