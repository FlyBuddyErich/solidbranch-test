"use client"

import { XMarkIcon } from "@heroicons/react/24/outline"

interface WidgetProps {
  title: string
  content: string
  isEditing?: boolean
  onRemove?: () => void
}

const Widget = ({ title, content, isEditing = false, onRemove }: WidgetProps) => {
  return (
    <div className="h-full flex flex-col group">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center draggable-handle">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {isEditing && onRemove && (
          <button
            onClick={onRemove}
            className="non-draggable p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove widget"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex-1 p-4 flex items-center justify-center">
        <p className="text-sm text-gray-500">{content}</p>
      </div>
    </div>
  )
}

export default Widget

