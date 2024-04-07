"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "../../config/axios";
import { toast } from "sonner"


export function DialogDemo({fetchData}: any) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        gender: "",
        address: {
        city: "",
        country: "",
        zipCode: "",
        line1: '',
        line2: ''
        }
      });
    
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setFormData({
              ...formData,
              address: {
                ...formData.address,
                [addressField]: value
              }
            });
          } else {
            setFormData({ ...formData, [name]: value });
          }
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData);
        function isEmpty(obj: any) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        }
        
        if(!isEmpty(formData)){
            toast.error("Fill the inputs")
            return 
        }
        
        try {
          const response = await axios.post("/addContacts", formData);
          fetchData()
          console.log("Data saved:", response.data);
        } catch (error) {
          console.error("Error saving data:", error);
          // Optionally show an error message to the user
        }
      };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Contact</DialogTitle>
          <DialogDescription>Fill details to add contact</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              required
              id="firstName"
              name="firstName"
              minLength={3}
            value={formData.firstName}
                onChange={handleChange}
              maxLength={10}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              required
              name="lastName"
              minLength={3}
                value={formData.lastName}
                onChange={handleChange}
              id="lastName"
              maxLength={10}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone Number
            </Label>
            <Input required id="phone" name="phone"
                value={formData.phone}
                onChange={handleChange} maxLength={10} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input type="email" required id="email" name="email"
                value={formData.email}
                onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <select id="gender" name="gender" className="w-full" value={formData.gender}
                onChange={handleChange}>
              <option value="" className="w-full">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address.line1" className="text-right">
              Address Line 1
            </Label>
            <Input required id="address.line1" name="address.line1"
                value={formData.address.line1}
                onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address.line2" className="text-right">
              Address Line 2
            </Label>
            <Input required id="address.line2" name="address.line2"
                value={formData.address.line2}
                onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address.city" className="text-right">
              City
            </Label>
            <Input required id="address.city" name="address.city"
                value={formData.address.city}
                onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address.country" className="text-right">
              Country
            </Label>
            <Input required id="address.country"name="address.country"
                value={formData.address.country}
                onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address.zipCode" className="text-right">
              Zip Code
            </Label>
            <Input required id="name" type="number" name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
