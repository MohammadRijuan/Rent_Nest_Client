import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard } from "lucide-react"

// import { AUTHOR_SIDEBAR_ITEMS } from "./authorSidebarItems"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebar"
import { LANDLORD_SIDEBAR_ITEMS } from "./landlordSidebar"


const TENANT_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/dashboard/tenant",
        icon : LayoutDashboard
    },
    {
        label : "My Rental Requests",
        href : "/dashboard/tenant/requests",
        icon : FileText
    },
]


export const sidebarMenuItems = {
    TENANT : TENANT_SIDEBAR_ITEMS,
    LANDLORD : LANDLORD_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}