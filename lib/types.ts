import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IUser = {
    success: boolean,
    message: string,
    data: {
        profile: {
            id: string,
            name: string,
            email: string,
            activeStatus: string,
            role: string,
            createdAt: string,
            updatedAt: string,
            profile: {
                id: string,
                profilePhoto: string,
                bio: string | null,
                userId: string,
                createdAt: string,
                updatedAt: string
            }
        }
    }
}


export type NavbarProps = {
    user: IUser | null
}


export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}