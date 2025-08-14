import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import AdminButton from "./components/AdminButton"
import AdminDashboard from "./page/AdminDashboard";
import ViewAllProducts from "./page/ViewAllProducts";
import AddProduct from "./page/AddProduct";
import Banners from "./page/Banners";
import { BE_URL } from "../../config";
import axios from "axios";
import Loader from "../components/Loader";
import BlogEditor from "./page/BlogEditor";
import ViewAllBlogs from "./page/ViewAllBlogs";
import AddEvent from "./page/event/AddEvent";
import VIewAllEvents from "./page/event/VIewAllEvents";
import { ArrowDown } from "lucide-react";
import AllJobs from "./page/job-roles/AllJobs";
import AddNewJob from "./page/job-roles/AddNewJob";
import AdminImpact from "./page/impact/AdminImpact";
import AddImpact from "./page/impact/AddImpact";
import TeamDetails from "./page/team/AllTeamMembers";
import AddNewMember from "./page/team/AddNewMember";
import { logoutUser } from "../utils/logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
    const [selectedComponent, setSelectedComponent] = useState("adminDashboard");
    const [userDetails, setUserDetails] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [arrowDownProductsMgm, setArrowDownProductsMgm] = useState(false);
    const [arrowDownBlogsMgm, setArrowDownBlogsMgm] = useState(false);
    const [arrowDownEventsMgm, setArrowDownEventsMgm] = useState(false);
    const [arrowDownBannersMgm, setArrowDownBannersMgm] = useState(false);
    const [arrowJobRole, setArrowJobRole] = useState(false);
    const [arrowImpact, setArrowImpact] = useState(false);
    const [arrowTeam, setArrowTeam] = useState(false);

    const handleComponentSelection = (component: string) => {
        setSelectedComponent(component)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser({
            dispatch,
            navigate,
            showToast: true,
            revokeRefreshToken: false,
            refreshToken: localStorage.getItem('refreshToken') || '',
        });
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
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
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <Loader />
        </div>
    }

    return (
        <div className="max-w-[100em] mx-auto">
            <div>
                <Navbar />
            </div>

            <div className="w-full min-h-screen pb-6 sm:pb-8 pt-20 sm:pt-0 px-4 sm:px-[1rem] lg:px-[2.6rem] flex flex-col md:flex-row items-stretch md:justify-between gap-4 font-inter font-light">
                <div className="w-full md:max-w-[250px] md:min-h-[82vh] p-4 flex flex-col gap-10 border border-gray-300 rounded-xl ">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-[72px] h-[72px] bg-[#D8D6FF] rounded-full text-2xl flex items-center justify-center">
                            {userDetails?.name &&
                                <h2>{userDetails.name[0]}</h2>}
                            {/* <h2>A</h2> */}
                        </div>
                        <h2 className="text-xl">
                            <h2 className="text-center text-sm ">Welcome Admin</h2>
                            {userDetails?.name &&
                                <h2>
                                    {userDetails?.name}
                                </h2>
                            }
                        </h2>
                        {/* <h2>Abul Khasim</h2> */}
                    </div>

                    <div className="flex flex-col gap-12 text-[14px]">
                        <div className="flex flex-col gap-3">
                            <AdminButton
                                label="Analytics"
                                componentName="adminDashboard"
                                selectedComponent={selectedComponent}
                                handleComponentSelection={handleComponentSelection}
                            />
                            <div className={`${arrowDownProductsMgm ? "h-fit" : "h-8"} w-full pb-2 rounded-lg pl-2 px-2 py-1 flex flex-col gap-2 border border-gray-300 overflow-hidden`}>
                                <div
                                    onClick={() => setArrowDownProductsMgm(!arrowDownProductsMgm)}
                                    className="flex items-center justify-between text-[14px] cursor-pointer select-none">
                                    <h2>Products Management</h2>
                                    <ArrowDown
                                        className={`w-[18px] h-[18px] ${arrowDownProductsMgm ? "rotate-180" : "rotate-0"} border p-[1px] border-gray-500 rounded-full`}
                                    />
                                </div>
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
                            </div>
                            <div className={`${arrowDownBlogsMgm ? "h-fit" : "h-8"} w-full pb-2 rounded-lg pl-2 px-2 py-1 flex flex-col gap-2 border border-gray-300 overflow-hidden`}>
                                <div
                                    onClick={() => setArrowDownBlogsMgm(!arrowDownBlogsMgm)}
                                    className="flex items-center justify-between text-[14px] cursor-pointer select-none">
                                    <h2>Blogs Management</h2>
                                    <ArrowDown
                                        className={`w-[18px] h-[18px] ${arrowDownBlogsMgm ? "rotate-180" : "rotate-0"} border p-[1px] border-gray-500 rounded-full`}
                                    />
                                </div>
                                <AdminButton
                                    label="Write a Blog"
                                    componentName="blog"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                                <AdminButton
                                    label="View All Blogs"
                                    componentName="viewAllBlogs"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                            </div>

                            <div className={`${arrowDownEventsMgm ? "h-fit" : "h-8"} w-full pb-2 rounded-lg pl-2 px-2 py-1 flex flex-col gap-2 border border-gray-300 overflow-hidden`}>
                                <div
                                    onClick={() => setArrowDownEventsMgm(!arrowDownEventsMgm)}
                                    className="flex items-center justify-between text-[14px] cursor-pointer select-none">
                                    <h2>Events Management</h2>
                                    <ArrowDown
                                        className={`w-[18px] h-[18px] ${arrowDownEventsMgm ? "rotate-180" : "rotate-0"} border p-[1px] border-gray-500 rounded-full`}
                                    />
                                </div>
                                <AdminButton
                                    label="Add Event"
                                    componentName="addEvent"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                                <AdminButton
                                    label="View All Events"
                                    componentName="viewAllEvents"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                            </div>

                            <div className={`${arrowDownBannersMgm ? "h-fit" : "h-8"} w-full pb-2 rounded-lg pl-2 px-2 py-1 flex flex-col gap-2 border border-gray-300 overflow-hidden`}>
                                <div
                                    onClick={() => setArrowDownBannersMgm(!arrowDownBannersMgm)}
                                    className="flex items-center justify-between text-[14px] cursor-pointer select-none">
                                    <h2><span className="">Banners</span> Management</h2>
                                    <ArrowDown
                                        className={`w-[18px] h-[18px] ${arrowDownBannersMgm ? "rotate-180" : "rotate-0"} border p-[1px] border-gray-500 rounded-full`}
                                    />
                                </div>
                                <AdminButton
                                    label="Banners"
                                    componentName="banners"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                            </div>

                            <div className={`${arrowJobRole ? "h-fit" : "h-8"} w-full pb-2 rounded-lg pl-2 px-2 py-1 flex flex-col gap-2 border border-gray-300 overflow-hidden`}>
                                <div
                                    onClick={() => setArrowJobRole(!arrowJobRole)}
                                    className="flex items-center justify-between text-[14px] cursor-pointer select-none">
                                    <h2><span className="">Jobs</span> Management</h2>
                                    <ArrowDown
                                        className={`w-[18px] h-[18px] ${arrowJobRole ? "rotate-180" : "rotate-0"} border p-[1px] border-gray-500 rounded-full`}
                                    />
                                </div>
                                <AdminButton
                                    label="All Jobs"
                                    componentName="alljobs"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                                <AdminButton
                                    label="Add New Job"
                                    componentName="addnewjob"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                            </div>

                            <div className={`${arrowImpact ? "h-fit" : "h-8"} w-full pb-2 rounded-lg pl-2 px-2 py-1 flex flex-col gap-2 border border-gray-300 overflow-hidden`}>
                                <div
                                    onClick={() => setArrowImpact(!arrowImpact)}
                                    className="flex items-center justify-between text-[14px] cursor-pointer select-none">
                                    <h2><span className="">Impacts</span> Management</h2>
                                    <ArrowDown
                                        className={`w-[18px] h-[18px] ${arrowImpact ? "rotate-180" : "rotate-0"} border p-[1px] border-gray-500 rounded-full`}
                                    />
                                </div>
                                <AdminButton
                                    label="All Impacts"
                                    componentName="impact"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                                <AdminButton
                                    label="Add New Impacts"
                                    componentName="addnewimpact"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                            </div>

                            <div className={`${arrowTeam ? "h-fit" : "h-8"} w-full pb-2 rounded-lg pl-2 px-2 py-1 flex flex-col gap-2 border border-gray-300 overflow-hidden`}>
                                <div
                                    onClick={() => setArrowTeam(!arrowTeam)}
                                    className="flex items-center justify-between text-[14px] cursor-pointer select-none">
                                    <h2><span className="">Team</span> Details</h2>
                                    <ArrowDown
                                        className={`w-[18px] h-[18px] ${arrowTeam ? "rotate-180" : "rotate-0"} border p-[1px] border-gray-500 rounded-full`}
                                    />
                                </div>
                                <AdminButton
                                    label="All Team Members"
                                    componentName="teamdetails"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                                <AdminButton
                                    label="Add New Members"
                                    componentName="addnewmember"
                                    selectedComponent={selectedComponent}
                                    handleComponentSelection={handleComponentSelection}
                                />
                            </div>

                        </div>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
                            Logout
                        </button>

                    </div>

                    <div className="flex flex-col gap-2">

                    </div>
                </div>

                <div className="w-full sm:min-h-full p-4 md:p-8 border border-gray-300 rounded-xl">
                    {selectedComponent === "adminDashboard" && <AdminDashboard />}
                    {selectedComponent === "viewAllProducts" && <ViewAllProducts />}
                    {selectedComponent === "addNewProduct" && <AddProduct />}
                    {selectedComponent === "banners" && <Banners />}
                    {selectedComponent === "blog" && <BlogEditor />}
                    {selectedComponent === "viewAllBlogs" && <ViewAllBlogs />}
                    {selectedComponent === "addEvent" && <AddEvent />}
                    {selectedComponent === "viewAllEvents" && <VIewAllEvents />}
                    {selectedComponent === "alljobs" && <AllJobs />}
                    {selectedComponent === "addnewjob" && <AddNewJob />}
                    {selectedComponent === "impact" && <AdminImpact />}
                    {selectedComponent === "addnewimpact" && <AddImpact />}
                    {selectedComponent === "teamdetails" && <TeamDetails />}
                    {selectedComponent === "addnewmember" && <AddNewMember />}
                </div>
            </div>
        </div>
    )
}

export default AdminHome