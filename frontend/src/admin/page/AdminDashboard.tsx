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

    if (loading) {
        return <div className="w-full h-screen flex items-center justify-center">
            <Loader />
        </div>
    }

    return (
        <div className="font-inter flex flex-col gap-10">
            <div className="w-full flex items-start flex-wrap gap-4 lg:grid grid-cols-[1.5fr_1fr_1fr_1fr]">

                <div className="col-span-">
                    <div className="flex items-start justify-between pb-2 border-b border-[#A69F9F] ">
                        <h2 className="text-xl font-normal">Profile</h2>
                        <SquarePen className="w-6 h-6 cursor-pointer" />
                    </div>

                    <div className="pt-4">
                        <h3 className="">Name: {userDetails.name}</h3>
                        <h3 className="">Phone: +91 {userDetails.phone}</h3>
                        <h3 className="">Email: {userDetails.email}</h3>
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
                                    month,
                                    count,
                                }))}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
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
