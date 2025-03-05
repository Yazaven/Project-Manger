import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

// Configure Amplify with the standard v6 structure
Amplify.configure({
  region: process.env.NEXT_PUBLIC_COGNITO_REGION || "us-east-1", // Required top-level region
  Auth: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    authenticationFlowType: "USER_PASSWORD_AUTH", // Explicitly set for consistency
    mandatorySignIn: true,
  },
});

// Define form fields, including the required 'name' attribute
const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      inputProps: { required: true },
    },
    name: {
      order: 2,
      placeholder: "Enter your full name",
      label: "Full Name",
      inputProps: { required: true }, // Added to satisfy name.formatted
    },
    email: {
      order: 3, // Adjusted order to avoid overlap
      placeholder: "Enter your email address",
      label: "Email",
      inputProps: { type: "email", required: true },
    },
    password: {
      order: 4, // Adjusted order
      placeholder: "Enter your password",
      label: "Password",
      inputProps: { type: "password", required: true },
    },
    confirm_password: {
      order: 5, // Adjusted order
      placeholder: "Confirm your password",
      label: "Confirm Password",
      inputProps: { type: "password", required: true },
    },
  },
};

// Type the component props and Authenticator render function
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <div>
      <Authenticator formFields={formFields}>
        {({ user }) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign in below:</h1>
            </div>
          )
        }
      </Authenticator>
    </div>
  );
};

export default AuthProvider;

