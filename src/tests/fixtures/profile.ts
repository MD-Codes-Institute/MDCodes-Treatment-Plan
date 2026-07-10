export const mockUserUid = "user-123456789";
export const mockUser = { uid: mockUserUid, emailVerified: true };

export const mockUserInfo = {
  user_name: "Logger MdM",
  user_email: "logger@mdcodes.com",
  user_phone: "11967548946",
  user_uid: mockUserUid,
};
export const mockSnapshot = {
  exists: () => true,
  val: () => mockUserInfo,
};

export const mockDatabaseRef = "mock-database-ref"
export const mockDb = "mock-db"


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
