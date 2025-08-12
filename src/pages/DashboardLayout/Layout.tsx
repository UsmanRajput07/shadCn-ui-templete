import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./SideBar";
import { Navigate, Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import useAuthTokenStore from "@/zustand/store";

export default function Layout() {
  // const token = useAuthTokenStore((state) => state.token);
  // if (token === "") return <Navigate to="/" replace />;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "450px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="w-full h-[calc(100vh-100px)] px-4 py-8">
          <Toaster position="top-center" />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
