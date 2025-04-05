"use client"

import type React from "react"

import { useState } from "react"
import type { WidgetConfig } from "./Dashboard"
import { MagnifyingGlassIcon, ListBulletIcon, ChartBarIcon } from "@heroicons/react/24/outline"

interface WidgetSelectorProps {
  widgets: WidgetConfig[]
  activeWidgets: string[]
  onAddWidget: (widgetId: string) => void
  onRemoveWidget: (widgetId: string) => void
}

// Widget icons mapping
const getWidgetIcon = (widgetId: string): React.ElementType => {
  if (widgetId.includes("task")) {
    return ListBulletIcon
  }
  return ChartBarIcon
}

const WidgetSelector = ({ widgets, activeWidgets, onAddWidget, onRemoveWidget }: WidgetSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter widgets based on search term
  const filteredWidgets = widgets.filter((widget) => widget.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 p-4 border-2 border-green-500">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Manage Widgets</h2>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredWidgets.map((widget) => {
          const Icon = getWidgetIcon(widget.id)
          const isActive = activeWidgets.includes(widget.id)

          return (
            <div key={widget.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Icon className="h-6 w-6 text-blue-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">{widget.title}</span>
              </div>
              <button
                onClick={() => (isActive ? onRemoveWidget(widget.id) : onAddWidget(widget.id))}
                className={`px-3 py-1 text-xs font-medium rounded-md ${
                  isActive
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isActive ? "Remove" : "Add"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WidgetSelector

