import { memo, useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Column {
  key: string
  label: string
  render?: (row: Record<string, unknown>, index?: number) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  fetchData: (params: {
    page: number
    limit: number
    search?: string
  }) => Promise<{ items: Record<string, unknown>[]; total: number }>
  itemsPerPage?: number
  pageSizeOptions?: number[]
  className?: string
}

function DataTable({
  columns,
  fetchData,
  itemsPerPage = 5,
  pageSizeOptions = [5, 10, 20, 50],
  className,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState(itemsPerPage)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Reset to first page when changing page size
  useEffect(() => {
    setCurrentPage(1)
  }, [pageSize])

  useEffect(() => {
    setIsLoading(true)
    fetchData({
      page: currentPage,
      limit: pageSize,
      search: debouncedSearchTerm,
    })
      .then(({ items, total }) => {
        setData(items)
        setTotalPages(Math.ceil(total / pageSize))
      })
      .catch(() => {
        setData([])
        setTotalPages(1)
      })
      .finally(() => setIsLoading(false))
  }, [currentPage, pageSize, debouncedSearchTerm])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table container with border */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={row.id?.toString() || index.toString()}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(row, index)
                        : (row[col.key] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination and info section with improved alignment */}
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-muted-foreground">
          Showing {data.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(
            currentPage * pageSize,
            (currentPage - 1) * pageSize + data.length
          )}{" "}
          of many entries
        </div>

        <div className="flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className={currentPage === 1 || isLoading ? "disabled" : ""}
                />
              </PaginationItem>
              {totalPages <= 7 ? (
                // Show all pages if 7 or fewer
                [...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => !isLoading && setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              ) : (
                // Show ellipsis for many pages
                <>
                  {[1, 2, 3].map((pageNumber) =>
                    pageNumber <= totalPages ? (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          isActive={currentPage === pageNumber}
                          onClick={() =>
                            !isLoading && setCurrentPage(pageNumber)
                          }
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ) : null
                  )}

                  <PaginationItem>
                    <span className="px-4">...</span>
                  </PaginationItem>

                  {[totalPages - 2, totalPages - 1, totalPages].map(
                    (pageNumber) =>
                      pageNumber > 3 ? (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            isActive={currentPage === pageNumber}
                            onClick={() =>
                              !isLoading && setCurrentPage(pageNumber)
                            }
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ) : null
                  )}
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages || isLoading ? "disabled" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default memo(DataTable)
