import { User } from "firebase/auth";

export const mockUserUid = "user-123456789";

// Mock do User do Firebase Authentication
export const mockUser = {
  uid: mockUserUid,
  email: "logger@mdcodes.com",
  displayName: "Logger",
  emailVerified: true,
} as unknown as User;

export const mockDatabaseRef = "mock-database-ref";
export const mockDb = "mock-db";

export const mockLocationDb = "preference_location";

export const mockNewDataPreference = {
  "preferences/user-12345/code_value/foundation": {
    value: "100",
  },
  "preferences/user-12345/code_value/countor_upper": {
    value: "200",
  },
  "preferences/user-12345/code_value/counter_lower": {
    value: "300",
  },
  "preferences/user-12345/code_value/refinement_periorbital": {
    value: "400",
  },
  "preferences/user-12345/code_value/refinement_perioral": {
    value: "5000",
  },
};
