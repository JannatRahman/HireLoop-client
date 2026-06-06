"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  TextField,
  Label,
  Input,
  InputGroup,
  Button,
  Alert
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";


export default function SigninPage() {
  // Form States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // UI Feedback & Pending States
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Toggle password character visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Track input variations
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Submission utilizing BetterAuth Client Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Native BetterAuth Sign In Call
    await signIn.email({
      email: formData.email,
      password: formData.password,
    }, {
      onRequest: () => {
        setIsPending(true);
      },
      onSuccess: (ctx) => {
        setIsPending(false);
        setSuccess("Logged in successfully! Redirecting...");
        setFormData({ email: "", password: "" });

        window.location.href = "/";
      },
      onError: (ctx) => {
        setIsPending(false);
        setError(ctx.error.message || "An error occurred during authentication.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-900">
      <Card.Root className="w-full max-w-md p-6 shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl">
        <Card.Header className="flex flex-col items-center gap-1 pb-6">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to your account to continue
          </p>
        </Card.Header>

        {/* Form Fields container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
          {/* Success Alert Message */}
          {success && (
            <Alert variant="solid" className="bg-emerald-500 text-white rounded-lg p-3 text-sm">
              {success}
            </Alert>
          )}

          {/* Error Alert Message */}
          {error && (
            <Alert variant="solid" className="bg-rose-500 text-white rounded-lg p-3 text-sm">
              {error}
            </Alert>
          )}

          {/* Email Address Field */}
          <TextField isRequired>
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
            />
          </TextField>

          {/* Password Field Wrapper with Toggle Icon */}
          <TextField isRequired>
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </Label>
              {/* Optional: Add a forgot password link here later */}
            </div>
            <InputGroup className="mt-1 flex items-center border border-zinc-300 dark:border-zinc-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 outline-none bg-transparent"
              />
              <InputGroup.Suffix className="px-3 flex items-center justify-center bg-transparent border-l border-zinc-200 dark:border-zinc-700">
                <button
                  className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlash style={{ fontSize: "20px" }} />
                  ) : (
                    <Eye style={{ fontSize: "20px" }} />
                  )}
                </button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          {/* Submit Sign In Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full font-semibold mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-all py-2 rounded-lg"
            isPending={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Navigation Link back to Signup page */}
        <Card.Footer className="flex justify-center pt-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            New to HireLoop?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:underline font-medium transition-all dark:text-blue-400"
            >
              Create An Account
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}