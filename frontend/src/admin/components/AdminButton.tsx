
interface AdminButtonPrams {
    label: string;
    componentName: string;
    selectedComponent: string;
    handleComponentSelection: (componentName: string) => void;
}

export default function AdminButton({ label, componentName, selectedComponent, handleComponentSelection }: AdminButtonPrams) {
    return (
        <button onClick={() => handleComponentSelection(componentName)}
            className={`border border-gray-300 px-2 py-1 rounded-lg cursor-pointer ${selectedComponent === componentName ? "bg-[#1d1d1d] text-white" : "border-[1px] border-gray-300 text-black"}`}>
            <h2 className="text-center ">{label}</h2>
        </button>
    )
}