import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../config";
import { ImageUp } from "lucide-react";

interface Banner {
  id: number;
  imageUrl: string;
  shouldVisible: boolean;
  createdAt: string;
}

const Banners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

    // Validations
    if (files.length > 5) {
      setError("You can upload up to 5 images at once.");
      return;
    }

    for (let file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }
    }

    setSelectedFiles(files);
    setError(null);
    const previews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previews);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) =>
      formData.append("images", file)
    );

    try {
      await axios.post(`${BE_URL}/api/v1/banners/upload`, formData);
      setSelectedFiles(null);
      setPreviews([]);
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
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <label
          htmlFor="image-upload"
          className="min-w-[180px] flex flex-col items-center justify-center rounded-lg border border-dashed border-[#A69F9F] cursor-pointer p-4"
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          {previews.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageUp className="w-8 h-8 text-gray-500" />
              <span className="text-sm text-gray-600">Click to upload images</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {previews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </label>

        <button
          onClick={handleUpload}
          disabled={isUploading || !selectedFiles}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">Loading banners...</p>
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
                <button
                  onClick={() =>
                    handleToggleVisibility(banner.id, banner.shouldVisible)
                  }
                  className={`w-full py-1 px-3 rounded-full text-white ${
                    banner.shouldVisible ? "bg-yellow-500" : "bg-green-600"
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
    </div>
  );
};

export default Banners;
