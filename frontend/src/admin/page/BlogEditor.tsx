import { Plus } from 'lucide-react';
import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

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
    formData.append("blocks", JSON.stringify(filteredBlocks));

    const toastId = toast.loading("Creating...");
    try {
      const response = await fetch("http://localhost:5000/api/v1/admin/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setBlocks([]);
      setTitle("");
      toast.success("Blog created successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to publish blog!", { id: toastId });
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
                className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => moveBlockUp(index)}
              >
                ↑
              </button>
              <button
                className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => moveBlockDown(index)}
              >
                ↓
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
