"use client"

import { useState, useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";
import { isLoggedIn } from "@/app/lib/api";
import Layout from "@/app/ui/layout/blank";
import API from "@/app/lib/api";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await API.register(name, email, password);

      setSuccess("Account created successfully!");
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
      <main>
        <div className="main-container">
          <h1 className="text-5xl font-medium text-center mb-6">Sign up</h1>
          <div className="input-row">
            {error && (
              <p className="error-message">{error}</p>
            )}
            {success && (
              <p className="ok-message">
                <span>{success}</span><br/>
                <Link href="/signin" className="hover:underline">Click here to sign in</Link>
              </p>
            )}
          </div>
          <form onSubmit={handleSignIn}>
          <div className="input-row">
            <p className="input-label">Name</p>
            <input className="text-input dark" type="email" onChange={handleNameChange} value={name} autoComplete="off"/>
          </div>
          <div className="input-row">
            <p className="input-label">Email</p>
            <input className="text-input dark" type="email" onChange={handleEmailChange} value={email} autoComplete="off"/>
          </div>
          <div className="input-row">
            <p className="input-label">Password</p>
            <input className="text-input dark" type="password" onChange={handlePasswordChange} value={password}/>
          </div>
          <div className="input-row">
            <button className="button dark" onClick={handleSignIn}>Sign in</button>
          </div>
          </form>
        </div>
      </main>
    </Layout>
  )
}
