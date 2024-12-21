"use client";

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Link as LinkIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const generateZoomLink = () => {
  // Basic Zoom link generation (mock implementation)
  const meetingId = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `https://zoom.us/j/${meetingId}`;
};

const ZoomMeetingScheduler = () => {
  const [meetingDetails, setMeetingDetails] = React.useState({
    title: '',
    date: new Date(),
    startTime: '',
    duration: '30',
    participants: '',
    description: '',
    meetingType: 'meeting',
    zoomLink: '',
    password: '',
    meetingSettings: {
      enableWaitingRoom: false,
      requirePassword: false,
      allowJoinBeforeHost: false
    }
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setMeetingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (selectedDate:any) => {
    setMeetingDetails(prev => ({
      ...prev,
      date: selectedDate
    }));
  };

  const generateMeetingLink = React.useCallback(() => {
    const zoomLink = generateZoomLink();
    const password = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    setMeetingDetails(prev => ({
      ...prev,
      zoomLink,
      password,
      meetingSettings: {
        ...prev.meetingSettings,
        requirePassword: true
      }
    }));
  }, []);

  const copyToClipboard = (text:any) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "Meeting link copied successfully.",
      });
    }).catch(err => {
      toast({
        title: "Copy Failed",
        description: "Unable to copy meeting link.",
        variant: "destructive"
      });
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!meetingDetails.title || !meetingDetails.startTime || !meetingDetails.zoomLink) {
      toast({
        title: "Incomplete Information",
        description: "Please fill all required fields and generate a Zoom link.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would integrate with Zoom API
    const zoomMeetingPayload = {
      ...meetingDetails,
      date: meetingDetails.date.toISOString().split('T')[0]
    };
    
    console.log('Scheduling Zoom Meeting:', zoomMeetingPayload);
    toast({
      title: "Meeting Scheduled",
      description: "Your Zoom meeting has been scheduled successfully!",
    });
  };

  const toggleMeetingSetting = (setting: keyof typeof meetingDetails.meetingSettings) => {
    setMeetingDetails(prev => ({
      ...prev,
      meetingSettings: {
        ...prev.meetingSettings,
        [setting]: !prev.meetingSettings[setting],
      },
    }));
  };
  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule Zoom Meeting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Meeting Title</Label>
          <Input 
            name="title"
            value={meetingDetails.title}
            onChange={handleInputChange}
            placeholder="Enter meeting title"
          />
        </div>

        <div>
          <Label>Date</Label>
          <Calendar
            mode="single"
            selected={meetingDetails.date}
            onSelect={handleDateChange}
            className="rounded-md border"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <Label>Start Time</Label>
            <Input 
              type="time"
              name="startTime"
              value={meetingDetails.startTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-1/2">
            <Label>Duration</Label>
            <Select 
              name="duration"
              value={meetingDetails.duration}
              onValueChange={(value) => setMeetingDetails(prev => ({
                ...prev,
                duration: value
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Participants (email addresses)</Label>
          <Input 
            name="participants"
            value={meetingDetails.participants}
            onChange={handleInputChange}
            placeholder="Enter participant emails (comma-separated)"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={generateMeetingLink}
            className="flex-grow"
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            Generate Zoom Link
          </Button>
          {meetingDetails.zoomLink && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => copyToClipboard(meetingDetails.zoomLink)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>

        {meetingDetails.zoomLink && (
          <div>
            <Label>Zoom Meeting Link</Label>
            <Input 
              value={meetingDetails.zoomLink}
              readOnly
            />
          </div>
        )}

        {meetingDetails.zoomLink && (
          <div>
            <Label>Meeting Password</Label>
            <Input 
              value={meetingDetails.password}
              readOnly
            />
          </div>
        )}

        <div>
          <Label>Meeting Settings</Label>
          <div className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="waitingRoom"
                checked={meetingDetails.meetingSettings.enableWaitingRoom}
                onChange={() => toggleMeetingSetting('enableWaitingRoom')}
                className="h-4 w-4"
              />
              <Label htmlFor="waitingRoom" className="cursor-pointer">
                Enable Waiting Room
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="joinBeforeHost"
                checked={meetingDetails.meetingSettings.allowJoinBeforeHost}
                onChange={() => toggleMeetingSetting('allowJoinBeforeHost')}
                className="h-4 w-4"
              />
              <Label htmlFor="joinBeforeHost" className="cursor-pointer">
                Allow Join Before Host
              </Label>
            </div>
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea 
            name="description"
            value={meetingDetails.description}
            onChange={handleInputChange}
            placeholder="Enter meeting description (optional)"
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={!meetingDetails.title || !meetingDetails.startTime || !meetingDetails.zoomLink}
        >
          Schedule Meeting
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ZoomMeetingScheduler;


// import React, {  useCallback, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast";
// import { Copy } from "lucide-react";

// const generateZoomLink = () => {
//   // Mock implementation of Zoom link generation
//   const meetingId = Math.random().toString(36).substring(2, 10).toUpperCase();
//   return `https://zoom.us/j/${meetingId}`;
// };

// const DoctorAppointmentCard = () => {
//   const [zoomDetails, setZoomDetails] = useState({
//     doctorName: "Dr. Dianne Russell",
//     specialization: "Cardiologist",
//     appointmentTime: "10:00 AM",
//     primaryConcern:
//       "Persistent chest discomfort and irregular heartbeats frequently in office period.",
//     zoomLink: "",
//   });

//   const generateMeetingLink = useCallback(() => {
//     const zoomLink = generateZoomLink();
//     setZoomDetails((prev) => ({
//       ...prev,
//       zoomLink,
//     }));
//     toast({
//       title: "Zoom Link Generated",
//       description: "Zoom meeting link has been successfully created.",
//     });
//   }, []);

//   const copyToClipboard = (text:any) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         toast({
//           title: "Copied to Clipboard",
//           description: "Meeting link copied successfully.",
//         });
//       })
//       .catch(() => {
//         toast({
//           title: "Copy Failed",
//           description: "Unable to copy meeting link.",
//           variant: "destructive",
//         });
//       });
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto mt-10">
//       <CardHeader>
//         <div className="flex items-center gap-4">
//           <img
//             src="https://via.placeholder.com/80" // Replace with actual doctor's image if available
//             alt="Doctor Profile"
//             className="rounded-full w-20 h-20"
//           />
//           <div>
//             <h3 className="text-lg font-bold">{zoomDetails.doctorName}</h3>
//             <p className="text-sm text-gray-500">{zoomDetails.specialization}</p>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label>Appointment:</Label>
//           <p>{zoomDetails.appointmentTime}</p>
//         </div>
//         <div>
//           <Label>Primary Concern:</Label>
//           <p>{zoomDetails.primaryConcern}</p>
//         </div>
//         <div>
//           {zoomDetails.zoomLink ? (
//             <>
//               <Label>Zoom Link:</Label>
//               <Input value={zoomDetails.zoomLink} readOnly />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => copyToClipboard(zoomDetails.zoomLink)}
//               >
//                 <Copy className="h-4 w-4" />
//               </Button>
//             </>
//           ) : (
//             <Button
//               className="w-full"
//               onClick={generateMeetingLink}
//               variant="outline"
//             >
//               Generate Zoom Link
//             </Button>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter>
//         {zoomDetails.zoomLink && (
//           <Button className="w-full">
//             <a href={zoomDetails.zoomLink} target="_blank" rel="noopener noreferrer">
//               Join Zoom Meeting
//             </a>
//           </Button>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default DoctorAppointmentCard;
