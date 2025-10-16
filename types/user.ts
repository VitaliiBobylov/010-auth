import { getMeServer } from "@/lib/api/serverApi";

interface User {
  id: string;
  username?: string;
  email: string;
  avatar?: string;
}

const user: User | null = await getMeServer();
export { type User };
