"use client";
import axios from "../../config/axios";
import { Pagination } from "antd";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { DialogDemo } from "./addContact";

interface ApiResponse {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
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

export default function AllContacts() {
  const [pageNumber, setPagenumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [data, setData] = useState<ApiResponse[]>();

  useEffect(() => {
    fetchData(pageNumber); // Call fetchData when component mounts or when pageNumber changes
  }, [pageNumber]);

  const fetchData = (page: number) => {
    axios.get(`/allContacts?page=${page}`)
      .then((response) => {
        setData(response.data.allusers);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (
    id: string,
    field: string,
    value: any | number
  ) => {
    // Make API call to update the field
    axios
      .put(`/updateContact/${id}`, { [field]: value })
      .then(() => {
        console.log(`Field "${field}" updated successfully`);
        // Update the local state with the new value
        setData((prevData) => {
          const newData = prevData?.map((user) => {
            if (user._id === id) {
              // Update the specific field of the user
              if (field === "address") {
                // If the field is 'address', update its properties separately
                return { ...user, address: { ...user.address, ...value } };
              } else {
                // Otherwise, update the field directly
                return { ...user, [field]: value };
              }
            }
            return user;
          });
          return newData;
        });
      })
      .catch((error: Error) =>
        console.error(`Error updating field "${field}":`, error)
      );
  };

  const handleDelete = (id: string) => {
    // Make API call to delete the contact
    axios
      .delete(`/deleteContact/${id}`)
      .then(() => {
        console.log("Contact deleted successfully");
        // fetchData(); 
      })
      .catch((error: Error) => console.error("Error deleting contact:", error));
  };

  function handlePageChange(page: number): void {
    setPagenumber(page)
  }

  return (
    <main className="max-w-8xl mx-auto px-4 py-8">
    <DialogDemo fetchData={fetchData}/>
      <table className="w-full border-collapse">
        <caption className="text-lg mb-4">All Addresses</caption>
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">First Name</th>
            <th className="border border-gray-400 px-4 py-2">Last Name</th>
            <th className="border border-gray-400 px-4 py-2">Phone No</th>
            <th className="border border-gray-400 px-16 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Gender</th>
            <th className="border border-gray-400 px-4 py-2">Line 1</th>
            <th className="border border-gray-400 px-4 py-2">Line 2</th>
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
                    onBlur={(e) =>
                      handleInputChange(user._id, 'firstName', e.target.value)
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? { ...u, firstName: e.target.value }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.lastName}
                    onBlur={(e) =>
                      handleInputChange(user._id, 'lastName', e.target.value)
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? { ...u, lastName: e.target.value }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.phone}
                    onBlur={(e) =>
                      handleInputChange(user._id, 'phone', e.target.value)
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? { ...u, phone: e.target.value }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="email"
                    value={user.email}
                    onBlur={(e) =>
                      handleInputChange(user._id, 'email', e.target.value)
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? { ...u, email: e.target.value }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.gender}
                    onBlur={(e) =>
                      handleInputChange(user._id, 'gender', e.target.value)
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? { ...u, gender: e.target.value }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={user.address.line1}
                    onBlur={(e) =>
                      handleInputChange(
                        user._id,
                        'address',
                        { line1: e.target.value }
                      )
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                address: { ...u.address, line1: e.target.value },
                              }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                <input
                    type="text"
                    value={user.address.line2}
                    onBlur={(e) =>
                      handleInputChange(
                        user._id,
                        'address',
                        { line2: e.target.value }
                      )
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                address: { ...u.address, line2: e.target.value },
                              }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>

                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.address.city}
                    onBlur={(e) =>
                      handleInputChange(
                        user._id,
                        'address',
                        { city: e.target.value }
                      )
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                address: { ...u.address, city: e.target.value },
                              }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.address.country}
                    onBlur={(e) =>
                      handleInputChange(
                        user._id,
                        'address',
                        { country: e.target.value }
                      )
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                address: {
                                  ...u.address,
                                  country: e.target.value,
                                },
                              }
                            : u
                        )
                      )
                    }
                    className="w-full focus:outline-none"
                  />
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={user.address.zipCode}
                    onBlur={(e) =>
                      handleInputChange(
                        user._id,
                        'address',
                        { zipCode: e.target.value }
                      )
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                address: {
                                  ...u.address,
                                  zipCode: e.target.value,
                                },
                              }
                            : u
                        )
                      )
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
      <Pagination defaultCurrent={1} total={totalPages * 5} onChange={handlePageChange} />
    </main>
  );
}


