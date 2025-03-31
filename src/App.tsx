import "./firebase";
import ReadItems from "./ReadItems";

export default function App() {
  return (
    <div className="items-center text-center px-5 bg-slate-500 min-h-full py-10">
      <h2 className="text-2xl font-bold mb-4">Items List</h2>
      <ReadItems />
    </div>
  );
}
