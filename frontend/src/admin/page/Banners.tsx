import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../config";
import Loader from "../../components/Loader";
import { X } from "lucide-react";

interface Banner {
  id: number;
  imageUrl: string;
  title: string;
  paragraph: string;
  shouldVisible: boolean;
  createdAt: string;
}

interface BannerInput {
  file: File;
  previewUrl: string;
  title: string;
  paragraph: string;
  blogId?: string; // optional at first
}

const Banners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannersToUpload, setBannersToUpload] = useState<BannerInput[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [showBlogSelectorIndex, setShowBlogSelectorIndex] = useState<number | null>(null);


  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ banners: Banner[] }>(
        `${BE_URL}/api/v1/banners/`
      );
      setBanners(res.data.banners);
    } catch (err) {
      console.error("Error fetching banners", err);
      setError("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 5) {
      setError("You can upload up to 5 images at once.");
      return;
    }

    const inputs: BannerInput[] = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      title: "",
      paragraph: "",
    }));

    setBannersToUpload(inputs);
    setError(null);
  };


  const handleUpload = async () => {
    if (bannersToUpload.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();

    bannersToUpload.forEach((banner) => {
      formData.append("images", banner.file);
      formData.append("titles", banner.title);
      formData.append("paragraphs", banner.paragraph);
      formData.append("blogId", banner.blogId || "");
    });


    try {
      await axios.post(`${BE_URL}/api/v1/banners/upload`, formData);
      setBannersToUpload([]);
      fetchBanners();
    } catch (err) {
      console.error("Upload failed", err);
      setError("Upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };


  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BE_URL}/api/v1/banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleToggleVisibility = async (id: number, visible: boolean) => {
    try {
      await axios.patch(`${BE_URL}/api/v1/banners/visibility/${id}`, {
        visible: !visible,
      });
      fetchBanners();
    } catch (err) {
      console.error("Toggle visibility failed", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="flex flex-col gap-6">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="text-sm"
        />

        {bannersToUpload.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bannersToUpload.map((banner, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <img
                  src={banner.previewUrl}
                  alt={`Preview ${index}`}
                  className="w-full h-40 object-cover rounded"
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={banner.title}
                  onChange={(e) => {
                    const updated = [...bannersToUpload];
                    updated[index].title = e.target.value;
                    setBannersToUpload(updated);
                  }}
                  className="w-full px-3 py-1 border rounded !outline-none"
                />
                <textarea
                  placeholder="Paragraph"
                  value={banner.paragraph}
                  onChange={(e) => {
                    const updated = [...bannersToUpload];
                    updated[index].paragraph = e.target.value;
                    setBannersToUpload(updated);
                  }}
                  className="w-full px-3 py-1 border rounded !outline-none"
                />
                {banner.blogId && (
                  <div
                    onClick={() => setShowBlogSelectorIndex(index)}
                    className="w-full text-center px-4 py-2 rounded-full bg-green-700 text-white text-sm"
                  >
                    Blog Selected
                  </div>
                )}
                <button
                  onClick={() => setShowBlogSelectorIndex(index)}
                  className="w-full px-4 py-2 rounded-full bg-gray-700 text-white text-sm"
                >
                  {banner.blogId ? "Change Blog" : "Select Blog"}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={isUploading || bannersToUpload.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>


      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Loading */}
      {loading ? (
        <div className="w-full flex items-center justify-center text-gray-500">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="border rounded-xl overflow-hidden shadow-sm"
            >
              <img
                src={banner.imageUrl}
                alt={`Banner ${banner.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold line-clamp-2">{banner.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{banner.paragraph}</p>
                <button
                  onClick={() => handleToggleVisibility(banner.id, banner.shouldVisible)}
                  className={`w-full py-1 px-3 rounded-full text-white ${banner.shouldVisible ? "bg-yellow-500" : "bg-green-600"
                    }`}
                >
                  {banner.shouldVisible ? "Make Invisible" : "Make Visible"}
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="w-full py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
      {showBlogSelectorIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10">
          <div className="bg-white w-[90%] max-h-[80vh]  p-6 rounded-md shadow-xl relative">
            <button
              onClick={() => setShowBlogSelectorIndex(null)}
              className="absolute -top-3 -right-3 text-red-500 p-2 bg-gray-300 rounded-full font-bold text-xl"
            >
              <X />
            </button>

            <BlogSearchList
              onSelect={(blogId) => {
                if (showBlogSelectorIndex !== null) {
                  const updated = [...bannersToUpload];
                  updated[showBlogSelectorIndex].blogId = blogId;
                  setBannersToUpload(updated);
                  setShowBlogSelectorIndex(null);
                }
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
};

const BlogSearchList = ({ onSelect }: { onSelect: (blogId: string) => void }) => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(blogs);


  useEffect(() => {
    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get<any>(`${BE_URL}/api/v1/admin/blogs/preview`, {
          params: { title: search },
        });

        if (res.data && res.data.title) {
          setBlogs([res.data]); // wrap single object in an array
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Failed to fetch blog preview", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);


  return (
    <div>
      <input
        type="text"
        placeholder="Search blogs by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded outline-none"
      />

      {loading ? (
        <Loader />
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {blogs.map((blog) => {
            return (
              <div
                key={blog.id}
                className="border p-3 rounded shadow cursor-pointer hover:shadow-md transition-all"
                onClick={() => onSelect(blog.id)}
              >
                <div
                  className="w-full h-32 bg-cover bg-center rounded"
                  style={{
                    backgroundImage: `url(${blog.imageUrl || "/fallback.jpg"})`,
                  }}
                ></div>
                <h3 className="font-semibold mt-2">{blog.title}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


export default Banners;
