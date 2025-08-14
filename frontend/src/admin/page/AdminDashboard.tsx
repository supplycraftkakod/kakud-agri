import { useEffect, useState } from "react";
import { FileImage, SquarePen } from "lucide-react";
import axios from "axios";
import { BE_URL } from "../../../config";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

interface MostViewedProduct {
    id: number;
    name: string;
    views: number;
}

const AdminDashboard = () => {
    // const [totalViews, setTotalViews] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalBlogs, setTotalBlogs] = useState<number>(0);
    const [totalEvents, setTotalevetns] = useState<number>(0);
    const [mostViewed, setMostViewed] = useState<MostViewedProduct[]>([]);
    const [productsByMonth, setProductsByMonth] = useState<{ [month: string]: number }>({});
    const [userDetails, setUserDetails] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editedDetails, setEditedDetails] = useState(userDetails);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEditedDetails((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditButton = () => {
        setEditedDetails(userDetails);
        setEditMode(true);
    }

    const handleUpdate = async () => {
        try {
            const authStorage = localStorage.getItem("auth");
            let token: any;

            if (authStorage) {
                const authData = JSON.parse(authStorage);
                token = authData.token;
            }

            await toast.promise(
                async () => {
                    return await axios.put(
                        `${BE_URL}/api/v1/user/me`,
                        {
                            name: editedDetails.name,
                            phone: editedDetails.phone,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                },
                {
                    loading: "Updating profile...",
                    success: "Profile updated successfully!",
                    error: "Failed to update profile.",
                }
            );
            // console.log("User updated:", res.data);
            setEditMode(false);
            window.location.reload();
        } catch (err) {
            toast.error("Error occcured. Try Again!")
            // console.error("Update failed:", err);
        }

    };

    const handleCancel = () => {
        setEditedDetails(userDetails);
        setEditMode(false);
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

                const [analytics, mostViewedRes, monthlyRes, userDetails] = await Promise.all<any>([
                    // axios.get(`${BE_URL}/api/v1/admin/views`, config),
                    axios.get(`${BE_URL}/api/v1/admin/analytics`, config),
                    axios.get(`${BE_URL}/api/v1/admin/most-viewed`, config),
                    axios.get(`${BE_URL}/api/v1/admin/monthly`, config),
                    axios.get(`${BE_URL}/api/v1/user/me`, config),
                ]);

                // setTotalViews(viewsRes.data.totalViews);
                setTotalProducts(analytics.data.totalProducts);
                setTotalBlogs(analytics.data.totalBlogs);
                setTotalevetns(analytics.data.totalEvents);
                setMostViewed(mostViewedRes.data.mostViewed);
                setProductsByMonth(monthlyRes.data.productsByMonth);
                setUserDetails(userDetails.data.user);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const monthMap: { [key: string]: string } = {
        "2025-01": "Jan", "2025-02": "Feb", "2025-03": "Mar", "2025-04": "Apr",
        "2025-05": "May", "2025-06": "Jun", "2025-07": "Jul", "2025-08": "Aug",
        "2025-09": "Sep", "2025-010": "Oct", "2025-011": "Nov", "2025-012": "Dec",
    };

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <Loader />
        </div>
    }

    return (
        <div className="font-inter flex flex-col gap-10">
            <div className="w-full flex items-start flex-wrap gap-4 lg:grid grid-cols-[1.5fr_1fr_1fr_1fr]">

                <div className="col-span-">
                    <div className="flex items-start justify-between pb-1 border-b border-[#A69F9F]">
                        <h2 className="text-xl font-normal">Profile</h2>
                        {!editMode && (
                            <SquarePen
                                className="w-6 h-6 cursor-pointer"
                                onClick={handleEditButton}
                            />
                        )}
                    </div>

                    <div className="pt-2 space-y-2">
                        {editMode ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedDetails.name}
                                    onChange={handleChange}
                                    className="p-1 pl-2 border rounded-sm w-full !outline-none"
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedDetails.phone}
                                    onChange={handleChange}
                                    className="p-1 pl-2 border rounded-sm w-full !outline-none"
                                    placeholder="Phone"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editedDetails.email}
                                    onChange={handleChange}
                                    className="p-1 pl-2 border rounded-sm w-full !outline-none"
                                    placeholder="Email"
                                />

                                <div className="w-full grid grid-cols-2 gap-3 mt-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="px-4 py-1 bg-[#1d1d1d] text-white rounded-full hover:bg-[#111111]"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Name: {userDetails.name}</h3>
                                <h3>Phone: +91 {userDetails.phone}</h3>
                                <h3>Email: {userDetails.email}</h3>
                            </>
                        )}
                    </div>
                </div>

                {/* <div className="sm:w-[210px] lg:min-w-full bg-[#DBE4FF] px-6 py-4 rounded-xl flex flex-col gap-6">
                    <Eye className="w-9 h-9" />
                    <div>
                        {
                            totalViews > 1000 ? (
                                <h2 className="font-medium text-xl">{(totalViews / 1000).toFixed(1)}K</h2>
                            ) : (
                                <h2 className="font-medium text-xl">{totalViews}</h2>
                            )
                        }
                        <h3 className="text-lg text-[#505050]">Total Views</h3>
                    </div>
                </div> */}

                <div className=" bg-[#d8d6ff] p-4 rounded-xl flex flex-col gap-6">
                    <FileImage className="w-6 h-6" />
                    <div>
                        <h2 className="font-medium text-lg">{totalProducts}</h2>
                        <h3 className="text-[#505050]">Total <span className="font-semibold text-black">Products</span></h3>
                    </div>
                </div>
                <div className=" bg-[#d8d6ff] px-6 py-4 rounded-xl flex flex-col gap-6">
                    <FileImage className="w-6 h-6" />
                    <div>
                        <h2 className="font-medium text-lg">{totalBlogs}</h2>
                        <h3 className="text-[#505050]">Total <span className="font-semibold text-black">Blogs</span></h3>
                    </div>
                </div>
                <div className=" bg-[#d8d6ff] px-6 py-4 rounded-xl flex flex-col gap-6">
                    <FileImage className="w-6 h-6" />
                    <div>
                        <h2 className="font-medium text-lg">{totalEvents}</h2>
                        <h3 className="text-[#505050]">Total <span className="font-semibold text-black">Events</span></h3>
                    </div>
                </div>

            </div>

            <div className="w-full flex items-start flex-wrap gap-4">

                <div className="lg:w-[672px]">
                    <div className="flex items-start justify-between pb-2 border-b border-[#A69F9F] ">
                        <h2 className="text-xl font-normal">Products added by months</h2>
                    </div>

                    <div className="pt-4">

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={Object.entries(productsByMonth).map(([month, count]) => ({
                                    month: monthMap[month] || month,
                                    count,
                                }))}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                </div>

                <div className="w-full xl:w-fit">
                    <div className="flex items-start justify-between pb-2 border-b border-[#A69F9F] ">
                        <h2 className="text-xl font-normal">Most viewed products</h2>
                    </div>

                    <div className="pt-4 flex flex-col justify-between gap-2">
                        {mostViewed.map((product, index) => (
                            <div
                                key={product.id}
                                className="text-lg flex items-start justify-between"
                            >
                                <h3>{index + 1}. {product.name}</h3>
                                <h3>{(product.views / 1000).toFixed(1)}K</h3>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
