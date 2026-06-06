"use client";
import React from "react";
import { Table } from "@heroui/react";

// Helper function to handle status badge styles dynamically
const getStatusStyles = (status) => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "interviewing":
      return "bg-green-950/40 text-green-400 border border-green-800/60";
    case "new":
      return "bg-zinc-800 text-zinc-300 border border-zinc-700/50";
    case "reviewing":
      return "bg-amber-950/40 text-amber-400 border border-amber-800/60";
    case "rejected":
      return "bg-red-950/40 text-red-400 border border-red-800/60";
    default:
      return "bg-zinc-800 text-zinc-300";
  }
};

export default function ApplicationTable({ columns, data }) {
  return (
    <div className="w-full bg-[#121212] rounded-xl border border-zinc-800/80 p-6 text-zinc-100">
      {/* Table Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold tracking-wide">Recent Applications</h2>
        <button className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors">
          View all
        </button>
      </div>

      {/* HeroUI v3 Table Implementation */}
      <Table className="bg-transparent" variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="Recent Applications Table">
            <Table.Header>
              {columns.map((col) => (
                <Table.Column 
                  key={col.uid} 
                  className="bg-transparent text-zinc-400 text-xs font-medium border-b border-zinc-800 py-4"
                >
                  {col.name}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {data.map((row) => (
                <Table.Row key={row.id} className="border-b border-zinc-900/60 hover:bg-zinc-900/20 transition-colors">
                  {columns.map((col) => (
                    <Table.Cell key={col.uid} className="py-5 text-sm">
                      {/* Column 1: Candidate Name with Avatar */}
                      {col.uid === "name" && (
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                            {/* Gravity UI placeholder icon or empty space like image */}
                          </div>
                          <span className="font-semibold text-zinc-100">{row.name}</span>
                        </div>
                      )}

                      {/* Column 2: Role */}
                      {col.uid === "role" && (
                        <span className="text-zinc-400 font-normal">{row.role}</span>
                      )}

                      {/* Column 3: Date Applied */}
                      {col.uid === "date" && (
                        <span className="text-zinc-400">{row.date}</span>
                      )}

                      {/* Column 4: Experience */}
                      {col.uid === "experience" && (
                        <span className="text-zinc-400">{row.experience}</span>
                      )}

                      {/* Column 5: Status Badges */}
                      {col.uid === "status" && (
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium tracking-wide min-w-[90px] text-center ${getStatusStyles(row.status)}`}>
                          {row.status}
                        </span>
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}