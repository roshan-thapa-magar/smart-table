export const TABLE_STATUS = {
  blank: {
    label: "Blank",
    className: "bg-background text-foreground border",
  },
  new: {
    label: "New",
    className: "bg-yellow-300 text-yellow-700 border-yellow-400",
  },
  preparing: {
    label: "Preparing",
    className: "bg-blue-300 text-blue-700 border-blue-400",
  },
  ready: {
    label: "Ready",
    className: "bg-green-300 text-green-700 border-green-400",
  },
  served: {
    label: "Served",
    className: "bg-gray-300 text-gray-700 border-gray-400",
  },
  billing: {
    label: "Billing",
    className: "bg-orange-300 text-orange-700 border-orange-400",
  },
} as const