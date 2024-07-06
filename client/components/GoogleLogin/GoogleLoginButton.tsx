// components/GoogleLogin/GoogleLoginButton.tsx
"use client";

import { useCallback } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";

const GoogleLoginButton = () => {
  const handleLoginWithGoogle = useCallback(async (response: CredentialResponse) => {
    const googleToken = response.credential;

    if (!googleToken) return toast.error(`Google token not found`);

    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery,
      { token: googleToken }
    );

    toast.success("Verified Success");
    console.log(verifyGoogleToken);
  }, []);

  return <GoogleLogin onSuccess={handleLoginWithGoogle} />;
};

export default GoogleLoginButton;
