import { ArrowDown, ArrowUp, Plus, X } from 'lucide-react';
import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { BE_URL } from '../../../config';
import axios from 'axios';

type BlockType = 'bigHeading' | 'subHeading' | 'paragraph' | 'image';

interface Block {
  type: BlockType;
  value?: string;
  file?: string;       // for preview URL
  rawFile?: File;      // actual File object for submission
}

const BlogEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const addBlock = (type: BlockType) => {
    setBlocks([...blocks, { type, value: '', file: '' }]);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].value = value;
    setBlocks(updatedBlocks);
  };

  const handleImageUpload = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedBlocks = [...blocks];
      updatedBlocks[index].file = URL.createObjectURL(file); // preview
      updatedBlocks[index].rawFile = file;                   // actual file
      setBlocks(updatedBlocks);
    }
  };

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    const formData = new FormData();

    const processedBlocks = blocks.map((block, index) => {
      const data: any = {
        type: block.type,
        order: index,
      };

      if (block.type === "image" && block.file) {
        const file = block.rawFile;


        if (file) {
          formData.append(`file-${index}`, file);
          data.fileIndex = index;
        } else {
          alert(`Image at block ${index + 1} is missing`);
          return null;
        }
      } else {
        data.value = block.value;
      }

      return data;
    });

    const filteredBlocks = processedBlocks.filter(Boolean);

    formData.append("title", title);
    formData.append("category", selectedCategory);
    formData.append("blocks", JSON.stringify(filteredBlocks));

    const toastId = toast.loading("Creating...");
    try {
      const authStorage = localStorage.getItem("auth");
      let token;

      if (authStorage) {
        const authData = JSON.parse(authStorage);
        token = authData.token;
      }

      await axios.post(
        `${BE_URL}/api/v1/admin/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlocks([]);
      setTitle("");
      toast.success("Blog created successfully!", { id: toastId });
    } catch (error: any) {
      const message =
        error.response?.data?.error || "Failed to publish blog!";
      toast.error(message, { id: toastId });
    }

  };

  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const updated = [...blocks];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setBlocks(updated);
  };

  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const updated = [...blocks];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setBlocks(updated);
  };

  const removeBlock = (index: number) => {
    const updated = [...blocks];
    updated.splice(index, 1);
    setBlocks(updated);
  };


  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'bigHeading':
        return (
          <input
            key={index}
            type="text"
            placeholder="Big Heading"
            value={block.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="text-[2rem] w-full border-b border-gray-300 p-2 outline-none"
          />
        );
      case 'subHeading':
        return (
          <input
            key={index}
            type="text"
            placeholder="Sub Heading"
            value={block.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="text-2xl font-medium w-full border-b border-gray-300 p-2 outline-none"
          />
        );
      case 'paragraph':
        return (
          <textarea
            key={index}
            placeholder="Paragraph"
            value={block.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="text-base w-full border border-gray-200 rounded-md p-3 mt-2 !outline-none"
            rows={4}
          />
        );
      case 'image':
        return (
          <div
            key={index}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center flex-col py-10 px-4 my-4 bg-gray-50"
          >
            {block.file ? (
              <img
                src={block.file}
                alt="Uploaded"
                className="max-h-80 object-contain"
              />
            ) : (
              <label className="flex flex-col items-center cursor-pointer">
                <svg
                  className="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-gray-600 text-sm">Click to upload image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(index, e)}
                />
              </label>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-inter">
      <div className="flex items-center justify-center gap-4 md:gap-10 flex-wrap mb-6">

        <div
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => addBlock('bigHeading')}
        >
          <h2

            className="text-lg" >
            Big Heading
          </h2>
          <div
            className="w-7 h-7 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] hover:bg-[#a8a8a8]"

          >
            <Plus />
          </div>
        </div>

        <div
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => addBlock('subHeading')}
        >
          <h2

            className="text-lg" >
            Sub Heading
          </h2>
          <div
            className="w-7 h-7 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] hover:bg-[#a8a8a8]"

          >
            <Plus />
          </div>
        </div>

        <div
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => addBlock('image')}
        >
          <h2
            className="text-lg" >
            Image
          </h2>
          <div
            className="w-7 h-7 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] hover:bg-[#a8a8a8]"

          >
            <Plus />
          </div>
        </div>

        <div
          className='flex items-center gap-3 cursor-pointer'
          onClick={() => addBlock('paragraph')}
        >
          <h2

            className="text-lg" >
            Paragraph
          </h2>
          <div
            className="w-7 h-7 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] hover:bg-[#a8a8a8]"
          >
            <Plus />
          </div>
        </div>
      </div>

      <div className="relative w-full mt-10 mb-6 font-light">
        <label className="block mb-2 text-lg pl-1 font-normal">
          Select Blog Categories
        </label>
        <select
          id="blog-category"
          name="blog-category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block w-full appearance-none px-4 py-2 border border-gray-300 rounded-full shadow-sm !outline-none text-base"
        >
          <option value="" disabled>Select a category</option>
          <option value="expo">Expo Blog – Coverage from expos & agri summits</option>
          <option value="workshop">Workshop Blog – Field training & meetings</option>
          <option value="news">News Blog – Announcements & partnerships</option>
          <option value="crop-advisory">Crop Advisory – Seasonal guidance & tips</option>
          <option value="success-stories">Farmer Success Stories – Inspiring journeys</option>
          <option value="product-knowledge">Product Knowledge – Guides & comparisons</option>
          <option value="franchise">Franchise & Retail Insights – Business advice</option>
          <option value="sustainability">Sustainability & Innovation – Eco-friendly solutions</option>
        </select>

        {/* Custom Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 top-9 flex items-center text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>


      <input
        type="text"
        placeholder="Enter Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl font-bold border-b border-gray-300 p-2 w-full outline-none mb-4"
      />

      <div className="space-y-6">
        {blocks.map((block, index) => (
          <div key={block.type} className="relative group  rounded p-3  bg-white">
            {/* Buttons */}
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                className="text-xs p-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => moveBlockUp(index)}
              >
                <ArrowUp className='w-4 h-4' />
              </button>
              <button
                className="text-xs p-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => moveBlockDown(index)}
              >
                <ArrowDown className='w-4 h-4' />
              </button>
              <button
                className="text-xs p-1 bg-red-200 hover:bg-red-300 text-red-800 rounded"
                onClick={() => removeBlock(index)}
              >
                <X className='w-4 h-4' />
              </button>
            </div>


            {renderBlock(block, index)}
          </div>
        ))}
      </div>


      <button
        onClick={handleSubmit}
        className="w-full py-2 mt-4 text-center text-white rounded-lg bg-black cursor-pointer"
      >
        Publish Blog
      </button>

    </div>
  );
};

export default BlogEditor;
