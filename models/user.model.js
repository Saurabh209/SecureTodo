
import mongoose from "mongoose"


mongoose.connect("mongodb://localhost:27017", {
    dbName: 'userInfo',
}).then(
    () => { console.log("database connected") }
)
const newUsers = new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    phone: Number,
    password: String,
}, { timestamps: true });

export const user = mongoose.model('user', newUsers)



