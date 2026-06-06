"use client";
import React from "react";
import { Table, Button } from "@heroui/react";
// Example Gravity UI Icons (Adjust names based on actual package usage if needed)
import { LogoLinkedin, LogoFacebook, Shield, Thunderbolt } from "@gravity-ui/icons";

// Map string keys to specific Gravity UI components or placeholders
const getIcon = (iconName) => {
  switch (iconName?.toLowerCase()) {
    case "google":
      return <LogoLinkedin className="w-5 h-5 text-zinc-300" />;
    case "facebook":
      return <LogoFacebook className="w-5 h-5 text-zinc-300" />;
    case "stripe":
      return <Shield className="w-5 h-5 text-zinc-300" />;
    case "tesla":
      return <Thunderbolt className="w-5 h-5 text-zinc-300" />;
    default:
      return <Shield className="w-5 h-5 text-zinc-300" />;
  }
};

export default function TopCompaniesCard({ data }) {
  return (
    <div className="w-full max-w-md bg-[#121212] rounded-2xl border border-zinc-800/80 p-6 text-zinc-100 flex flex-col gap-4">
      {/* Header Section */}
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-semibold tracking-wide">My Top Companies</h2>
        <button className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors">
          View all
        </button>
      </div>

      {/* HeroUI v3 Table Wrapper */}
   {/* HeroUI v3 Table Wrapper */}
<Table 
  className="bg-transparent shadow-none" 
  variant="unstyled"
  aria-label="Top Companies List"
>
  <Table.ScrollContainer>
    <Table.Content>
      {/* Visually hide the header natively via Tailwind to fix the error */}
      <Table.Header className="hidden invisible opacity-0 pointer-events-none h-0 p-0 m-0">
        <Table.Column>Company Details</Table.Column>
        <Table.Column align="end">Active Jobs</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((company) => (
          <Table.Row key={company.id} className="group hover:bg-zinc-900/10 transition-colors">
            {/* Left Side: Logo and Meta details */}
            <Table.Cell className="py-4 pl-1 pr-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center shrink-0 shadow-inner">
                  {getIcon(company.iconKey)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-zinc-100 text-[15px]">{company.name}</span>
                  <span className="text-xs text-zinc-400 tracking-wide">
                    {company.industry} • {company.location}
                  </span>
                </div>
              </div>
            </Table.Cell>

            {/* Right Side: Job Counters */}
            <Table.Cell className="py-4 pr-1 text-right">
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-base font-bold text-zinc-100 tracking-tight">{company.activeJobs}</span>
                <span className="text-[10px] text-zinc-500 font-semibold tracking-widest uppercase">
                  Active Jobs
                </span>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>

      {/* Bottom Action Button */}
      <Button 
        variant="bordered" 
        className="w-full mt-2 py-6 border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium text-sm rounded-xl hover:bg-zinc-900/30 transition-all"
      >
        View All Companies
      </Button>
    </div>
  );
}