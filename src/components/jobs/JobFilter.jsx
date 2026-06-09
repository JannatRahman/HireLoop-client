"use client";

import React, { useState, useEffect } from "react";
import { Select, ListBox, TextField, InputGroup } from "@heroui/react";
import { Magnifier, Briefcase, MapPin, Tag } from "@gravity-ui/icons";

export default function JobFilter({ allJobs = [], onFilterChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");

  const categories = ["all", ...Array.from(new Set(allJobs.map((j) => j.category).filter(Boolean)))];
  const jobTypes = ["all", ...Array.from(new Set(allJobs.map((j) => j.jobType).filter(Boolean)))];
  const locations = ["all", ...Array.from(new Set(allJobs.map((j) => j.location).filter(Boolean)))];

  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "all" || job.category === category;
      const matchesJobType = jobType === "all" || job.jobType === jobType;
      const matchesLocation = location === "all" || job.location === location;

      return matchesSearch && matchesCategory && matchesJobType && matchesLocation;
    });

    onFilterChange(filtered);
  }, [search, category, jobType, location, allJobs, onFilterChange]);

  return (
    <div className="w-full bg-[#121212] border border-zinc-800 p-5 rounded-[24px] shadow-xl flex flex-col gap-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

        {/* Search Input Group */}
        <div className="md:col-span-1">
          <TextField>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
              Search Job
            </span>
            <InputGroup className="bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 focus-within:border-pink-500/50 transition-colors h-11 flex items-center px-3">
              <InputGroup.Prefix className="mr-2 text-zinc-500">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Title or company..."
                className="bg-transparent text-sm w-full focus:outline-none text-zinc-200 placeholder-zinc-600"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* Category Dropdown Filter */}
        <div>
          <Select selectedKey={category} onSelectionChange={(key) => setCategory(key)}>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
              Category
            </span>
            <Select.Trigger className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 h-11 flex items-center justify-between text-sm text-zinc-200 hover:border-zinc-700 transition-colors w-full">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-pink-400" />
                <Select.Value>{category === "all" ? "All Categories" : category}</Select.Value>
              </div>
              <Select.Indicator className="text-zinc-500" />
            </Select.Trigger>
            <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1 max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <ListBox.Item
                    key={cat}
                    id={cat}
                    textValue={cat}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors capitalize ${category === cat ? "bg-pink-500/10 text-pink-400" : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Job Type Dropdown Filter */}
        <div>
          <Select selectedKey={jobType} onSelectionChange={(key) => setJobType(key)}>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
              Job Type
            </span>
            <Select.Trigger className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 h-11 flex items-center justify-between text-sm text-zinc-200 hover:border-zinc-700 transition-colors w-full">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-pink-400" />
                <Select.Value>{jobType === "all" ? "All Types" : jobType}</Select.Value>
              </div>
              <Select.Indicator className="text-zinc-500" />
            </Select.Trigger>
            <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1 max-h-60 overflow-y-auto">
                {jobTypes.map((type) => (
                  <ListBox.Item
                    key={type}
                    id={type}
                    textValue={type}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors capitalize ${jobType === type ? "bg-pink-500/10 text-pink-400" : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                  >
                    {type === "all" ? "All Types" : type}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Location Dropdown Filter */}
        <div>
          <Select selectedKey={location} onSelectionChange={(key) => setLocation(key)}>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">
              Location
            </span>
            <Select.Trigger className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 h-11 flex items-center justify-between text-sm text-zinc-200 hover:border-zinc-700 transition-colors w-full">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                <Select.Value>{location === "all" ? "All Locations" : location}</Select.Value>
              </div>
              <Select.Indicator className="text-zinc-500" />
            </Select.Trigger>
            <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1 max-h-60 overflow-y-auto">
                {locations.map((loc) => (
                  <ListBox.Item
                    key={loc}
                    id={loc}
                    textValue={loc}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors capitalize ${location === loc ? "bg-pink-500/10 text-pink-400" : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                  >
                    {loc === "all" ? "All Locations" : loc}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

      </div>
    </div>
    
  );
}