import type React from 'react';
import Image from 'next/image';
import type { Doctor } from '@/types/doctor';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Briefcase, CalendarDays, IndianRupee, GraduationCap, Languages, User } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

// Helper function to get initials from name
const getInitials = (name: string) => {
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};


const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-border">
      <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
        {/* Image Section */}
        <div className="flex flex-col items-center sm:items-start sm:w-1/4">
           <Avatar className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-2 border-2 border-primary/20">
             {/* Use AvatarImage with fallback */}
             <AvatarImage
                src={doctor.imageUrl} // Use the potentially realistic image URL
                alt={`Dr. ${doctor.name}`}
                className="object-cover" // Ensure image covers the area
             />
             {/* Fallback uses initials or a generic icon */}
             <AvatarFallback className="bg-muted text-muted-foreground">
                {doctor.name ? getInitials(doctor.name) : <User className="w-1/2 h-1/2" />}
             </AvatarFallback>
           </Avatar>

          {doctor.rating && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs mb-2">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-400" />
              {doctor.rating.toFixed(1)}
              {doctor.reviewCount && <span className="text-muted-foreground ml-1">({doctor.reviewCount})</span>}
            </Badge>
          )}
          <Button size="sm" className="w-full text-xs bg-accent text-accent-foreground hover:bg-accent/90">
            View Profile
          </Button>
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary mb-1">Dr. {doctor.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
            <div className="flex items-center gap-1.5 text-foreground">
              <Briefcase className="w-4 h-4 text-primary/80" />
              <span>{doctor.experience} Years Experience</span>
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <IndianRupee className="w-4 h-4 text-primary/80" />
              <span>₹{doctor.consultationFee} Consultation Fee</span>
            </div>
            {doctor.qualifications && doctor.qualifications.length > 0 && (
              <div className="flex items-center gap-1.5 text-foreground">
                <GraduationCap className="w-4 h-4 text-primary/80" />
                <span>{doctor.qualifications.join(', ')}</span>
              </div>
            )}
             {doctor.languages && doctor.languages.length > 0 && (
              <div className="flex items-center gap-1.5 text-foreground">
                <Languages className="w-4 h-4 text-primary/80" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
            )}
          </div>

           {doctor.clinicName && (
            <p className="text-sm text-muted-foreground mb-2">
              Clinic: {doctor.clinicName}{doctor.location ? `, ${doctor.location}` : ''}
            </p>
           )}

          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Available {doctor.availability === 'today' ? 'Today' : doctor.availability === 'tomorrow' ? 'Tomorrow' : ''}
              {doctor.availableTimeSlots && doctor.availableTimeSlots.length > 0 && ` at ${doctor.availableTimeSlots[0]}`}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm" className="flex-1">Video Consult</Button>
            <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
