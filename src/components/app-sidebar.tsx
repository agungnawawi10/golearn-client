// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import {
//   LayoutDashboard,
//   PlusSquare,
//   ShieldCheck,
//   Users,
//   ChevronLeft,
//   LogOut,
// } from "lucide-react"

// import { useAuth } from "@/components/auth/auth-provider"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"

// const dashboardItems = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Daftar Coach",
//     url: "/dashboard/coach",
//     icon: Users,
//   },
//   {
//     title: "Daftar Registration",
//     url: "/dashboard/registration",
//     icon: PlusSquare,
//   },
//   {
//     title: "Daftar Athlete",
//     url: "/dashboard/athletes",
//     icon: ShieldCheck,
//   },
// ]

// export function AppSidebar() {
//   const pathname = usePathname()
//   const { logout } = useAuth()

//   return (
//     <Sidebar collapsible="icon" className="border-r border-sidebar-border/70">
//       <SidebarHeader className="gap-3 border-b border-sidebar-border/70 p-3">
//         <div className="flex items-center justify-between gap-2">
//           <div className="min-w-0">
//             <p className="truncate text-sm font-semibold text-sidebar-foreground">DOJO Dashboard</p>
//             <p className="truncate text-xs text-sidebar-foreground/70">Management Console</p>
//           </div>

//           <SidebarTrigger className="shrink-0" />
//         </div>

//         <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
//           <Link href="/dashboard">
//             <ChevronLeft className="size-4" />
//             <span>Back to dashboard</span>
//           </Link>
//         </Button>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {dashboardItems.map((item) => {
//                 const Icon = item.icon
//                 const isActive =
//                   item.url === "/dashboard"
//                     ? pathname === item.url
//                     : pathname === item.url || pathname.startsWith(`${item.url}/`)

//                 return (
//                   <SidebarMenuItem key={item.url}>
//                     <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
//                       <Link href={item.url}>
//                         <Icon />
//                         <span>{item.title}</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 )
//               })}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter className="border-t border-sidebar-border/70 p-3">
//         <Button
//           variant="outline"
//           className="w-full justify-start gap-2"
//           onClick={logout}
//         >
//           <LogOut className="size-4" />
//           <span>Logout</span>
//         </Button>
//       </SidebarFooter>

//       <SidebarRail />
//     </Sidebar>
//   )
// }
