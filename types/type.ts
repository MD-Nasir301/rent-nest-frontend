
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
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}


