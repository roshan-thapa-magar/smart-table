"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
  Package,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmptyGuide from "./EmptyGuide";

// Export the interface
export interface ColumnDefinition<T> {
  id: string;
  name: string;
  align?: "center" | "left" | "right";
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: ColumnDefinition<T>[];
  initialColumnVisibility: Record<string, boolean>;
  searchPlaceholder: string;
  addLabel?: string;
  onAddClick: () => void;
  searchKey: keyof T;
  loading?: boolean; // <- add this
  pagination?: {
    currentPage: number;
    rowsPerPage: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (limit: number) => void;
  };
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  initialColumnVisibility,
  searchPlaceholder,
  addLabel,
  onAddClick,
  searchKey,
  pagination,
  loading 
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(initialColumnVisibility);
  const [searchTerm, setSearchTerm] = useState("");


  // Use the pagination prop values
  const currentPage = pagination?.currentPage || 1;
  const rowsPerPage = pagination?.rowsPerPage || 10;
  const totalCount = pagination?.totalCount || data.length;

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm, searchKey]);

  // Calculate total pages based on totalCount
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const displayData = useMemo(() => {
    if (searchTerm) {
      // If search term exists, filter client-side
      return filteredData.slice(0, rowsPerPage);
    }
    return data;
  }, [data, filteredData, searchTerm, rowsPerPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(displayData.map((_, index) => index));
      setSelectedRows(newSelected);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (rowIndex: number, checked: boolean) => {
    setSelectedRows((prev) => {
      const newSelected = new Set(prev);
      if (checked) newSelected.add(rowIndex);
      else newSelected.delete(rowIndex);
      return newSelected;
    });
  };

  const handleColumnVisibilityChange = (columnId: string, checked: boolean) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: checked,
    }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (pagination?.onPageChange) {
      pagination.onPageChange(1);
    }
  };

  const allRowsSelected = displayData.length > 0 && 
    displayData.every((_, index) => selectedRows.has(index));
  const someRowsSelected = displayData.length > 0 && 
    displayData.some((_, index) => selectedRows.has(index)) && !allRowsSelected;

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex-shrink-0 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-8 pr-4 py-2 h-10 w-full rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 px-4 bg-transparent">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Customize Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={columnVisibility[column.id]}
                    onCheckedChange={(checked) =>
                      handleColumnVisibilityChange(column.id, checked)
                    }
                  >
                    {column.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {addLabel && onAddClick && (
              <Button
                variant="outline"
                className="h-10 px-4"
                onClick={onAddClick}
              >
                <Plus className="w-4 h-4 mr-2" />
                {addLabel}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto px-4 hide-scrollbar">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={allRowsSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className="translate-y-[2px]"
                  />
                </TableHead>
                <TableHead className="w-[50px] text-center">SN</TableHead>
                {columns
                  .filter((col) => columnVisibility[col.id])
                  .map((column) => (
                    <TableHead
                      key={column.id}
                      className={column.align === "center" ? "text-center" : ""}
                    >
                      {column.name}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.filter(col => columnVisibility[col.id]).length + 2}
                    className="p-0"
                  >
                    <div className="flex justify-center items-center py-10">
                      <EmptyGuide
                        icon={<Package />}
                        title="No Categories Found"
                        description="There are no categories available. Start by adding a new category."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                displayData.map((item, index) => {
                  return (
                    <TableRow key={item._id || index}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(index)}
                          onCheckedChange={(checked) =>
                            handleSelectRow(index, checked as boolean)
                          }
                          aria-label={`Select row ${index + 1}`}
                          className="translate-y-[2px]"
                        />
                      </TableCell>
                      <TableCell className="text-center">{startIndex + index + 1}</TableCell>
                      {columns
                        .filter((col) => columnVisibility[col.id])
                        .map((column) => (
                          <TableCell
                            key={column.id}
                            className={column.align === "center" ? "text-center" : ""}
                          >
                            {column.render ? column.render(item) : item[column.id]}
                          </TableCell>
                        ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex-shrink-0 border-t bg-background p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            {selectedRows.size} of {totalCount} row(s) selected.
          </div>

          <div className="flex items-center gap-6">
            {/* Rows per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page</span>
              <Select
                value={String(rowsPerPage)}
                onValueChange={(value) => {
                  if (pagination?.onRowsPerPageChange) {
                    pagination.onRowsPerPageChange(Number(value));
                  }
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Page info */}
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
              {/* First */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => pagination?.onPageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              {/* Prev */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => pagination?.onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Next */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => pagination?.onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Last */}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => pagination?.onPageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



// "use client";

// import { useState, useMemo, ChangeEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Plus,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   Settings2,
//   Filter,
// } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";

// // Export the interface
// export interface ColumnDefinition<T> {
//   id: string;
//   name: string;
//   align?: "center" | "left" | "right";
//   width?: string;
//   render?: (item: T) => React.ReactNode;
// }

// interface DataTableProps<T extends Record<string, any>> {
//   data: T[];
//   columns: ColumnDefinition<T>[];
//   initialColumnVisibility: Record<string, boolean>;
//   searchPlaceholder: string;
//   addLabel?: string;
//   onAddClick: () => void;
//   searchKey: keyof T;
//   loading?: boolean;
//   pagination?: {
//     currentPage: number;
//     rowsPerPage: number;
//     totalCount: number;
//     onPageChange: (page: number) => void;
//     onRowsPerPageChange: (limit: number) => void;
//   };
// }

// export default function DataTable<T extends Record<string, any>>({
//   data,
//   columns,
//   initialColumnVisibility,
//   searchPlaceholder,
//   addLabel,
//   onAddClick,
//   searchKey,
//   pagination,
//   loading
// }: DataTableProps<T>) {
//   const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
//   const [columnVisibility, setColumnVisibility] = useState<
//     Record<string, boolean>
//   >(initialColumnVisibility);
//   const [searchTerm, setSearchTerm] = useState("");

//   const currentPage = pagination?.currentPage || 1;
//   const rowsPerPage = pagination?.rowsPerPage || 10;
//   const totalCount = pagination?.totalCount || data.length;
//   const [customRows, setCustomRows] = useState<string>("");
//   const [isCustom, setIsCustom] = useState(false);
  
//   const filteredData = useMemo(() => {
//     if (!searchTerm) return data;
//     return data.filter((item) =>
//       String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [data, searchTerm, searchKey]);

//   const totalPages = Math.ceil(totalCount / rowsPerPage);

//   const displayData = useMemo(() => {
//     if (searchTerm) {
//       return filteredData.slice(0, rowsPerPage);
//     }
//     return data;
//   }, [data, filteredData, searchTerm, rowsPerPage]);

//   const startIndex = (currentPage - 1) * rowsPerPage;

//   const handleSelectAll = (checked: boolean) => {
//     if (checked) {
//       const newSelected = new Set(displayData.map((_, index) => index));
//       setSelectedRows(newSelected);
//     } else {
//       setSelectedRows(new Set());
//     }
//   };

//   const handleSelectRow = (rowIndex: number, checked: boolean) => {
//     setSelectedRows((prev) => {
//       const newSelected = new Set(prev);
//       if (checked) newSelected.add(rowIndex);
//       else newSelected.delete(rowIndex);
//       return newSelected;
//     });
//   };

//   const handleColumnVisibilityChange = (columnId: string, checked: boolean) => {
//     setColumnVisibility((prev) => ({
//       ...prev,
//       [columnId]: checked,
//     }));
//   };

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     if (pagination?.onPageChange) {
//       pagination.onPageChange(1);
//     }
//   };

//   const allRowsSelected = displayData.length > 0 &&
//     displayData.every((_, index) => selectedRows.has(index));
//   const someRowsSelected = displayData.length > 0 &&
//     displayData.some((_, index) => selectedRows.has(index)) && !allRowsSelected;

//   const visibleColumns = columns.filter((col) => columnVisibility[col.id]);

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-br from-background to-muted/20">
//       {/* Header Section - Enhanced Design */}
//       <div className="flex-shrink-0 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
//         <div className="p-2 space-y-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="relative flex-1 max-w-md">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="text"
//                   placeholder={searchPlaceholder}
//                   className="pl-9 pr-4 h-11 bg-background border-muted-foreground/20 focus:border-primary/50 transition-all duration-200"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button 
//                     variant="outline" 
//                     size="sm"
//                     className="h-9 px-3 border-muted-foreground/20 hover:bg-muted/50 transition-all duration-200"
//                   >
//                     <Settings2 className="h-4 w-4 mr-2" />
//                     <span className="hidden sm:inline">Customize</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-48">
//                   {columns.map((column) => (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       checked={columnVisibility[column.id]}
//                       onCheckedChange={(checked) =>
//                         handleColumnVisibilityChange(column.id, checked)
//                       }
//                     >
//                       {column.name}
//                     </DropdownMenuCheckboxItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
              
//               {addLabel && onAddClick && (
//                 <Button
//                   size="sm"
//                   className="h-9 px-4 shadow-sm hover:shadow-md transition-all duration-200"
//                   onClick={onAddClick}
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">{addLabel}</span>
//                   <span className="sm:hidden">Add</span>
//                 </Button>
//               )}
//             </div>
//           </div>

//           {/* Selected rows indicator */}
//           {selectedRows.size > 0 && (
//             <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-2 rounded-md animate-in slide-in-from-top-1">
//               <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
//               <span>{selectedRows.size} row(s) selected</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Table Section - Enhanced Styling */}
//       <div className="flex-1 overflow-auto p-2 pt-4 hide-scrollbar">
//         <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
//                   <TableHead className="w-[50px] h-12">
//                     <Checkbox
//                       checked={allRowsSelected}
//                       onCheckedChange={handleSelectAll}
//                       aria-label="Select all"
//                       className="translate-y-[2px]"
//                     />
//                   </TableHead>
//                   <TableHead className="w-[60px] text-center text-xs font-medium">
//                     SN
//                   </TableHead>
//                   {visibleColumns.map((column) => (
//                     <TableHead
//                       key={column.id}
//                       className={cn(
//                         "text-xs font-semibold uppercase tracking-wider",
//                         column.align === "center" && "text-center",
//                         column.align === "right" && "text-right"
//                       )}
//                       style={{ width: column.width }}
//                     >
//                       {column.name}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               </TableHeader>
              
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell 
//                       colSpan={visibleColumns.length + 2} 
//                       className="h-64 text-center"
//                     >
//                       <div className="flex flex-col items-center justify-center gap-3">
//                         <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
//                         <p className="text-sm text-muted-foreground">Loading...</p>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : displayData.length === 0 ? (
//                   <TableRow>
//                     <TableCell 
//                       colSpan={visibleColumns.length + 2} 
//                       className="h-64 text-center"
//                     >
//                       <div className="flex flex-col items-center justify-center gap-2">
//                         <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
//                           <Search className="h-6 w-6 text-muted-foreground" />
//                         </div>
//                         <p className="text-sm font-medium">No data found</p>
//                         <p className="text-xs text-muted-foreground">
//                           Try adjusting your search or filters
//                         </p>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   displayData.map((item, index) => {
//                     const isSelected = selectedRows.has(index);
//                     return (
//                       <TableRow 
//                         key={item._id || index}
//                         className={cn(
//                           "transition-colors duration-150",
//                           isSelected && "bg-primary/5 hover:bg-primary/10",
//                           !isSelected && "hover:bg-muted/30"
//                         )}
//                       >
//                         <TableCell className="py-3">
//                           <Checkbox
//                             checked={isSelected}
//                             onCheckedChange={(checked) =>
//                               handleSelectRow(index, checked as boolean)
//                             }
//                             aria-label={`Select row ${index + 1}`}
//                             className="translate-y-[2px]"
//                           />
//                         </TableCell>
//                         <TableCell className="text-center text-sm text-muted-foreground font-mono">
//                           {startIndex + index + 1}
//                         </TableCell>
//                         {visibleColumns.map((column) => (
//                           <TableCell
//                             key={column.id}
//                             className={cn(
//                               "py-3",
//                               column.align === "center" && "text-center",
//                               column.align === "right" && "text-right",
//                               column.align === "left" && "text-left"
//                             )}
//                           >
//                             {column.render ? column.render(item) : (
//                               <span className="text-sm">
//                                 {item[column.id] || "-"}
//                               </span>
//                             )}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     );
//                   })
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section - Enhanced Design */}
//       <div className="flex-shrink-0 border-t bg-card/50 backdrop-blur-sm">
//         <div className="p-2">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="text-sm text-muted-foreground">
//               Showing <span className="font-medium text-foreground">{displayData.length}</span> of{" "}
//               <span className="font-medium text-foreground">{totalCount}</span> entries
//             </div>

//             <div className="flex flex-wrap items-center justify-center gap-4">
//               {/* Rows per page */}
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">Show</span>
//                 <Select
//                   value={isCustom ? "custom" : String(rowsPerPage)}
//                   onValueChange={(value) => {
//                     if (value === "custom") {
//                       setIsCustom(true);
//                     } else {
//                       setIsCustom(false);
//                       setCustomRows("");
//                       pagination?.onRowsPerPageChange(Number(value));
//                     }
//                   }}
//                 >
//                   <SelectTrigger className="w-[80px] h-8 text-sm">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="5">5</SelectItem>
//                     <SelectItem value="10">10</SelectItem>
//                     <SelectItem value="20">20</SelectItem>
//                     <SelectItem value="50">50</SelectItem>
//                     <SelectItem value="custom">Custom</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
              
//               {isCustom && (
//                 <Input
//                   type="number"
//                   placeholder="Enter"
//                   value={customRows}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setCustomRows(value);
//                     if (Number(value) > 0) {
//                       pagination?.onRowsPerPageChange(Number(value));
//                     }
//                   }}
//                   className="w-[90px] h-8 text-sm"
//                 />
//               )}

//               {/* Page info */}
//               <div className="text-sm text-muted-foreground">
//                 Page <span className="font-medium text-foreground">{currentPage}</span> of{" "}
//                 <span className="font-medium text-foreground">{totalPages}</span>
//               </div>

//               {/* Pagination buttons */}
//               <div className="flex items-center gap-1">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-8 w-8 hover:bg-muted"
//                   onClick={() => pagination?.onPageChange(1)}
//                   disabled={currentPage === 1}
//                 >
//                   <ChevronsLeft className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-8 w-8 hover:bg-muted"
//                   onClick={() => pagination?.onPageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-8 w-8 hover:bg-muted"
//                   onClick={() => pagination?.onPageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-8 w-8 hover:bg-muted"
//                   onClick={() => pagination?.onPageChange(totalPages)}
//                   disabled={currentPage === totalPages}
//                 >
//                   <ChevronsRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }