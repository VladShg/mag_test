import React from "react";

export default function Theme({ theme, toggleTheme, selected }) {
    return (
        <div
            className="rounded-md
                        select-container
                        bg-indigo-500
                        hover:bg-indigo-700
                        text-white
                        text-center
                        font-bold"
        >
            <label htmlFor={theme.id}>
                <input
                    className="text-green-500"
                    checked={selected}
                    onChange={() => toggleTheme(theme)}
                    type="checkbox"
                    id={theme.id}
                />
                <span>{theme.name}</span>
            </label>
        </div>
    );
}
