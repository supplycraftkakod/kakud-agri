import { useEffect, useState } from "react";
import axios from "axios";
import { BE_URL } from "../../../config";

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
}

const Banners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannersToUpload, setBannersToUpload] = useState<BannerInput[]>([]);
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
  <h3 className="font-semibold">{banner.title}</h3>
  <p className="text-sm text-gray-600">{banner.paragraph}</p>
  <button
    onClick={() => handleToggleVisibility(banner.id, banner.shouldVisible)}
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
