import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import AdminButton from "./components/AdminButton"
import AdminDashboard from "./page/AdminDashboard";
import ViewAllProducts from "./page/ViewAllProducts";
import AddProduct from "./page/AddProduct";
import Banners from "./page/Banners";
import { BE_URL } from "../../config";
import axios from "axios";

const AdminHome = () => {
    const [selectedComponent, setSelectedComponent] = useState("adminDashboard");
    const [userDetails, setUserDetails] = useState<any>();

    const handleComponentSelection = (component: string) => {
        setSelectedComponent(component)
    }

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const authStorage = localStorage.getItem("auth");
                let token;

                if (authStorage) {
                    const authData = JSON.parse(authStorage);
                    token = authData.token;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const res = await axios.get<any>(`${BE_URL}/api/v1/user/me`, config)
                setUserDetails(res.data.user);
            } catch (err) { }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className="w-full min-h-screen pb-6 sm:pb-8 pt-20 md:pt-28 px-4 sm:px-[1rem] lg:px-[2.6rem] flex flex-col md:flex-row items-stretch md:justify-between gap-4 font-inter">
                <div className="w-full md:max-w-[250px] md:min-h-[82vh] p-4 flex flex-col gap-10 border border-[#A69F9F] rounded-xl font-playfair">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-[72px] h-[72px] bg-pink-300 rounded-full text-2xl flex items-center justify-center">
                            {userDetails?.name &&
                                <h2>{userDetails.name[0]}</h2>}
                            {/* <h2>A</h2> */}
                        </div>
                        <h2 className="text-xl">
                            {userDetails?.name &&
                                <h2>
                                    {userDetails?.name}
                                </h2>}
                        </h2>
                        {/* <h2>Abul Khasim</h2> */}
                    </div>
                    <div className="flex flex-col gap-2">
                        <AdminButton
                            label="Dashboard"
                            componentName="adminDashboard"
                            selectedComponent={selectedComponent}
                            handleComponentSelection={handleComponentSelection}
                        />
                        <AdminButton
                            label="View all products"
                            componentName="viewAllProducts"
                            selectedComponent={selectedComponent}
                            handleComponentSelection={handleComponentSelection}
                        />
                        <AdminButton
                            label="Add new product"
                            componentName="addNewProduct"
                            selectedComponent={selectedComponent}
                            handleComponentSelection={handleComponentSelection}
                        />
                        <AdminButton
                            label="Banners"
                            componentName="banners"
                            selectedComponent={selectedComponent}
                            handleComponentSelection={handleComponentSelection}
                        />
                    </div>
                </div>

                <div className="w-full sm:min-h-full p-4 md:p-8 border border-[#A69F9F] rounded-xl">
                    {selectedComponent === "adminDashboard" && <AdminDashboard />}
                    {selectedComponent === "viewAllProducts" && <ViewAllProducts />}
                    {selectedComponent === "addNewProduct" && <AddProduct />}
                    {selectedComponent === "banners" && <Banners />}
                </div>
            </div>
        </div>
    )
}

export default AdminHome