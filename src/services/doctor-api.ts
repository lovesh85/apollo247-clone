import type { Doctor, DoctorFilters } from '@/types/doctor';

// NOTE: Replace '/api/doctors' with your actual backend API endpoint.
// This is a placeholder for the frontend API interaction layer.
// The actual backend implementation (add-doctor, list-doctor-with-filter)
// needs to be created separately using a backend technology (e.g., Node.js/Express, Python/Flask, etc.).

const API_BASE_URL = '/api'; // Assume Next.js API routes or a separate backend

// Mock data for demonstration purposes if no backend is connected yet
const MOCK_DOCTORS: Doctor[] = [
 {
    id: '1',
    name: 'Amit Kumar',
    specialty: 'General Physician/Internal Medicine',
    experience: 10,
    consultationFee: 500,
    availability: 'today',
    availableTimeSlots: ['10:00 AM', '11:30 AM', '02:00 PM'],
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', // Updated image
    location: 'Delhi',
    languages: ['English', 'Hindi'],
    qualifications: ['MBBS', 'MD (Internal Medicine)'],
    clinicName: 'Apollo Clinic - Defence Colony',
    rating: 4.7,
    reviewCount: 152,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialty: 'General Physician/Internal Medicine',
    experience: 8,
    consultationFee: 600,
    availability: 'tomorrow',
    availableTimeSlots: ['09:00 AM', '10:30 AM', '01:00 PM'],
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg', // Updated image
    location: 'Mumbai',
    languages: ['English', 'Marathi'],
    qualifications: ['MBBS'],
    clinicName: 'Wellness Center',
    rating: 4.5,
    reviewCount: 98,
  },
   {
    id: '3',
    name: 'Rajesh Singh',
    specialty: 'General Physician/Internal Medicine',
    experience: 15,
    consultationFee: 750,
    availability: 'today',
    availableTimeSlots: ['04:00 PM', '05:00 PM'],
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg', // Updated image
    location: 'Bangalore',
    languages: ['English', 'Kannada', 'Hindi'],
    qualifications: ['MBBS', 'DNB (General Medicine)'],
    clinicName: 'City Hospital',
    rating: 4.9,
    reviewCount: 210,
  },
   {
    id: '4',
    name: 'Sunita Patel',
    specialty: 'General Physician/Internal Medicine',
    experience: 5,
    consultationFee: 400,
    availability: 'tomorrow',
     availableTimeSlots: ['11:00 AM', '12:00 PM', '03:30 PM'],
    imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg', // Updated image
    location: 'Ahmedabad',
     languages: ['English', 'Gujarati'],
     qualifications: ['MBBS'],
    rating: 4.3,
    reviewCount: 75,
  },
   { // Adding a few more doctors for better pagination testing
    id: '5',
    name: 'Vikram Reddy',
    specialty: 'General Physician/Internal Medicine',
    experience: 12,
    consultationFee: 700,
    availability: 'today',
    availableTimeSlots: ['09:30 AM', '11:00 AM'],
    imageUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    location: 'Hyderabad',
    languages: ['English', 'Telugu'],
    qualifications: ['MBBS', 'MD'],
    clinicName: 'Care Hospitals',
    rating: 4.6,
    reviewCount: 180,
  },
  {
    id: '6',
    name: 'Anjali Desai',
    specialty: 'General Physician/Internal Medicine',
    experience: 7,
    consultationFee: 550,
    availability: 'tomorrow',
    availableTimeSlots: ['02:30 PM', '04:30 PM'],
    imageUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
    location: 'Pune',
    languages: ['English', 'Marathi', 'Hindi'],
    qualifications: ['MBBS'],
    clinicName: 'Sahyadri Clinic',
    rating: 4.4,
    reviewCount: 115,
  },
];


interface ListDoctorsResponse {
  doctors: Doctor[];
  totalPages: number;
  currentPage: number;
}

/**
 * Fetches a list of doctors based on filters and pagination.
 * Replace this with actual fetch call to your backend API.
 * @param filters - The filtering and pagination options.
 * @returns A promise that resolves to the list of doctors and pagination info.
 */
export const listDoctors = async (filters: DoctorFilters): Promise<ListDoctorsResponse> => {
  console.log('Fetching doctors with filters:', filters);

  // --- Start Mock Implementation (REMOVE THIS WHEN BACKEND IS READY) ---
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredDoctors = MOCK_DOCTORS;

       // Apply filters (basic example)
      if (filters.specialty) {
         filteredDoctors = filteredDoctors.filter(doc => doc.specialty === filters.specialty);
       }
      if (filters.availability && filters.availability !== 'any') {
        filteredDoctors = filteredDoctors.filter(doc => doc.availability === filters.availability);
      }
      if (filters.minExperience) {
        filteredDoctors = filteredDoctors.filter(doc => doc.experience >= filters.minExperience!);
      }
       if (filters.maxFee) {
        filteredDoctors = filteredDoctors.filter(doc => doc.consultationFee <= filters.maxFee!);
      }

       // Apply sorting (basic example)
       if (filters.sortBy) {
         const sortedDoctors = [...filteredDoctors].sort((a, b) => { // Sort a copy
           const order = filters.sortOrder === 'desc' ? -1 : 1;
           switch (filters.sortBy) {
             case 'experience':
               return (a.experience - b.experience) * order;
             case 'fee':
               return (a.consultationFee - b.consultationFee) * order;
              case 'rating':
                 // Handle potential undefined ratings
                const ratingA = a.rating ?? 0;
                const ratingB = b.rating ?? 0;
                return (ratingA - ratingB) * order;
             default:
               return 0;
           }
         });
         filteredDoctors = sortedDoctors; // Update filteredDoctors with the sorted array
       }


       // Apply pagination
       const page = filters.page || 1;
       const limit = filters.limit || 10; // Default limit
       const totalItems = filteredDoctors.length;
       const totalPages = Math.ceil(totalItems / limit);
       const startIndex = (page - 1) * limit;
       const endIndex = startIndex + limit;
       const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

      resolve({
        doctors: paginatedDoctors,
        totalPages: totalPages,
        currentPage: page,
      });
    }, 500); // Simulate network delay
  });
  // --- End Mock Implementation ---


  // --- Actual Fetch Implementation (Use this when backend is ready) ---
  // const queryParams = new URLSearchParams();
  // Object.entries(filters).forEach(([key, value]) => {
  //   if (value !== undefined && value !== null) {
  //      // Ensure array values are handled correctly if needed (e.g., multiple specialties)
  //     queryParams.append(key, String(value));
  //   }
  // });

  // const response = await fetch(`${API_BASE_URL}/doctors?${queryParams.toString()}`);

  // if (!response.ok) {
  //   // Handle API errors appropriately
  //   throw new Error('Failed to fetch doctors');
  // }

  // const data: ListDoctorsResponse = await response.json();
  // return data;
  // --- End Actual Fetch Implementation ---
};


/**
 * Adds a new doctor.
 * Replace this with actual fetch POST call to your backend API.
 * @param doctorData - The data for the new doctor.
 * @returns A promise that resolves to the newly added doctor.
 */
export const addDoctor = async (doctorData: Omit<Doctor, 'id'>): Promise<Doctor> => {
   console.log('Adding doctor:', doctorData);

   // --- Start Mock Implementation (REMOVE THIS WHEN BACKEND IS READY) ---
   return new Promise((resolve) => {
     setTimeout(() => {
       const newDoctor: Doctor = {
         ...doctorData,
         id: String(Date.now()), // Simple mock ID generation
         // Use a realistic placeholder or allow overriding
         imageUrl: doctorData.imageUrl || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`
       };
       MOCK_DOCTORS.push(newDoctor); // Add to mock data (won't persist)
       console.log("Current Mock Doctors:", MOCK_DOCTORS);
       resolve(newDoctor);
     }, 300); // Simulate network delay
   });
   // --- End Mock Implementation ---


  // --- Actual Fetch Implementation (Use this when backend is ready) ---
  // const response = await fetch(`${API_BASE_URL}/doctors`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(doctorData),
  // });

  // if (!response.ok) {
  //    // Handle API errors appropriately (e.g., validation errors)
  //   const errorData = await response.json();
  //   throw new Error(errorData.message || 'Failed to add doctor');
  // }

  // const newDoctor: Doctor = await response.json();
  // return newDoctor;
   // --- End Actual Fetch Implementation ---
};

/**
 * Fetches available specialties.
 * Replace with an actual API call if specialties are dynamic.
 * @returns A promise resolving to an array of specialty strings.
 */
export const getSpecialties = async (): Promise<string[]> => {
   // For now, return a static list. Fetch from backend if dynamic.
   return Promise.resolve([
     "General Physician/Internal Medicine",
     "Cardiologist",
     "Dermatologist",
     "Pediatrician",
     "Orthopedic Surgeon",
     "Gynecologist",
   ]);
};
