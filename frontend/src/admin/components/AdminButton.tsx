
interface AdminButtonPrams {
    label: string;
    componentName: string;
    selectedComponent: string;
    handleComponentSelection: (componentName: string) => void;
}

export default function AdminButton({ label, componentName, selectedComponent, handleComponentSelection }: AdminButtonPrams) {
    return (
        <button onClick={() => handleComponentSelection(componentName)}
            className={`border border-gray-300 p-2 rounded-3xl cursor-pointer ${selectedComponent === componentName ? "bg-[#E8E8E8] text-black" : "border-[1px] border-gray-400 text-black"}`}>
            <h2 className="text-center text-lg">{label}</h2>
        </button>
    )
}