import React from 'react';
import { Card } from "@heroui/react";

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="bg-[#18181b] border border-neutral-800 text-white rounded-xl shadow-sm h-full">
      {/* Card.Content handles the internal structural layout and spacing cleanly */}
      <Card.Content className="p-6 flex flex-col justify-between gap-6">
        
        {/* Icon Container */}
        <div className="w-10 h-10 flex items-center justify-center bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-zinc-400">
          {Icon && <Icon width={18} height={18} />}
        </div>

        {/* Content Grouping */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-zinc-400 font-medium tracking-wide">
            {title}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-100">
            {value}
          </h3>
        </div>

      </Card.Content>
    </Card>
  );
}