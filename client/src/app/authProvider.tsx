import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import CryptoJS from "crypto-js";

const generateSecretHash = (username: string) => {
  const clientId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "";
  const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || "";

  const message = username + clientId;
  const secretHash = CryptoJS.HmacSHA256(message, clientSecret).toString(CryptoJS.enc.Base64);
  return secretHash;
};

// Correct configuration for Amplify
Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_COGNITO_REGION || "", // Add your region
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "", // Add your User Pool ID
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "", // Client ID for User Pool
    authenticationFlowType: "USER_PASSWORD_AUTH", // This should work now
    clientMetadata: { secretHash: generateSecretHash }, // Custom secretHash function
  },
});



const formFields = {
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      inputProps: { required: true },
    },
    email: {
      order: 1,
      placeholder: "Enter your email address",
      label: "Email",
      inputProps: { type: "email", required: true },
    },
    password: {
      order: 3,
      placeholder: "Enter your password",
      label: "Password",
      inputProps: { type: "password", required: true },
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      inputProps: { type: "password", required: true },
    },
  },
};

const AuthProvider = ({ children }: any) => {
  return (
    <div>
      <Authenticator formFields={formFields}>
        {({ user }: any) =>
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
