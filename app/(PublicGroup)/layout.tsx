import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";


const publicGroupLayout = async(
    {
        children
    }
        :
        {
            children: React.ReactNode

        }
) => {

    const user = await getMe()
    return (
        <div suppressHydrationWarning>
            <Navbar user = {user}/>
            {children}
            <Footer/>

        </div>
    );
};

export default publicGroupLayout;