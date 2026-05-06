import { userSchema } from './user.schema';

export const signInUserSchema = userSchema.omit({
  firstName: true,
  lastName: true,
});
