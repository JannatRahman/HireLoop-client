import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#09090b]">
      {/* Sidebar stays fixed on the side */}
      <DashboardSidebar />
      
      {/* FIX: Added 'h-full', 'overflow-y-auto', and 'flex flex-col'.
        This allows the main panel to contain scrollable data independently 
        without breaking your footer or bleeding layout content down the page.
      */}
      <div className="flex-1 h-full overflow-y-auto flex flex-col justify-between">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;