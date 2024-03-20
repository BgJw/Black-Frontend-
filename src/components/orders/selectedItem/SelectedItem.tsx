// Shift + Alt + F
// rafc
'use client'
import { useState } from "react";

const SelectedItem = ({item}: {item: string}) => {
    const [weight, setWeight] = useState("");
    
  return (
    item === "pranie + magieł" ? (
        <div className="flex items-center gap-x-2">
          P+M
          <input
            placeholder="kg"
            className="ml-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
          />
        </div>
      ) : (
        <div>{item}</div>
      )
  )
}


export default SelectedItem