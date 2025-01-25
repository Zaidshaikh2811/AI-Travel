import { FiSearch } from 'react-icons/fi';


export const SearchBar = ({ value, onChange }) => (
    <div className="relative mb-8">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
            type="text"
            placeholder="Search destinations..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    </div>
);