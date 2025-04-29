'use client';
import { Metadata } from 'next';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/header';
import Filters from '@/components/filters';
import DoctorCard from '@/components/doctor-card';
import PaginationControls from '@/components/pagination-controls';
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getDoctors } from '@/services/doctor-api';
import type { Doctor } from '@/types/doctor';
import { Frown } from 'lucide-react';

const DOCTORS_PER_PAGE = 10;



export const metadata: Metadata = {
  title: 'General Physician/Internal Medicine Doctors - Apollo 24/7 Clone',
  description:
    'Find top general physicians and internal medicine doctors near you. Book appointments online and consult with expert doctors.',
  keywords: [
    'general physician',
    'internal medicine',
    'doctors',
    'online appointment',
    'healthcare',
    'medical consultation',
    'Apollo 24/7',
  ],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'General Physician/Internal Medicine Doctors - Apollo 24/7 Clone',
    description:
      'Find top general physicians and internal medicine doctors near you. Book appointments online and consult with expert doctors.',
    url: 'https://www.yourwebsite.com/specialties/general-physician-internal-medicine', // Replace with your actual URL
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'General Physician/Internal Medicine Doctors - Apollo 24/7 Clone',
    description:
      'Find top general physicians and internal medicine doctors near you. Book appointments online and consult with expert doctors.',
  },
  
  
  
};


export const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalSpecialty",
  "name": "General Physician/Internal Medicine",
  "description": "Specializing in the diagnosis, treatment, and prevention of diseases in adults.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.yourwebsite.com/specialties/general-physician-internal-medicine?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "provider": {
    "@type": "Organization",
    "name": "Apollo 24/7 Clone",
    "url": "https://www.yourwebsite.com/" // Replace with your website URL
  }
};

export default function DoctorListingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [specialization, setSpecialization] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const fetchDoctors = useCallback(async (page: number, pageSize: number, specialization: string, city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getDoctors(page, pageSize, specialization, city);
      setDoctors(response.doctors);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setError("Could not load doctors. Please try again later.");
      setDoctors([]);
      setTotalPages(0);
      setCurrentPage(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
  useEffect(() => {
    fetchDoctors(currentPage, DOCTORS_PER_PAGE, specialization, city);
  }, [fetchDoctors, currentPage, specialization, city]);

  const handlePageChange = useCallback((page: number) => {
     // Update page number in filters and fetch
    const updatedFilters = { ...filters, page, limit: DOCTORS_PER_PAGE };
    setFilters(updatedFilters);
     // Scroll to top of the list smoothly when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchDoctors(page, DOCTORS_PER_PAGE, specialization, city);
  }, [fetchDoctors, specialization, city]);

    const handleFilter = (cityFilter: string, specializationFilter: string) => {
        setCity(cityFilter);
        setSpecialization(specializationFilter);
    }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Header />

      {/* Breadcrumbs (Placeholder) */}
       <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
         Home / Specialties / General Physician/Internal Medicine
       </div>

      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <Filters
            onFilterChange={handleFilter}
          />

          {/* Doctors List */}
          <div className="flex-1" >
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
