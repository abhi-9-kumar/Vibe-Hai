"use client";

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

export default function GoogleLoginButton() {
  const handleSuccess = (response: CredentialResponse) => {
    console.log(response);
  };

  return (
      <GoogleLogin onSuccess={handleSuccess} />
  );
}
