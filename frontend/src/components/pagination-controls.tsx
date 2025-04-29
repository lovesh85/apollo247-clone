'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDoctors } from '@/services/doctor-api';

const PAGE_SIZE = 10; // Define the number of items per page

const PaginationControls = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctorsCount, setDoctorsCount] = useState(0);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDoctors(currentPage, PAGE_SIZE, undefined, undefined);
      setDoctorsCount(response.count);
      setTotalPages(Math.ceil(response.count / PAGE_SIZE));
    };

    fetchData();
  }, [currentPage]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <span className="text-sm font-medium text-muted-foreground">Page {currentPage} of {totalPages}</span>
      <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    }
  );
};

export default PaginationControls;
