export const TABLE_STATUS = {
  blank: {
    label: "Blank",
    className: "bg-background text-foreground border",
  },
  new: {
    label: "New",
    className: "bg-yellow-100 text-yellow-700 border-yellow-400",
  },
  preparing: {
    label: "Preparing",
    className: "bg-blue-100 text-blue-700 border-blue-400",
  },
  ready: {
    label: "Ready",
    className: "bg-green-100 text-green-700 border-green-400",
  },
  served: {
    label: "Served",
    className: "bg-gray-100 text-gray-700 border-gray-400",
  },
  billing: {
    label: "Billing",
    className: "bg-orange-100 text-orange-700 border-orange-400",
  },
} as const