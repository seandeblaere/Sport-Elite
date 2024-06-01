import { User } from "core/modules/auth/auth.types";

export type AuthContextType = {
  user: User | null;
  handleLogout: () => void;
};
