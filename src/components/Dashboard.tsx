"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Responsive, WidthProvider, type Layout } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import Widget from "./Widget"
import WidgetSelector from "./WidgetSelector"
import { PencilIcon, BeakerIcon } from "@heroicons/react/24/outline"

// Apply width provider to make the grid responsive
const ResponsiveGridLayout = WidthProvider(Responsive)

// Define widget types
export interface WidgetConfig {
  id: string
  title: string
  content: string
  icon?: React.ElementType
}

// Define layout type
export interface LayoutItem extends Layout {
  i: string
}

// Default widgets with their content
const defaultWidgets: WidgetConfig[] = [
  { id: "total-budgeted-capex", title: "Total Budgeted CapEx", content: "Not implemented" },
  { id: "total-budgets", title: "Total Budgets", content: "Not implemented" },
  { id: "total-budgeted-opex", title: "Total Budgeted OpEx", content: "Not implemented" },
  { id: "projects-by-project-type", title: "Projects by Project Type", content: "Not implemented" },
  { id: "budget-monitoring", title: "Budget Monitoring", content: "Not implemented" },
]

// Default layout for the widgets
const defaultLayouts = {
  lg: [
    { i: "total-budgeted-capex", x: 0, y: 0, w: 4, h: 8, minW: 2, minH: 4 },
    { i: "total-budgets", x: 4, y: 0, w: 4, h: 8, minW: 2, minH: 4 },
    { i: "total-budgeted-opex", x: 8, y: 0, w: 4, h: 4, minW: 2, minH: 4 },
    { i: "projects-by-project-type", x: 8, y: 4, w: 4, h: 4, minW: 2, minH: 4 },
    { i: "budget-monitoring", x: 8, y: 8, w: 4, h: 4, minW: 2, minH: 4 },
  ],
  md: [
    { i: "total-budgeted-capex", x: 0, y: 0, w: 3, h: 8, minW: 2, minH: 4 },
    { i: "total-budgets", x: 3, y: 0, w: 3, h: 8, minW: 2, minH: 4 },
    { i: "total-budgeted-opex", x: 6, y: 0, w: 4, h: 4, minW: 2, minH: 4 },
    { i: "projects-by-project-type", x: 6, y: 4, w: 4, h: 4, minW: 2, minH: 4 },
    { i: "budget-monitoring", x: 6, y: 8, w: 4, h: 4, minW: 2, minH: 4 },
  ],
  sm: [
    { i: "total-budgeted-capex", x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 4 },
    { i: "total-budgets", x: 3, y: 0, w: 3, h: 6, minW: 2, minH: 4 },
    { i: "total-budgeted-opex", x: 0, y: 6, w: 3, h: 4, minW: 2, minH: 4 },
    { i: "projects-by-project-type", x: 3, y: 6, w: 3, h: 4, minW: 2, minH: 4 },
    { i: "budget-monitoring", x: 0, y: 10, w: 6, h: 4, minW: 2, minH: 4 },
  ],
}

// Additional widgets for the selector
const additionalWidgets: WidgetConfig[] = [
  { id: "open-tasks-by-health", title: "Open Tasks by Health", content: "Not implemented" },
  { id: "open-tasks-by-priority", title: "Open Tasks by Priority", content: "Not implemented" },
  { id: "open-tasks-by-assignee", title: "Open Tasks by Assignee", content: "Not implemented" },
  { id: "approval-tasks", title: "Approval Tasks", content: "Not implemented" },
  { id: "review-tasks", title: "Review Tasks", content: "Not implemented" },
  { id: "task-completion", title: "Task Completion", content: "Not implemented" },
  { id: "task-status", title: "Task Status", content: "Not implemented" },
  { id: "task-deadlines", title: "Task Deadlines", content: "Not implemented" },
  { id: "task-dashboard", title: "Task Dashboard", content: "Not implemented" },
  { id: "due-this-week", title: "Due This Week", content: "Not implemented" },
  { id: "overdue-tasks", title: "Overdue Tasks", content: "Not implemented" },
  { id: "red-flag-tasks", title: "Red Flag Tasks", content: "Not implemented" },
  { id: "delay-project-completion", title: "Delay Project Completion", content: "Not implemented" },
]

// All available widgets for the selector
const allWidgets = [...defaultWidgets, ...additionalWidgets]

const Dashboard = () => {
  // State for tracking active widgets and their layouts
  const [activeWidgets, setActiveWidgets] = useState<string[]>(defaultWidgets.map((w) => w.id))
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>(defaultLayouts)
  const [isEditing, setIsEditing] = useState(false)
  const [tempLayouts, setTempLayouts] = useState<{ [key: string]: Layout[] }>({})

  // Load layouts and widgets from localStorage on component mount
  useEffect(() => {
    try {
      const savedLayouts = localStorage.getItem("dashboard-layouts")
      const savedWidgets = localStorage.getItem("dashboard-widgets")

      if (savedLayouts) {
        const parsedLayouts = JSON.parse(savedLayouts)
        setLayouts(parsedLayouts)

        // Also set temp layouts for editing
        setTempLayouts(parsedLayouts)
      }

      if (savedWidgets) {
        const parsedWidgets = JSON.parse(savedWidgets) as WidgetConfig[]
        setActiveWidgets(parsedWidgets.map((w) => w.id))
      }
    } catch (error) {
      console.error("Error loading dashboard state from localStorage:", error)
      // If there's an error, we'll use the defaults which are already set
    }
  }, [])

  // Handle layout changes
  const handleLayoutChange = (_: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    if (isEditing) {
      setTempLayouts(allLayouts)
    } else {
      setLayouts(allLayouts)
      localStorage.setItem("dashboard-layouts", JSON.stringify(allLayouts))
    }
  }

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Exit edit mode without saving changes
      setIsEditing(false)
    } else {
      // Enter edit mode and store current layout
      setTempLayouts(layouts)
      setIsEditing(true)
    }
  }

  // Save changes when exiting edit mode
  const saveChanges = () => {
    // Save the layouts
    setLayouts(tempLayouts)
    localStorage.setItem("dashboard-layouts", JSON.stringify(tempLayouts))

    // Save the active widgets
    const updatedWidgets = allWidgets.filter((w) => activeWidgets.includes(w.id))
    localStorage.setItem("dashboard-widgets", JSON.stringify(updatedWidgets))

    setIsEditing(false)
  }

  // Add a widget to the dashboard
  const addWidget = (widgetId: string) => {
    // Find the widget configuration
    const widgetToAdd = allWidgets.find((w) => w.id === widgetId)

    if (!widgetToAdd || activeWidgets.includes(widgetId)) return

    // Add widget to active widgets
    setActiveWidgets((prevActiveWidgets) => [...prevActiveWidgets, widgetId])

    // Add widget to layout with default position
    const newLayouts = { ...tempLayouts }

    // Find a position for the new widget
    const lgLayout = newLayouts.lg || []
    const newWidget = {
      i: widgetId,
      x: 0,
      y: Number.POSITIVE_INFINITY, // Place at the bottom
      w: 4,
      h: 4,
      minW: 2,
      minH: 4,
    }

    newLayouts.lg = [...lgLayout, newWidget]

    // Also add to other breakpoints
    if (newLayouts.md) {
      newLayouts.md = [...newLayouts.md, { ...newWidget, w: 3 }]
    }

    if (newLayouts.sm) {
      newLayouts.sm = [...newLayouts.sm, { ...newWidget, w: 3 }]
    }

    setTempLayouts(newLayouts)
  }

  // Remove a widget from the dashboard
  const removeWidget = (widgetId: string) => {
    // Remove widget from active widgets
    const updatedActiveWidgets = activeWidgets.filter((id) => id !== widgetId)
    setActiveWidgets(updatedActiveWidgets)

    // Remove widget from layout
    const newLayouts = { ...tempLayouts }

    // Remove from all breakpoints
    Object.keys(newLayouts).forEach((breakpoint) => {
      if (newLayouts[breakpoint]) {
        newLayouts[breakpoint] = newLayouts[breakpoint].filter((item) => item.i !== widgetId)
      }
    })

    setTempLayouts(newLayouts)
  }

  // Get all widgets that should be displayed
  const displayedWidgets = allWidgets.filter((widget) => activeWidgets.includes(widget.id))

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 flex justify-between items-center">
          {!isEditing ? (
            <button
              onClick={toggleEditMode}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Dashboard
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={toggleEditMode}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          )}

          <div className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white">
            <BeakerIcon className="h-4 w-4 mr-2" />
            Test
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {isEditing && (
        <WidgetSelector
          widgets={allWidgets}
          activeWidgets={activeWidgets}
          onAddWidget={addWidget}
          onRemoveWidget={removeWidget}
        />
      )}

      <div className="bg-white rounded-lg shadow-sm min-h-[600px]">
        <ResponsiveGridLayout
          className="layout"
          layouts={isEditing ? tempLayouts : layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={50}
          isDraggable={isEditing}
          isResizable={isEditing}
          onLayoutChange={handleLayoutChange}
          margin={[16, 16]}
          containerPadding={[16, 16]}
          // Add these props for better drag-and-drop visual cues
          useCSSTransforms={true}
          draggableCancel=".non-draggable"
          draggableHandle=".draggable-handle"
          resizeHandles={["se"]} // Only show the southeast resize handle
        >
          {displayedWidgets.map((widget) => (
            <div key={widget.id} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
              <Widget
                title={widget.title}
                content={widget.content}
                isEditing={isEditing}
                onRemove={() => removeWidget(widget.id)}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}

export default Dashboard

