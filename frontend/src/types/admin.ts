export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin";
}

export interface AdminStats {
  totalUsers: number;
  onlinePlayers: number;
  activeRooms: any[];
  totalGames: {
    multiplayer: number;
    singleplayer: number;
  };
}

export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminSignUpData extends AdminLoginData {
  username: string;
  adminCode: string;
}
