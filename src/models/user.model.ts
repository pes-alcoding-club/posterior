import { Schema, Document, model, PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    default: 'User'
  },

  email: {
    type: String,
    default: '',
    unique: true,
    dropDups: true,
    required: true
  },

  isAdmin: {
    type: Boolean,
    default: false
  }
});

UserSchema.plugin(passportLocalMongoose);
export default model<IUser>('User', UserSchema as PassportLocalSchema);
