import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const filterSections = [
    {
        title: "Treatment",
        withSearch: true,
        checkboxes: [
            "Treatment Option 1",
            "Treatment Option 2"
        ]
    },
    {
        title: "Active Ingredients",
        withSearch: true,
        checkboxes: [
            "Ametryne 80% WDG (1)",
            "A natural bio-stimulant (1)",
            "Azoxystrobin + Tebuconazole + Prochloraz (1)"
        ]
    },
    {
        title: "Crops",
        withSearch: true,
        checkboxes: [
            "Wheat",
            "Rice",
            "Corn"
        ]
    },
    {
        title: "Formulation Type",
        withSearch: true,
        checkboxes: [
            "Powder",
            "Liquid",
            "Granules"
        ]
    },
    {
        title: "Key Targets",
        withSearch: true,
        checkboxes: [
            "Weeds",
            "Fungi",
            "Pests"
        ]
    }
];

const ProductsSidebar = () => {
    const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
    const [selectedFilters, setSelectedFilters] = useState<any>({});

    console.log(searchTerms);


    const handleSearchChange = (title: any, value: any) => {
        setSearchTerms((prev) => ({
            ...prev,
            [title]: value,
        }));
    };

    const handleCheckboxChange = (sectionTitle: any, label: any) => {
        setSelectedFilters((prev: any) => {
            const currentSelections = prev[sectionTitle] || [];
            const isAlreadySelected = currentSelections.includes(label);

            const updatedSelections = isAlreadySelected
                ? currentSelections.filter((item: any) => item !== label)
                : [...currentSelections, label];

            return {
                ...prev,
                [sectionTitle]: updatedSelections,
            };
        });
    };


    return (
        <aside className="w-full md:w-[250px] flex-shrink-0 py-6 font-inter">
            <div className="space-y-6">
                {filterSections.map((section, index) => {
                    const searchValue = searchTerms[section.title] || "";
                    const filteredCheckboxes = section.checkboxes.filter((label) =>
                        label.toLowerCase().includes(searchValue.toLowerCase())
                    );

                    const selectedInSection = selectedFilters[section.title] || [];

                    return (
                        <details key={index} className="group pb-1">
                            <summary className="cursor-pointer text-xl border-b border-gray-300 pb-3 flex justify-between items-center list-none">
                                {section.title}
                                <FiChevronDown className="transition-transform group-open:rotate-180" />
                            </summary>

                            <div className="mt-3 ml-2 px-1">
                                {section.withSearch && (
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search the product"
                                            value={searchValue}
                                            onChange={(e) =>
                                                handleSearchChange(section.title, e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm !outline-none"
                                        />
                                        <FiSearch className="cursor-pointer absolute right-3 top-2.5 text-gray-500" />
                                    </div>
                                )}

                                <div className="text-sm space-y-1 max-h-[150px] overflow-y-auto pr-2">
                                    {filteredCheckboxes.length > 0 ? (
                                        filteredCheckboxes.map((label, i) => (
                                            <label key={i} className="block">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={selectedInSection.includes(label)}
                                                    onChange={() =>
                                                        handleCheckboxChange(section.title, label)
                                                    }
                                                />
                                                {label}
                                            </label>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-500 italic">No matches</p>
                                    )}
                                </div>
                            </div>
                        </details>
                    );
                })}
            </div>

        </aside>
    );
};

export default ProductsSidebar;
