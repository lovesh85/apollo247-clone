export interface Doctor {
  id: string;
  name: string;
  specialty: string; // e.g., "General Physician/Internal Medicine"
  experience: number; // years
  consultationFee: number; // in currency (e.g., INR)
  availability: 'today' | 'tomorrow' | 'specific-dates'; // Simplified availability
  availableTimeSlots?: string[]; // e.g., ["10:00 AM", "11:30 AM"] - Optional
  imageUrl: string;
  location?: string; // Optional, for filtering if needed
  languages?: string[]; // Optional
  qualifications?: string[]; // Optional
  clinicName?: string; // Optional
  rating?: number; // Optional (e.g., 4.5)
  reviewCount?: number; // Optional
}

// Define types for filter parameters
export interface DoctorFilters {
  specialty?: string;
  availability?: 'today' | 'tomorrow' | 'any';
  minExperience?: number;
  maxFee?: number;
  page?: number;
  limit?: number;
  sortBy?: 'experience' | 'fee' | 'rating'; // Add more sort options if needed
  sortOrder?: 'asc' | 'desc';
}
