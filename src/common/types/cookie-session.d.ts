import 'cookie-session';

type UserSession = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName?: string;
    fullName?: string;
  };
};

declare global {
  namespace Express {
    interface Request {
      session: UserSession;
    }
  }
}
