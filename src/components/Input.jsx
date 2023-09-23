import { MagnifyingGlass } from "phosphor-react";

export default function Input({ inputRef, fetchWeather }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyPress}
        placeholder="Insira o nome do local"
        className="p-1 text-xl font-semibold text-textSecondary bg-input placeholder:text-textSecondary focus:outline-none"
      />
      <button
        onClick={fetchWeather}
        className="duration-300 ease active:scale-90"
      >
        <MagnifyingGlass
          className="text-textSecondary"
          weight="bold"
          size={30}
        />
      </button>
    </div>
  );
}
