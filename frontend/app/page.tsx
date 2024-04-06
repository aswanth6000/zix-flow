"use client";
import axios from "../config/axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";


interface ApiResponse {
  _id: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHERS';
  address: {
    line1: string;
    line2?: string;
    city: string;
    country: string;
    zipCode: string;
  };
  email: string;
  phone: string;
  other?: Record<string, any>;
  __v: number;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse[]>();
  const fetchData = () => {
    axios
      .get("/allContacts")
      .then((response: any) => setData(response.data))
      .catch((error: any) => console.error(error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleInputChange = (id: string, field: string, value: string | number) => {
    // Make API call to update the field
    axios.put(`/updateContact/${id}`, { [field]: value })
      .then(() => console.log('Field updated successfully'))
      .catch(error => console.error('Error updating field:', error));
  };

  const handleDelete = (id: string) => {
    // Make API call to delete the contact
    axios.delete(`/deleteContact/${id}`)
      .then(() => {
        console.log('Contact deleted successfully');
        fetchData(); // Refetch data after delete
      })
      .catch(error => console.error('Error deleting contact:', error));
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <table className="w-full border-collapse">
        <caption className="text-lg mb-4">All Addresses</caption>
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">First Name</th>
            <th className="border border-gray-400 px-4 py-2">Last Name</th>
            <th className="border border-gray-400 px-4 py-2">Phone No</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Gender</th>
            <th className="border border-gray-400 px-4 py-2">City</th>
            <th className="border border-gray-400 px-4 py-2">Country</th>
            <th className="border border-gray-400 px-4 py-2">Zip Code</th>
            <th className="border border-gray-400 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) =>
                      handleInputChange(user._id, "firstName", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) =>
                      handleInputChange(user._id, "lastName", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) =>
                      handleInputChange(user._id, "phone", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      handleInputChange(user._id, "email", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.gender}
                    onChange={(e) =>
                      handleInputChange(user._id, "gender", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.address.city}
                    onChange={(e) =>
                      handleInputChange(user._id, "city", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.address.country}
                    onChange={(e) =>
                      handleInputChange(user._id, "country", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.address.zipCode}
                    onChange={(e) =>
                      handleInputChange(user._id, "zipCode", e.target.value)
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <Checkbox
                    id={user._id}
                    onChange={() => handleDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
