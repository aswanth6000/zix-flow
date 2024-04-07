export interface ApiResponse {
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