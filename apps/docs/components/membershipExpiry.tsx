'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { membershipExpiryConversion } from '@/lib/helper';
import { AttedanceGymFilterState } from '@/states/filters';
import { useRecoilValue } from 'recoil';
import { ExpiredMembers, GymsData } from '@/types/types';

// // Mock data for demonstration
// const mockMembers = [
//   { id: 1, name: "John Doe", expiryDate: "2023-10-20" },
//   { id: 2, name: "Jane Smith", expiryDate: "2023-10-25" },
//   { id: 3, name: "Alice Johnson", expiryDate: "2023-10-18" },
//   { id: 4, name: "Bob Williams", expiryDate: "2023-11-05" },
//   { id: 5, name: "Charlie Brown", expiryDate: "2023-10-22" },
//   { id: 6, name: "Diana Ross", expiryDate: "2023-10-30" },
//   { id: 7, name: "Edward Norton", expiryDate: "2023-11-02" },
//   { id: 8, name: "Fiona Apple", expiryDate: "2023-10-19" },
//   { id: 9, name: "George Clooney", expiryDate: "2023-11-10" },
//   { id: 10, name: "Helen Mirren", expiryDate: "2023-10-21" },
// ];

export default function Component3({
  membershipExpiry,
}: {
  membershipExpiry: GymsData;
}) {
  const gymFilter = useRecoilValue(AttedanceGymFilterState);
  const [expiredMembers, setExpiredMembers] = useState<null | ExpiredMembers[]>(
    null
  );
  const [currentMembers, setCurrentMembers] = useState<null | ExpiredMembers[]>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (gymFilter) {
      const selectedGymData = membershipExpiry.find((gym) => {
        return gym.id === gymFilter;
      });

      if (selectedGymData) {
        const expiredMembers = membershipExpiryConversion(selectedGymData);
        console.log('Membership Expiry', expiredMembers);
        if (expiredMembers.length > 0) {
          setExpiredMembers(expiredMembers);
        } else {
          setExpiredMembers(null);
        }
        setCurrentPage(1);
      }
    }
  }, [gymFilter]);

  useEffect(() => {
    if (expiredMembers && expiredMembers.length > 0) {
      const filteredMembers = expiredMembers.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
      setTotalPages(totalPages);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const paginatedMembers = filteredMembers.slice(startIndex, endIndex);
      setCurrentMembers(paginatedMembers);
    } else {
      setCurrentMembers(null);
    }
  }, [currentPage, expiredMembers, searchTerm]);
  // const orderedData = membershipExpiryConversion(membershipExpiry[0])
  // console.log("Membership Expiry",membershipExpiry)

  return (
    <Card className="w-full max-w-7xl bg-[#f7f7f7] pt-4 mx-auto hover:shadow-lg hover:shadow-primary/40 transition-shadow duration-200 shadow-sm">
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
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Status</TableHead>

              <TableHead>Membership Duration</TableHead>
              <TableHead>Expiry Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMembers && currentMembers.length > 0 ? (
              currentMembers.map((member, index) => (
                <TableRow key={`${member.id}`}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phoneNumber}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                      Expired
                    </span>
                  </TableCell>
                  <TableCell>{member.membershipDuration} months</TableCell>
                  <TableCell>{member.expiredOn}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  {expiredMembers === null && 'No Results Found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {totalPages > 1 && (
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
