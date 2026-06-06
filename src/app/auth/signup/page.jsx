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
import { Description, Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client"; // Adjust path to your authClient file

export default function SignupPage() {
  // Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("seeker");

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

  // Form Submission utilizing BetterAuth Core Hooks
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }


    await signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: role
    }, {
      onRequest: () => {
        setIsPending(true);
      },
      onSuccess: (ctx) => {
        setIsPending(false);
        setSuccess("Account created successfully! You can now sign in.");
        setFormData({ name: "", email: "", password: "" });
        window.location.href = "/";
      },
      onError: (ctx) => {
        setIsPending(false);

        setError(ctx.error.message || "An error occurred during registration.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-zinc-900">
      <Card.Root className="w-full max-w-md p-6 shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl">
        <Card.Header className="flex flex-col items-center gap-1 pb-6">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Create an Account
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your details to get started
          </p>
        </Card.Header>

        {/* Form Fields wrapped cleanly inside the Card Root container */}
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

          {/* Full Name Field Wrapper */}
          <TextField isRequired>
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1"
            />
          </TextField>

          {/* Email Address Field Wrapper */}
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

          {/* Password Field Wrapper utilizing HeroUI v3 InputGroup structural composition */}
          <TextField isRequired>
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>
            <InputGroup className="mt-1 flex items-center border border-zinc-300 dark:border-zinc-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <InputGroup.Input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
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

          { /**Role selection */}
          <div className="flex flex-col gap-4">
            <Label>Subscription plan</Label>
            <RadioGroup defaultValue="seeker" name="role" 
            onChange={(value) => setRole(value)}
            orientation="horizontal">
              <Radio  value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                
                </Radio.Content>
              </Radio>
              
            </RadioGroup>
          </div>


          {/* Submit Registration Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full font-semibold mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-all py-2 rounded-lg"
            isPending={isPending}
          >
            {isPending ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        {/* Back Link Option to go to Sign In page */}
        <Card.Footer className="flex justify-center pt-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-blue-600 hover:underline font-medium transition-all dark:text-blue-400"
            >
              Sign In
            </Link>
          </p>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}