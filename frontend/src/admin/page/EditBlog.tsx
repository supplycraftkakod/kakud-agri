import React, { useEffect, useState, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { BE_URL } from '../../../config';
import axios from 'axios';

type BlockType = 'bigHeading' | 'subHeading' | 'paragraph' | 'image';

interface Block {
    type: BlockType;
    value?: string;
    file?: string;       // preview URL
    rawFile?: File;      // actual file (if re-uploaded)
}

const EditBlog: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [loading, setLoading] = useState(true);

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

    const addBlock = (type: BlockType) => {
        setBlocks([...blocks, { type, value: '', file: '' }]);
    };


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const authStorage = localStorage.getItem("auth");
                let token;

                if (authStorage) {
                    const authData = JSON.parse(authStorage);
                    token = authData.token;
                }

                const res = await axios.get<any>(`${BE_URL}/api/v1/admin/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = res.data;

                setTitle(data.blog.title);

                const prefilledBlocks: Block[] = data.blog.contentBlocks
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((b: any) => ({
                        type: b.type,
                        value: b.value || '',
                        file: b.type === 'image' ? b.value : '',
                    }));

                setBlocks(prefilledBlocks);
                setLoading(false);
            } catch (error: any) {
                console.error("Error loading blog:", error.response?.data?.error || error.message);
            }
        };

        fetchBlog();
    }, [id]);

    const handleInputChange = (index: number, value: string) => {
        const updated = [...blocks];
        updated[index].value = value;
        setBlocks(updated);
    };

    const handleImageUpload = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const updated = [...blocks];
            updated[index].file = URL.createObjectURL(file);
            updated[index].rawFile = file;
            setBlocks(updated);
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('title', title);

        const updatedBlocks = blocks.map((block, i) => {
            const obj: any = { type: block.type, order: i };
            if (block.type === 'image') {
                if (block.rawFile) {
                    formData.append(`file-${i}`, block.rawFile);
                    obj.fileIndex = i;
                } else {
                    obj.value = block.file;
                }
            } else {
                obj.value = block.value;
            }
            return obj;
        });

        formData.append('blocks', JSON.stringify(updatedBlocks));

        const toastId = toast.loading("Updating blog...");

        try {
            const authStorage = localStorage.getItem("auth");
            let token;

            if (authStorage) {
                const authData = JSON.parse(authStorage);
                token = authData.token;
            }

            await axios.put<any>(`${BE_URL}/api/v1/admin/blogs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for FormData
                },
            });

            toast.success("Blog updated successfully!", { id: toastId });
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.error || "Failed to update blog!", { id: toastId });
        }
    };

    if (loading) return <div className="p-4">
        <Loader />
    </div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h2 className="mb-4 text-3xl text-center font-bold">Edit Blog</h2>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-bold w-full border-b border-gray-300 p-2 outline-none"
            />
            <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
                {(['bigHeading', 'subHeading', 'paragraph', 'image'] as BlockType[]).map((type) => (
                    <button
                        key={type}
                        className="flex items-center gap-2 bg-gray-100 px-4 py-1 rounded-full hover:bg-gray-200"
                        onClick={() => addBlock(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                        <span className="text-xl">+</span>
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {blocks.map((block, i) => (
                    <div key={i} className="relative group bg-white p-3 rounded shadow-sm">
                        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                            <button
                                className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                onClick={() => moveBlockUp(i)}
                            >↑</button>
                            <button
                                className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                onClick={() => moveBlockDown(i)}
                            >↓</button>
                            <button
                                className="text-xs px-2 py-1 bg-red-200 hover:bg-red-300 text-red-800 rounded"
                                onClick={() => removeBlock(i)}
                            >✕</button>
                        </div>

                        {/* Block content */}
                        {block.type === 'bigHeading' && (
                            <input
                                value={block.value}
                                onChange={(e) => handleInputChange(i, e.target.value)}
                                className="text-[2rem] w-full border-b p-2 !outline-none"
                            />
                        )}
                        {block.type === 'subHeading' && (
                            <input
                                value={block.value}
                                onChange={(e) => handleInputChange(i, e.target.value)}
                                className="text-xl w-full border-b p-2 !outline-none"
                            />
                        )}
                        {block.type === 'paragraph' && (
                            <textarea
                                value={block.value}
                                onChange={(e) => handleInputChange(i, e.target.value)}
                                className="text-base w-full h-[10rem] border rounded p-3 !outline-none"
                            />
                        )}
                        {block.type === 'image' && (
                            <div className="mt-2">
                                {block.file && (
                                    <img
                                        src={block.file}
                                        className="max-h-80 object-contain mb-2"
                                        alt="block preview"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(i, e)}
                                />
                            </div>
                        )}
                    </div>
                ))}

            </div>

            <button
                onClick={handleUpdate}
                className="w-full py-2 mt-4 text-center text-white rounded-lg bg-black cursor-pointer"
            >
                Update Blog
            </button>
        </div>
    );
};

export default EditBlog;

// ❌ keep the fields are same