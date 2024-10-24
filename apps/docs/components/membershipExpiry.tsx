"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"

// Mock data for demonstration
const mockMembers = [
  { id: 1, name: "John Doe", expiryDate: "2023-10-20" },
  { id: 2, name: "Jane Smith", expiryDate: "2023-10-25" },
  { id: 3, name: "Alice Johnson", expiryDate: "2023-10-18" },
  { id: 4, name: "Bob Williams", expiryDate: "2023-11-05" },
  { id: 5, name: "Charlie Brown", expiryDate: "2023-10-22" },
  { id: 6, name: "Diana Ross", expiryDate: "2023-10-30" },
  { id: 7, name: "Edward Norton", expiryDate: "2023-11-02" },
  { id: 8, name: "Fiona Apple", expiryDate: "2023-10-19" },
  { id: 9, name: "George Clooney", expiryDate: "2023-11-10" },
  { id: 10, name: "Helen Mirren", expiryDate: "2023-10-21" },
]

export default function Component3() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const today = new Date()
  const fiveDaysFromNow = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)

  const filteredMembers = mockMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      new Date(member.expiryDate) <= fiveDaysFromNow
  )

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = filteredMembers.slice(startIndex, endIndex)

  const getMembershipStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    if (expiry < today) return "Expired"
    if (expiry <= fiveDaysFromNow) return "Expiring Soon"
    return "Active"
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Membership Expiry</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiry Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      getMembershipStatus(member.expiryDate) === "Expired"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {getMembershipStatus(member.expiryDate)}
                  </span>
                </TableCell>
                <TableCell>{member.expiryDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredMembers.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}