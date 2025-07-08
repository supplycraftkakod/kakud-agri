import { ImageUp, Plus } from "lucide-react"
import { useState } from "react";

const AddProduct = () => {
  const [about, setAbout] = useState([""]);
  const [benefits, setBenefits] = useState([""]);
  const [activeIngredients, setActiveIngredients] = useState([""]);
  const [formulationType, setFormulationType] = useState([""]);
  const [crop, setCrop] = useState([""]);

  const addInput = (type: "about" | "benefits" | "activeIngredients" | "formulationType" | "crop") => {
    if (type === "about") {
      setAbout([...about, ""]);
    } else if (type === "benefits") {
      setBenefits([...benefits, ""])
    } else if (type === "activeIngredients") {
      setActiveIngredients([...activeIngredients, ""])
    } else if (type === "formulationType") {
      setFormulationType([...formulationType, ""])
    } else if (type === "crop") {
      setCrop([...crop, ""])
    }
  };

  const handleInputChange = (
    type: "about" | "benefits" | "activeIngredients" | "formulationType" | "crop",
    index: number,
    value: string
  ) => {
    const update = (setter: React.Dispatch<React.SetStateAction<string[]>>, current: string[]) => {
      const updated = [...current];
      updated[index] = value;
      setter(updated);
    };

    switch (type) {
      case "about":
        update(setAbout, about);
        break;
      case "benefits":
        update(setBenefits, benefits);
        break;
      case "activeIngredients":
        update(setActiveIngredients, activeIngredients);
        break;
      case "formulationType":
        update(setFormulationType, formulationType);
        break;
      case "crop":
        update(setCrop, crop);
        break;
    }
  };


  return (
    <div className="w-full font-inter">

      {/* top */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-stretch gap-8">

        {/* <div className=" min-w-[150px] min-h-[150px] lg:min-w-[213px] lg:min-h-[186px] flex flex-col items-center justify-between p-3 lg:p-6 rounded-lg border border-dashed border-[#A69F9F] cursor-pointer">
          <ImageUp className="w-[50px] h-[50px] lg:w-[86px] lg:h-[86px]" />
          <h2 className="text-center">Click to upload image</h2>
        </div> */}

        <label htmlFor="image-upload" className="min-w-[150px] min-h-[150px] lg:min-w-[213px] lg:min-h-[186px] flex flex-col items-center justify-between p-3 lg:p-6 rounded-lg border border-dashed border-[#A69F9F] cursor-pointer">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log("Selected image:", file);
                // You can set to state or preview image here
              }
            }}
            className="hidden"
          />
          <ImageUp className="w-[50px] h-[50px] lg:w-[86px] lg:h-[86px]" />
          <h2 className="text-center">Click to upload image</h2>
        </label>


        <div className=" w-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <input type="text" placeholder="Category" className="p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]" />
            <input type="text" placeholder="Product Name" className="p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]" />
          </div>
          <div>
            <h4>Product Description</h4>
            <textarea name="Description" placeholder="Description" id="" className="w-full p-2 px-3 rounded-lg !outline-none border border-[#D9D9D9]">
            </textarea>
          </div>
        </div>

      </div>

      {/* bottom */}
      <div className="w-full mt-4 grid grid-cols-1 lg:grid-cols-2 gap-10 ">

        {/* left */}
        <div className="w-full flex flex-col gap-10 ">
          {/* ABOUT */}
          <div>
            <h2 className="text-2xl">About</h2>
            {about.map((_, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  className="w-[90%] border-[1px] border-[#D9D9D9] !outline-none px-3 py-2 rounded-full placeholder:text-[0.9rem]"
                  type="text"
                  placeholder="Enter about info"
                  value={about[index]}
                  onChange={(e) => handleInputChange("about", index, e.target.value)}
                />
                {index === about.length - 1 && (
                  <div
                    className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer"
                    onClick={() => addInput("about")}
                  >
                    <Plus />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* BENEFITS */}
          <div>
            <h2 className="text-2xl">Benefits</h2>
            {benefits.map((_, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  className="w-[90%] border-[1px] border-[#D9D9D9] !outline-none px-3 py-2 rounded-full placeholder:text-[0.9rem]"
                  type="text"
                  placeholder="Enter benefit"
                  value={benefits[index]}
                  onChange={(e) => handleInputChange("benefits", index, e.target.value)}
                />
                {index === benefits.length - 1 && (
                  <div
                    className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer"
                    onClick={() => addInput("benefits")}
                  >
                    <Plus />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="w-full flex flex-col gap-10">
          {/* ACTIVE INGREDIENTS */}
          <div>
            <h2 className="text-2xl">Active Ingredients</h2>
            {activeIngredients.map((_, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  className="w-[90%] border-[1px] border-[#D9D9D9] !outline-none px-3 py-2 rounded-full placeholder:text-[0.9rem]"
                  type="text"
                  placeholder="Enter ingredient"
                  value={activeIngredients[index]}
                  onChange={(e) => handleInputChange("activeIngredients", index, e.target.value)}
                />
                {index === activeIngredients.length - 1 && (
                  <div
                    className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer"
                    onClick={() => addInput("activeIngredients")}
                  >
                    <Plus />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FORMULATION TYPE */}
          <div>
            <h2 className="text-2xl">Formulation Type</h2>
            {formulationType.map((_, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  className="w-[90%] border-[1px] border-[#D9D9D9] !outline-none px-3 py-2 rounded-full placeholder:text-[0.9rem]"
                  type="text"
                  placeholder="Enter formulation type"
                  value={formulationType[index]}
                  onChange={(e) => handleInputChange("formulationType", index, e.target.value)}
                />
                {index === formulationType.length - 1 && (
                  <div
                    className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer"
                    onClick={() => addInput("formulationType")}
                  >
                    <Plus />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CROP */}
          <div>
            <h2 className="text-2xl">Crop</h2>
            {crop.map((_, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  className="w-[90%] border-[1px] border-[#D9D9D9] !outline-none px-3 py-2 rounded-full placeholder:text-[0.9rem]"
                  type="text"
                  placeholder="Enter crop"
                  value={crop[index]}
                  onChange={(e) => handleInputChange("crop", index, e.target.value)}
                />
                {index === crop.length - 1 && (
                  <div
                    className="w-8 h-8 p-1 rounded-full flex items-center justify-center bg-[#D9D9D9] cursor-pointer"
                    onClick={() => addInput("crop")}
                  >
                    <Plus />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      <div className="w-full py-2 mt-4 text-center text-white rounded-lg bg-black cursor-pointer">
        <h2>Add</h2>
      </div>

    </div>
  )
}

export default AddProduct