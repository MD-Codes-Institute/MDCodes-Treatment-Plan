import z from "zod";

/*schema para SignIn*/ export const schemaSignIn = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});

/*Schema para SignUp*/ export const schemaSignUp = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
  phone: z
    .string()
    .min(11, "Invalid phone number!")
    .regex(/^[1-9]{2}9?\d{8}$/, "Phone number format is invalid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});

/*content form signIn*/ export const contentFormSignUp = [
  {
    id: "name",
    name: "Name",
  },
  {
    id: "email",
    name: "E-mail",
  },
  {
    id: "phone",
    name: "Phone",
  },
  {
    id: "password",
    name: "Password",
  },
];

/*content form signUp*/ export const contentFormSignIn = [
  {
    id: "email",
    name: "E-mail",
  },
  {
    id: "password",
    name: "Password",
  },
];

export const classBtn = {
  color: "#fff",
  border: "1px solid #fff",
  borderRadius: "2rem",
  height: "2.5rem",
  width: "6.25rem",
  background: "#967F43",
  boxShadow: "0px 0px 7px #967F43",
};

export const classInput = {
  borderRadius: 16,
  color: "#fff",
  fontSize: "0.85rem",
  width: "70%",
  height: "4vh",
  background: "transparent",
};
/*Erros firebase*/
export const VerifyErroCode = (errorCode: string) => {
  switch (errorCode) {
    case "auth/app-deleted":
      return "The database was not found.";
    case "auth/expired-action-code":
      return "The action code or link has expired.";
    case "auth/invalid-action-code":
      return "The action code is invalid. This can happen if the code is malformed or has already been used.";
    case "auth/user-disabled":
      return "The user corresponding to the given credential has been disabled.";
    case "auth/user-not-found":
      return "No user corresponds to the given credential.";
    case "auth/weak-password":
      return "The password is too weak.";
    case "auth/email-already-in-use":
      return "An account already exists with the given email address.";
    case "auth/invalid-email":
      return "The email address is invalid.";
    case "auth/operation-not-allowed":
      return "The account type corresponding to this credential is not yet enabled.";
    case "auth/account-exists-with-different-credential":
      return "Email already associated with another account.";
    case "auth/auth-domain-config-required":
      return "The authentication configuration was not provided.";
    case "auth/credential-already-in-use":
      return "An account already exists for this credential.";
    case "auth/operation-not-supported-in-this-environment":
      return "This operation is not supported in the current environment. Check if it should be http or https.";
    case "auth/timeout":
      return "Response timeout exceeded. The domain may not be authorized to perform operations.";
    case "auth/missing-android-pkg-name":
      return "A package name must be provided for the Android app installation.";
    case "auth/missing-continue-uri":
      return "The next URL must be provided in the request.";
    case "auth/missing-ios-bundle-id":
      return "A bundle ID must be provided for the iOS app installation.";
    case "auth/invalid-continue-uri":
      return "The next URL provided in the request is invalid.";
    case "auth/unauthorized-continue-uri":
      return "The domain of the next URL is not in the authorized list.";
    case "auth/invalid-dynamic-link-domain":
      return "The provided dynamic link domain is not authorized or configured in the current project.";
    case "auth/argument-error":
      return "Check the link configuration for the app.";
    case "auth/invalid-persistence-type":
      return "The specified type for data persistence is invalid.";
    case "auth/unsupported-persistence-type":
      return "The current environment does not support the specified data persistence type.";
    case "auth/invalid-credential":
      return "Incorrect login information or credential does not exist.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-verification-code":
      return "The credential verification code is invalid.";
    case "auth/invalid-verification-id":
      return "The credential verification ID is invalid.";
    case "auth/custom-token-mismatch":
      return "The token is different from the requested standard.";
    case "auth/invalid-custom-token":
      return "The provided token is invalid.";
    case "auth/captcha-check-failed":
      return "The reCAPTCHA response token is invalid, expired, or the domain is not allowed.";
    case "auth/invalid-phone-number":
      return "The phone number is in an invalid format (E.164 standard).";
    case "auth/missing-phone-number":
      return "The phone number is required.";
    case "auth/quota-exceeded":
      return "The SMS quota has been exceeded.";
    case "auth/cancelled-popup-request":
      return "Only one popup request is allowed at a time.";
    case "auth/popup-blocked":
      return "The popup window was blocked by the browser.";
    case "auth/popup-closed-by-user":
      return "The popup window was closed by the user without completing the login.";
    case "auth/unauthorized-domain":
      return "The app domain is not authorized to perform operations.";
    case "auth/invalid-user-token":
      return "The current user was not identified.";
    case "auth/user-token-expired":
      return "The current user's token has expired.";
    case "auth/null-user":
      return "The current user is null.";
    case "auth/app-not-authorized":
      return "Application not authorized to authenticate with the provided key.";
    case "auth/invalid-api-key":
      return "The provided API key is invalid.";
    case "auth/network-request-failed":
      return "Network connection failed.";
    case "auth/requires-recent-login":
      return "The user's last access time does not meet the security limit.";
    case "auth/too-many-requests":
      return "Requests have been blocked due to unusual activity. Try again later.";
    case "auth/web-storage-unsupported":
      return "The browser does not support storage or the user has disabled this feature.";
    case "auth/invalid-claims":
      return "The custom registration attributes are invalid.";
    case "auth/claims-too-large":
      return "The request size exceeds the maximum allowed size of 1 Megabyte.";
    case "auth/id-token-expired":
      return "The provided token has expired.";
    case "auth/id-token-revoked":
      return "The provided token has been revoked.";
    case "auth/invalid-argument":
      return "An invalid argument was provided to a method.";
    case "auth/invalid-creation-time":
      return "The creation time must be a valid UTC date.";
    case "auth/invalid-disabled-field":
      return "The property for disabled user is invalid.";
    case "auth/invalid-display-name":
      return "The user name is invalid.";
    case "auth/invalid-email-verified":
      return "The email is invalid.";
    case "auth/invalid-hash-algorithm":
      return "The HASH algorithm is not a compatible encryption.";
    case "auth/invalid-hash-block-size":
      return "The HASH block size is invalid.";
    case "auth/invalid-hash-derived-key-length":
      return "The HASH derived key length is invalid.";
    case "auth/invalid-hash-key":
      return "The HASH key must have a valid byte buffer.";
    case "auth/invalid-hash-memory-cost":
      return "The HASH memory cost is invalid.";
    case "auth/invalid-hash-parallelization":
      return "The HASH parallelization is invalid.";
    case "auth/invalid-hash-rounds":
      return "The HASH rounds are invalid.";
    case "auth/invalid-hash-salt-separator":
      return "The SALT separator field of the HASH generation algorithm must be a valid byte buffer.";
    case "auth/invalid-id-token":
      return "The provided token code is invalid.";
    case "auth/invalid-last-sign-in-time":
      return "The last sign-in time must be a valid UTC date.";
    case "auth/invalid-page-token":
      return "The next URL provided in the request is invalid.";
    case "auth/invalid-password":
      return "The password is invalid, it must be at least 6 characters long.";
    case "auth/invalid-password-hash":
      return "The password HASH is invalid.";
    case "auth/invalid-password-salt":
      return "The password SALT is invalid.";
    case "auth/invalid-photo-url":
      return "The user photo URL is invalid.";
    case "auth/invalid-provider-id":
      return "The provider identifier is not supported.";
    case "auth/invalid-session-cookie-duration":
      return "The session COOKIE duration must be a valid number in milliseconds, between 5 minutes and 2 weeks.";
    case "auth/invalid-uid":
      return "The provided identifier must be at most 128 characters long.";
    case "auth/invalid-user-import":
      return "The user record to be imported is invalid.";
    case "auth/invalid-provider-data":
      return "The data provider is invalid.";
    case "auth/maximum-user-count-exceeded":
      return "The maximum allowed number of users to be imported has been exceeded.";
    case "auth/missing-hash-algorithm":
      return "It is necessary to provide the HASH generation algorithm and its parameters to import users.";
    case "auth/missing-uid":
      return "An identifier is required for the current operation.";
    case "auth/reserved-claims":
      return "One or more custom properties provided used reserved words.";
    case "auth/session-cookie-revoked":
      return "The session COOKIE has been revoked.";
    case "auth/uid-alread-exists":
      return "The provided identifier is already in use.";
    case "auth/email-already-exists":
      return "The provided email is already in use.";
    case "auth/phone-number-already-exists":
      return "The provided phone number is already in use.";
    case "auth/project-not-found":
      return "No project was found.";
    case "auth/insufficient-permission":
      return "The credential used does not have permission to access the requested resource.";
    case "auth/internal-error":
      return "The authentication server encountered an unexpected error while trying to process the request.";
    default:
      return null;
  }
};
