

import { getUserSession } from "@/lib/api/core/session";
import { LayoutSideContentLeft, Bell, Envelope, Briefcase, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard, HouseFill, GearBranches } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { nav } from "motion/react-client";
import Link from "next/link";

export async function DashboardSidebar() {

  const user = await getUserSession();
   
  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Publish A Job" },
    { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },

    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
  { icon: HouseFill, href: "/dashboard/seeker", label: "Dashboard" },
  { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
  { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
  { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
  { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
  { icon: GearBranches, href: "/dashboard/seeker/settings", label: "Settings" }
];

const adminNavLinks=  [
  { icon: LayoutSideContentLeft, href: "/dashboard/admin", label: "Dashboard" },
  { icon: Person, href: "/dashboard/admin/users", label: "Users" },
  { icon: House, href: "/dashboard/admin/companies", label: "Companies" },
  { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
  { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
  { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
];

const navLinksMap = {
  seeker: seekerNavLinks,
  recruiter: recruiterNavLinks,
  admin: adminNavLinks
}
  

  const navItems = navLinksMap[user?.role || 'seeker'];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  )

  return (
    <>
    <aside className="hidden w-64 shrink-0 border-r lg:block">
      {navContent}
    </aside>

      <Drawer>
        <Button className='lg:hidden' variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}