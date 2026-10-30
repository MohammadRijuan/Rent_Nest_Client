import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label : "Landlord Dashboard",
        href : "/dashboard/landlord",
        icon : LayoutDashboard
    },
    {
        label : "My Properties",
        href : "/dashboard/landlord/properties",
        icon : FileText
    },
    {
        label : "Rental Requests",
        href : "/dashboard/landlord/requests",
        icon : FileText
    }
    
]