import React from 'react';
import StatCard from './StatCard';

export default function DashboardStats({ stats = [] }) {
  if (!stats || stats.length === 0) {
    return (
      <div className="w-full p-4 text-zinc-500 text-center border border-dashed border-zinc-800 rounded-xl">
        No statistics available.
      </div>
    );
  }

  return (
    <div className="w-full bg-[#09090b] py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <StatCard
            key={item.id || index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}