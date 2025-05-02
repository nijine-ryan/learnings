import { Document,model,Schema } from "mongoose";

interface IUser extends Document {
    name: string;
}

const userSchema = new Schema<IUser>({
    name: String,
});

const User = model<IUser>('User', userSchema);
export default User;
