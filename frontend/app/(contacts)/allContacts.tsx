"use client";
import axios from "../../config/axios";
import { Pagination } from "antd";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { AddContacts } from "./addContact";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types/ApiResponse";
import Loading from "../(Loading)/Loading";

export default function AllContacts() {
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState('');
  const [pageNumber, setPagenumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState<ApiResponse[]>();

  useEffect(() => {
    fetchData(pageNumber); // Call fetchData when component mounts or when pageNumber changes
  }, [pageNumber]);

  const fetchData = (page: number) => {
    axios
      .get(`/allContacts?page=${page}`)
      .then((response) => {
        console.log(response.data.totalPages);
        setLoading(false);
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
        toast.success(`Field "${field}" updated successfully`);
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
      .catch((error: any) => {
        if (error.response && error.response.status === 409) {
          toast.error(`${field} already exists`);
        } else {
          toast.error("An error occurred while updating the field");
          console.error(error);
        }
        fetchData(pageNumber);
      });
  };



  // Function to handle deletion of selected contact
  const handleDelete = () => {
    // Make API call to delete the contact
    axios
      .delete(`/deleteContact/${deleteId}`)
      .then(() => {
        toast.success("Contact deleted successfully")
        fetchData(pageNumber); 
      })
      .catch((error: Error) => {
        toast.error("Error deleting contact")
        console.error("Error deleting contact:", error)
    });
  };
  const checkContact = (id: string) =>{    
    setDeleteId(id)
  }
  function handlePageChange(page: number, pageSize: any): void {
    setPagenumber(page - 1);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="max-w-8xl mx-auto px-4 py-8 flex content-center flex-col items-center ">
      <AddContacts fetchData={fetchData} />
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
                      handleInputChange(user._id, "firstName", e.target.value)
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
                      handleInputChange(user._id, "lastName", e.target.value)
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
                      handleInputChange(user._id, "phone", e.target.value)
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
                      handleInputChange(user._id, "email", e.target.value)
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
                      handleInputChange(user._id, "gender", e.target.value)
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
                      handleInputChange(user._id, "address", {
                        line1: e.target.value,
                      })
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                address: {
                                  ...u.address,
                                  line1: e.target.value,
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
                    value={user.address.line2}
                    onBlur={(e) =>
                      handleInputChange(user._id, "address", {
                        line2: e.target.value,
                      })
                    }
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData?.map((u) =>
                          u._id === user._id
                            ? {
                                ...u,
                                address: {
                                  ...u.address,
                                  line2: e.target.value,
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
                    value={user.address.city}
                    onBlur={(e) =>
                      handleInputChange(user._id, "address", {
                        city: e.target.value,
                      })
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
                      handleInputChange(user._id, "address", {
                        country: e.target.value,
                      })
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
                      handleInputChange(user._id, "address", {
                        zipCode: e.target.value,
                      })
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
                    onClick={()=>checkContact(user._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Button
        variant="destructive"
        className="mt-6"
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Pagination
        className="p-4"
        defaultCurrent={1}
        total={totalPages * 10}
        onChange={(page, pageSize) => handlePageChange(page, pageSize)}
      />
        </main>
      )}
    </>
  );
}
