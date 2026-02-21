"use client"

import { useState, useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import { isLoggedIn } from "@/app/lib/api";
import Layout from "@/app/ui/layout/blank";
import API from "@/app/lib/api";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSignIn = async () => {
    try {
      await API.login(email, password);

      setSuccess("Login successful!");
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  }

  useEffect(() => {
    if ( isLoggedIn() ) {
      redirect("/me", RedirectType.replace);
    }
  }, []);

  return (
    <Layout className="login-screen">
      <div className="flex min-h-screen items-center justify-center font-sans">
        <div className="md:max-w-1/5 mx-auto w-full p-4">
          <h1 className="text-5xl font-medium text-center mb-6">Sign in</h1>
          <div className="input-row">
            {error && (
              <p className="error-message">{error}</p>
            )}
            {success && (
              <p className="ok-message">{success}</p>
            )}
          </div>
          <div className="input-row">
            <p className="input-label">Email</p>
            <input className="text-input dark" type="email" onChange={handleEmailChange} value={email}/>
          </div>
          <div className="input-row">
            <p className="input-label">Password</p>
            <input className="text-input dark" type="password" onChange={handlePasswordChange} value={password}/>
          </div>
          <div className="input-row">
            <button className="button dark" onClick={handleSignIn}>Sign in</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
