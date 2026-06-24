import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full bg-background text-foreground overflow-x-hidden">
            <DashboardSidebar />
            <div className="flex-1 w-full p-4 md:p-6 lg:p-8 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
