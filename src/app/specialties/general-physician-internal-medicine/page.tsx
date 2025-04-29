'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/header';
import Filters from '@/components/filters';
import DoctorCard from '@/components/doctor-card';
import PaginationControls from '@/components/pagination-controls';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { listDoctors, getSpecialties } from '@/services/doctor-api';
import type { Doctor, DoctorFilters } from '@/types/doctor';
import { Frown } from 'lucide-react';

const DOCTORS_PER_PAGE = 10; // Set how many doctors per page

const DoctorListingPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<Partial<DoctorFilters>>({
    specialty: "General Physician/Internal Medicine", // Pre-filter by default
    limit: DOCTORS_PER_PAGE,
    page: 1,
  });
   const [availableSpecialties, setAvailableSpecialties] = useState<string[]>([]);

   const fetchDocs = useCallback(async (currentFilters: Partial<DoctorFilters>) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await listDoctors(currentFilters);
        setDoctors(response.doctors);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError("Could not load doctors. Please try again later.");
        setDoctors([]); // Clear doctors on error
        setTotalPages(1);
        setCurrentPage(1);
      } finally {
        setIsLoading(false);
      }
   }, []);


   useEffect(() => {
     // Fetch available specialties on mount
     const fetchInitialData = async () => {
       try {
         const specialties = await getSpecialties();
         setAvailableSpecialties(specialties);
       } catch (err) {
         console.error("Failed to fetch specialties:", err);
         // Handle error fetching specialties if necessary
       }
       // Fetch initial doctors list
       fetchDocs(filters);
     };
     fetchInitialData();
   }, [fetchDocs]); // Initial fetch depends on fetchDocs


  const handleFilterChange = useCallback((newFilters: Partial<DoctorFilters>) => {
    // Reset page to 1 when filters change, merge new filters
    const updatedFilters = {
        ...filters,
        ...newFilters,
        page: 1, // Reset page on filter change
        limit: DOCTORS_PER_PAGE
    };
    setFilters(updatedFilters);
    fetchDocs(updatedFilters);
  }, [filters, fetchDocs]); // Depends on filters state and fetchDocs

  const handlePageChange = useCallback((page: number) => {
     // Update page number in filters and fetch
    const updatedFilters = { ...filters, page, limit: DOCTORS_PER_PAGE };
    setFilters(updatedFilters);
     // Scroll to top of the list smoothly when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchDocs(updatedFilters);
  }, [filters, fetchDocs]); // Depends on filters state and fetchDocs


  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />

      {/* Breadcrumbs (Placeholder) */}
       <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
         Home / Specialties / General Physician/Internal Medicine
       </div>

      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <Filters
            initialFilters={filters}
            onFilterChange={handleFilterChange}
            specialties={availableSpecialties}
          />

          {/* Doctors List */}
          <div className="flex-1">
             <h1 className="text-2xl font-bold mb-4">General Physician/Internal Medicine Doctors</h1>

             {/* Optional: Add sorting dropdown here if needed, separate from filters */}
             {/* <div className="mb-4 flex justify-end"> ... Sort Select ... </div> */}

            {isLoading ? (
              // Loading Skeletons
              <div className="grid grid-cols-1 gap-4">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-60 w-full rounded-lg" />
                ))}
              </div>
            ) : error ? (
              // Error Message
               <Alert variant="destructive" className="mt-6">
                 <Frown className="h-4 w-4" />
                 <AlertTitle>Error</AlertTitle>
                 <AlertDescription>{error}</AlertDescription>
               </Alert>
            ) : doctors.length === 0 ? (
                // No Doctors Found Message
                <Alert className="mt-6">
                 <Frown className="h-4 w-4" />
                 <AlertTitle>No Doctors Found</AlertTitle>
                 <AlertDescription>
                    No doctors match the current filter criteria. Try adjusting your filters.
                 </AlertDescription>
               </Alert>
            ) : (
              // Doctors Grid
              <div className="grid grid-cols-1 gap-4">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && doctors.length > 0 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer Placeholder (Optional) */}
       <footer className="bg-background text-foreground py-4 mt-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Apollo 24/7 Clone. All rights reserved. (Demo Project)
        </div>
      </footer>
    </div>
  );
};

export default DoctorListingPage;
