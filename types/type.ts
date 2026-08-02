export type TUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};

export type NavItem = {
  label: string;
  href: string;
};

export type LoginState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RegisterState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      isBanned: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
} | null;

// types/category.type.ts

export type Category = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RentalRequest = {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";
  createdAt: string;
  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    images: string[];
  };
  tenant?: {
    name: string;
    email: string;
  };
};

export type TProperty = {
  id: string;
  title: string;
  description?: string;
  location: string;
  price: number;
  amenities?: string[];
  images?: string[];
  isAvailable: boolean;
  category?: {
    name: string;
  };
  landlord?: {
    id: string;
    name: string;
    email: string;
  };
  rentals?: RentalRequest[];
};

export type filterParam = {
  location?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
};

export type CreateRentalPayload = {
  propertyId: string;
  startDate: string;
  endDate: string;
  message?: string;
  totalPrice: number;
};

export type RequestRentModalProps = {
  propertyId: string;
  propertyTitle: string;
  price: number;
  isOpen: boolean;
  onClose: () => void;
};
