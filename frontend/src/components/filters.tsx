'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import type { DoctorFilters } from '@/types/doctor';
import { Filter, RotateCcw, X } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDoctors } from '@/services/doctor-api';

interface FiltersProps {
  initialFilters?: Partial<DoctorFilters>;
  onFilterChange: (filters: Partial<DoctorFilters>) => void;
  specialties: string[];
  cities: string[];
  setDoctors: any;
}

const Filters: React.FC<FiltersProps> = ({
  setDoctors,
  cities,
  initialFilters = {},
  onFilterChange,
  specialties = ["General Physician/Internal Medicine", "Cardiologist", "Dermatologist"], // Default/Example specialties
}) => {
  const [availability, setAvailability] = useState<DoctorFilters['availability']>(initialFilters.availability || 'any');
  const [minExperience, setMinExperience] = useState<number>(initialFilters.minExperience || 0);
  const [maxFee, setMaxFee] = useState<number>(initialFilters.maxFee || 2000); // Example default max fee
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    initialFilters.specialty ? [initialFilters.specialty] : []
  );
  const [sortBy, setSortBy] = useState<DoctorFilters['sortBy']>(initialFilters.sortBy || 'experience');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');


  const handleSpecialtyChange = (specialty: string) => {
    const newSelection = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter((s) => s !== specialty)
      : [...selectedSpecialties, specialty];
    setSelectedSpecialties(newSelection);
    // For this example, we assume only one specialty filter can be active at a time
    // If multiple are allowed, adjust the logic in `handleApplyFilters`
    debouncedApplyFilters({ specialty: newSelection.length > 0 ? newSelection[0] : undefined });
  };

   // Debounce function
   const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debounced = (...args: Parameters<F>) => {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };

    return debounced;
  };

  // Apply filters with debounce to avoid rapid API calls on slider/input changes
  const debouncedApplyFilters = useCallback(
    debounce((newFilters: Partial<DoctorFilters>) => {
       const currentFilters: Partial<DoctorFilters> = {
            availability: availability === 'any' ? undefined : availability,
            minExperience: minExperience > 0 ? minExperience : undefined,
            maxFee: maxFee < 2000 ? maxFee : undefined, // Only apply if changed from default max
            specialty: selectedSpecialties.length > 0 ? selectedSpecialties[0] : undefined, // Assuming single specialty selection for now
            sortBy: sortBy,
          };
       onFilterChange({ ...currentFilters, ...newFilters });
    }, 500), // 500ms debounce
    [availability, minExperience, maxFee, selectedSpecialties, sortBy, onFilterChange]
  );

  const handleFilter = async (city: string, specialization: string) => {
    const doctors = await getDoctors(1, 10, specialization, city);
    setDoctors(doctors.doctors);
  };

  useEffect(() => {
    const filter = debouncedApplyFilters;
    filter({});
  }, []);


  const handleResetFilters = () => {
    setAvailability('any');
    setMinExperience(0);
    setMaxFee(2000);
    setSelectedSpecialties([]);
    setSortBy('experience');
    onFilterChange({}); // Notify parent about reset
    setSelectedCity('')
    setSelectedSpecialization('')
  };

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-card p-4 rounded-lg shadow-sm border border-border h-fit sticky top-20">
       <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
             Filters
          </h2>
          <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-xs text-primary hover:bg-primary/10">
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
        <div className='flex gap-4'>
        <Select onValueChange={setSelectedCity} value={selectedCity}>
                <SelectTrigger className="w-[180px] h-10">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                    
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectedSpecialization} value={selectedSpecialization}>
                <SelectTrigger className="w-[220px] h-10">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
        </div>
        <Button
        onClick={() => handleFilter(selectedCity, selectedSpecialization)}
         className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
          Apply Filter
        </Button>

        <div className="mt-4"></div>

      <Accordion type="multiple" defaultValue={['availability', 'specialty', 'experience', 'fee', 'sort']} className="w-full">
        {/* Availability Filter */}
        <AccordionItem value="availability">
          <AccordionTrigger className="text-base font-medium">Availability</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={availability}
              onValueChange={(value) => {
                const newAvailability = value as DoctorFilters['availability'];
                setAvailability(newAvailability);
                debouncedApplyFilters({ availability: newAvailability === 'any' ? undefined : newAvailability });
              }}
              className="gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="avail-any" />
                <Label htmlFor="avail-any" className="font-normal">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="today" id="avail-today" />
                <Label htmlFor="avail-today" className="font-normal">Available Today</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tomorrow" id="avail-tomorrow" />
                <Label htmlFor="avail-tomorrow" className="font-normal">Available Tomorrow</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

         {/* Specialty Filter */}
        <AccordionItem value="specialty">
          <AccordionTrigger className="text-base font-medium">Specialty</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
               {specialties.map((spec) => (
                 <div key={spec} className="flex items-center space-x-2">
                   <Checkbox
                     id={`spec-${spec.replace(/\s|\//g, '-')}`}
                     checked={selectedSpecialties.includes(spec)}
                     onCheckedChange={() => handleSpecialtyChange(spec)}
                   />
                   <Label htmlFor={`spec-${spec.replace(/\s|\//g, '-')}`} className="font-normal">{spec}</Label>
                 </div>
               ))}
             </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Filter */}
        <AccordionItem value="experience">
          <AccordionTrigger className="text-base font-medium">Years of Experience</AccordionTrigger>
          <AccordionContent className="pt-2">
             <div className="flex justify-between items-center mb-2">
                <Label htmlFor="experience-slider" className="text-sm">Min {minExperience} years</Label>
            </div>
            <Slider
              id="experience-slider"
              min={0}
              max={50} // Example max experience
              step={1}
              value={[minExperience]}
              onValueChange={(value) => {
                setMinExperience(value[0]);
                debouncedApplyFilters({ minExperience: value[0] > 0 ? value[0] : undefined });
              }}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        {/* Consultation Fee Filter */}
        <AccordionItem value="fee">
          <AccordionTrigger className="text-base font-medium">Consultation Fee</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex justify-between items-center mb-2">
                <Label htmlFor="fee-slider" className="text-sm">Max ₹{maxFee}</Label>
            </div>
             <Slider
               id="fee-slider"
               min={0}
               max={2000} // Example max fee
               step={100}
               value={[maxFee]}
               onValueChange={(value) => {
                  setMaxFee(value[0]);
                  debouncedApplyFilters({ maxFee: value[0] < 2000 ? value[0] : undefined });
                }}
               className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

         {/* Sort By Filter */}
         <AccordionItem value="sort">
           <AccordionTrigger className="text-base font-medium">Sort By</AccordionTrigger>
           <AccordionContent>
             <RadioGroup
               value={sortBy}
               onValueChange={(value) => {
                 const newSortBy = value as DoctorFilters['sortBy'];
                 setSortBy(newSortBy);
                 debouncedApplyFilters({ sortBy: newSortBy });
               }}
               className="gap-2"
             >
               <div className="flex items-center space-x-2">
                 <RadioGroupItem value="experience" id="sort-exp" />
                 <Label htmlFor="sort-exp" className="font-normal">Experience</Label>
               </div>
               <div className="flex items-center space-x-2">
                 <RadioGroupItem value="fee" id="sort-fee" />
                 <Label htmlFor="sort-fee" className="font-normal">Consultation Fee</Label>
               </div>
                <div className="flex items-center space-x-2">
                 <RadioGroupItem value="rating" id="sort-rating" />
                 <Label htmlFor="sort-rating" className="font-normal">Rating</Label>
               </div>
               {/* Add more sort options if needed */}
             </RadioGroup>
           </AccordionContent>
         </AccordionItem>
      </Accordion>

      {/* Apply Filters Button (Optional, if not using debounce) */}
      {/* <Button onClick={handleApplyFilters} className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
          Apply Filters
        </Button> */}
    </aside>
  );
};

export default Filters;
