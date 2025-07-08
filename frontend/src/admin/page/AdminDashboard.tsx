import { Eye, FileImage, SquarePen } from "lucide-react"
import productGraph from "../../assets/images/product-graph.png"

const AdminDashboard = () => {
    return (
        <div className="font-inter flex flex-col gap-6">
            <div className="w-full flex items-start flex-wrap gap-4">

                <div className="w-full sm:w-[340px]">
                    <div className="flex items-start justify-between pb-2 border-b border-[#A69F9F] ">
                        <h2 className="text-xl">Profile</h2>
                        <SquarePen className="w-6 h-6 cursor-pointer" />
                    </div>

                    <div className="pt-4">
                        <h3 className="text-lg">Name: Abul Khasim</h3>
                        <h3 className="text-lg">Phone: +91 8413333131</h3>
                        <h3 className="text-lg">Email: abulkhasim@gamil.com</h3>
                    </div>
                </div>

                <div className="sm:w-[210px] bg-[#DBE4FF] px-6 py-4 rounded-xl flex flex-col gap-6">
                    <Eye className="w-9 h-9" />
                    <div>
                        <h2 className="font-medium text-xl">24.6K</h2>
                        <h3 className="text-lg text-[#505050]">Total Views</h3>
                    </div>
                </div>

                <div className="sm:w-[210px] bg-[#FFF1DB] px-6 py-4 rounded-xl flex flex-col gap-6">
                    <FileImage className="w-9 h-9" />
                    <div>
                        <h2 className="font-medium text-xl">147</h2>
                        <h3 className="text-lg text-[#505050]">Total Products</h3>
                    </div>
                </div>

            </div>

            <div className="w-full flex items-start flex-wrap gap-4">

                <div className="lg:w-[672px]">
                    <div className="flex items-start justify-between pb-2 border-b border-[#A69F9F] ">
                        <h2 className="text-xl">Products added by months</h2>
                    </div>

                    <div className="pt-4">
                        <img src={productGraph} alt="graph" className="lg:max-w-[672px]" />
                    </div>
                </div>

                <div className="w-full xl:w-fit">
                    <div className="flex items-start justify-between pb-2 border-b border-[#A69F9F] ">
                        <h2 className="text-xl">Most viewed products</h2>
                    </div>

                    <div className="pt-4">
                        <div className="text-lg flex items-start justify-between">
                            <h3>1. Analic</h3>
                            <h3>20K</h3>
                        </div>
                        <div className="text-lg flex items-start justify-between">
                            <h3>2. Acemain</h3>
                            <h3>20K</h3>
                        </div>
                        <div className="text-lg flex items-start justify-between">
                            <h3>3. Agas</h3>
                            <h3>20K</h3>
                        </div>
                        <div className="text-lg flex items-start justify-between">
                            <h3>4. Agil</h3>
                            <h3>20K</h3>
                        </div>
                        <div className="text-lg flex items-start justify-between">
                            <h3>5. Bazak</h3>
                            <h3>20K</h3>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AdminDashboard