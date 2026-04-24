export const TABLE_STATUS = {
  blank: {
    label: "Blank",
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
  new: {
    label: "New",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  preparing: {
    label: "Preparing",
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  ready: {
    label: "Ready",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  served: {
    label: "Served",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  billing: {
    label: "Billing",
    className: "bg-red-100 text-red-700 border-red-200",
  },
} as const