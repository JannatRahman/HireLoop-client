"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  Input,
  TextArea,
  Button,
  Label,
  ListBox,
  Select,
  TextField,
  FieldError,
  toast
} from "@heroui/react";
// Gravity UI Icons
import { Globe, ShieldCheck, ArrowUpRight, Briefcase } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/job";
import { redirect, useRouter } from "next/navigation";

export default function PostJobForm({ company }) {
  // console.log("Company data in PostJobForm:", company);

  const router = useRouter();
  // const [company] = useState({
  //   name: "Acme Corp",
  //   isApproved: true,
  //   plan: "Free", 
  //   activeJobsCount: 1, 
  //   limits: { Free: 3, Growth: 10, Enterprise: 50 }
  // });


  const [formData, setFormData] = useState({
    title: "",
    category: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    isRemote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Field Constants
  const categories = ["Technology", "Design", "Marketing", "Product Management", "Sales"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const currencies = ["USD", "EUR", "GBP", "CAD"];

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Select Changes for HeroUI Composable Architecture
  const handleSelectChange = (name, key) => {
    setFormData((prev) => ({ ...prev, [name]: key }));
  };

  // Handle Remote Toggle
  const toggleRemote = () => {
    setFormData((prev) => ({
      ...prev,
      isRemote: !prev.isRemote,
      location: !prev.isRemote ? "Remote" : ""
    }));
  };

  // Validation & Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ global: null }); // Reset global errors

    // if (!companyData.isApproved) {
    //   setErrors({ global: "Your company registration must be approved before posting jobs." });
    //   return;
    // }

    // const allowedLimit = company.limits[company.plan];
    // if (company.activeJobsCount >= allowedLimit) {
    //   setErrors({
    //     global: `You've reached your ${company.plan} plan limit (${allowedLimit} active jobs). Please upgrade to post more.`
    //   });
    //   return;
    // }

    let newErrors = {};
    if (!formData.title) newErrors.title = "Job Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.jobType) newErrors.jobType = "Job Type is required";
    if (!formData.isRemote && !formData.location) newErrors.location = "Location is required";
    if (!formData.responsibilities) newErrors.responsibilities = "Responsibilities are required";
    if (!formData.requirements) newErrors.requirements = "Requirements are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        companyId: company._id,
        companyName: company.name,
        companyLogo: company.logo || "",
        status: "active",
        createdAt: new Date().toISOString()
      };

      const res = await createJob(payload);
      if (res.insertedId) {
        toast.success("Job posted successfully!");
        e.target.reset();
        // setIsRemote(false);
        toggleRemote()
        router.push("/dashboard/recruiter/jobs");
      }

      alert("Job posted and published successfully!");
    } catch (err) {
      // console.log("Error creating job:", err);
      setErrors({ global: "An error occurred while saving the job. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl bg-[#121214] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden">

        {/* Header Block */}
        <div className="p-6 md:p-8 border-b border-[#27272a]">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Post a New Job</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">
            Fill out the details to broadcast your job opening across our platform.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs bg-zinc-400">
            <Briefcase size={14} className="text-zinc-500" />
            Posting as: <span className="font-semibold text-zinc-300">{company.name}</span>
            <span className="text-emerald-500 font-medium px-1.5 py-0.5 rounded border border-emerald-900/50">{company.status}</span>
          </div>
        </div>

        {company.status !== 'Approved' && <div className="p-5 font-bold  text-center text-xl">Please wait to get approval</div>}

        {/* Form Container */}
        {company.status === 'Approved' && <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

          {/* Global Guard Error Banners */}
          {errors.global && (
            <div className="p-4 bg-red-950/40 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {errors.global}
            </div>
          )}

          {/* SECTION 1: Job Info */}
          <Fieldset label="Job Information" className="space-y-6">

            {/* Title & Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Job Title via TextField composition */}
              <TextField isInvalid={!!errors.title} className="w-full dark">
                <Label className="text-xs text-[#a1a1aa] mb-1">Job Title</Label>
                <Input
                  placeholder="e.g. Senior Software Engineer"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 w-full focus:outline-none focus:border-white"
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </TextField>

              {/* Composable Category Select */}
              <div className="flex flex-col gap-1 w-full">
                <Select
                  placeholder="Select category"
                  selectedKey={formData.category}
                  onSelectionChange={(key) => handleSelectChange("category", key)}
                  className="dark"
                >
                  <Label className="text-xs text-[#a1a1aa] mb-1">Job Category</Label>
                  <Select.Trigger className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 flex items-center justify-between focus:outline-none">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#18181b] border border-[#27272a] text-white rounded-xl">
                    <ListBox>
                      {categories.map((cat) => (
                        <ListBox.Item id={cat} key={cat} textValue={cat} className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                          {cat}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Type & Deadline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Composable Job Type Select */}
              <div className="flex flex-col gap-1 w-full">
                <Select
                  placeholder="Select job type"
                  selectedKey={formData.jobType}
                  onSelectionChange={(key) => handleSelectChange("jobType", key)}
                  className="dark"
                >
                  <Label className="text-xs text-[#a1a1aa] mb-1">Job Type</Label>
                  <Select.Trigger className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 flex items-center justify-between focus:outline-none">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#18181b] border border-[#27272a] text-white rounded-xl">
                    <ListBox>
                      {jobTypes.map((type) => (
                        <ListBox.Item id={type} key={type} textValue={type} className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                          {type}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                {errors.jobType && <p className="text-xs text-red-500 mt-1">{errors.jobType}</p>}
              </div>

              <TextField className="w-full dark">
                <Label className="text-xs text-[#a1a1aa] mb-1">Application Deadline</Label>
                <Input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 w-full focus:outline-none focus:border-white"
                />
              </TextField>
            </div>

            {/* Location & Remote Toggle Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="md:col-span-2">
                <TextField isInvalid={!!errors.location} className="w-full dark">
                  <Label className="text-xs text-[#a1a1aa] mb-1">Location</Label>
                  <Input
                    placeholder="e.g. San Francisco, CA"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={formData.isRemote}
                    className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 w-full focus:outline-none focus:border-white disabled:opacity-50"
                  />
                  {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                </TextField>
              </div>
              <div>
                <button
                  type="button"
                  onClick={toggleRemote}
                  className={`w-full flex items-center justify-center gap-2 h-14 rounded-xl border text-sm font-medium transition-all ${formData.isRemote
                    ? "bg-[#3f3f46] text-white border-[#52525b]"
                    : "bg-[#18181b] border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46]"
                    }`}
                >
                  <Globe className="w-4 h-4" />
                  {formData.isRemote ? "Remote Selected" : "Set as Remote"}
                </button>
              </div>
            </div>

            {/* Compensation Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <TextField className="w-full dark">
                <Label className="text-xs text-[#a1a1aa] mb-1">Min Salary</Label>
                <Input
                  type="number"
                  placeholder="0"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 w-full focus:outline-none focus:border-white"
                />
              </TextField>

              <TextField className="w-full dark">
                <Label className="text-xs text-[#a1a1aa] mb-1">Max Salary</Label>
                <Input
                  type="number"
                  placeholder="0"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 w-full focus:outline-none focus:border-white"
                />
              </TextField>

              {/* Composable Currency Select */}
              <div className="flex flex-col gap-1 w-full">
                <Select
                  placeholder="USD"
                  selectedKey={formData.currency}
                  onSelectionChange={(key) => handleSelectChange("currency", key)}
                  className="dark"
                >
                  <Label className="text-xs text-[#a1a1aa] mb-1">Currency</Label>
                  <Select.Trigger className="bg-[#18181b] border border-[#27272a] text-white rounded-xl px-3 h-14 flex items-center justify-between focus:outline-none">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-[#18181b] border border-[#27272a] text-white rounded-xl">
                    <ListBox>
                      {currencies.map((cur) => (
                        <ListBox.Item id={cur} key={cur} textValue={cur} className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                          {cur}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>
          </Fieldset>

          <hr className="border-[#27272a]" />

          {/* SECTION 2: Job Description */}
          <Fieldset label="Job Details" className="space-y-6">

            {/* Responsibilities */}
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-xs text-[#a1a1aa]">Responsibilities</Label>
              <TextArea
                placeholder="Detail the core duties and projects the candidate will tackle..."
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={4}
                fullWidth
                className="rounded-xl border border-[#27272a] bg-[#18181b] text-white px-4 py-3 text-sm focus:border-white focus:outline-none placeholder-[#52525b]"
              />
              {errors.responsibilities && <p className="text-xs text-red-500 mt-1">{errors.responsibilities}</p>}
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-xs text-[#a1a1aa]">Requirements</Label>
              <TextArea
                placeholder="Skills, certifications, and experience required..."
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                fullWidth
                className="rounded-xl border border-[#27272a] bg-[#18181b] text-white px-4 py-3 text-sm focus:border-white focus:outline-none placeholder-[#52525b]"
              />
              {errors.requirements && <p className="text-xs text-red-500 mt-1">{errors.requirements}</p>}
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-xs text-[#a1a1aa]">Benefits (Optional)</Label>
              <TextArea
                placeholder="Perks, healthcare, equity options, PTO..."
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                fullWidth
                className="rounded-xl border border-[#27272a] bg-[#18181b] text-white px-4 py-3 text-sm focus:border-white focus:outline-none placeholder-[#52525b]"
              />
            </div>
          </Fieldset>

          <hr className="border-[#27272a]" />

          {/* SECTION 3: Linked Meta Info (Company Context) */}
          <div className="p-4 bg-[#18181b] rounded-xl border border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-950 rounded-lg text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#a1a1aa] uppercase font-bold tracking-wider">Posting As</p>
                <p className="text-white font-medium">{company.name}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              {/* <p className="text-xs text-[#a1a1aa]">
                Plan Usage: <strong className="text-white">
                  {company?.activeJobsCount}
                  </strong> / 
                  {company?.limits[company?.plan]} Active Jobs
              </p> */}
              <span className="inline-block mt-1 text-[11px] px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">
                {company.plan} Tier
              </span>
            </div>
          </div>

          {/* Actions Block */}
          <div className="pt-4 flex items-center justify-end gap-4 border-t border-[#27272a] w-full">
            <Button
              type="button"
              variant="light"
              className="text-[#a1a1aa] hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="bg-white text-black font-semibold px-6 hover:bg-zinc-200"
              endContent={!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
            >
              Publish Job
            </Button>
          </div>
        </form>}
      </div>
    </div>
  );
}