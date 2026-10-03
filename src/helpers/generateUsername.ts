import UserModel from "@/models/User";

const createBaseUsername = (fullName: string) => {
  return fullName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

export const generateUniqueUsername = async (
  fullName: string,
): Promise<string> => {
  const base = createBaseUsername(fullName);

  let username = "";
  let exist = true;

  while (exist) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    username = `@${base}${randomNumber}`;

    const existUser = await UserModel.findOne({ username });

    if (!existUser) {
      exist = false;
    }
  }

  return username;
};
