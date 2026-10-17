import { v2 as cloudinary } from "cloudinary";

import { getAuthUser } from "@/helpers/getUser";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image Cloudinary Upload
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        { success: false, message: "No file uploaded" },
        { status: 400 },
      );
    }

    // File type Check ===
    if (!file.type.startsWith("image/")) {
      return Response.json(
        { success: false, message: "Only image files are allowed" },
        { status: 400 },
      );
    }

    // File size Check ===
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return Response.json(
        { success: false, message: "Image size must be less than 5MB" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "anirban-business-fund", resource_type: "image" },
          (error, res) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                secure_url: res?.secure_url,
                public_id: res?.public_id,
              });
            }
          },
        )
        .end(buffer);
    });

    return Response.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Upload failed" },
      { status: 500 },
    );
  }
}

// Profile Update API function ===
export async function PATCH(request: Request) {
  try {
    await dbConnect();

    // Verify token
    const auth = await getAuthUser();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    if (auth.role !== "admin") {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    const {
      userId,
      avatar,
      avatarId,
      fullName,
      username,
      email,
      isVerifiedEmail,
      number,
      isVerifiedNumber,
      gender,
      dateOfBirth,
      blood,
      nationality,
      address,
    } = await request.json();

    // Check if user exists
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const oldAvatarId = existingUser.avatarId;

    existingUser.fullName = fullName;
    existingUser.username = username;
    existingUser.email = email;
    existingUser.isVerifiedEmail = isVerifiedEmail;
    existingUser.number = number;
    existingUser.isVerifiedNumber = isVerifiedNumber;
    existingUser.dateOfBirth = dateOfBirth;
    existingUser.gender = gender;
    existingUser.blood = blood;
    existingUser.nationality = nationality;
    existingUser.address = address;

    if (avatar && avatarId) {
      existingUser.avatar = avatar;
      existingUser.avatarId = avatarId;
    }

    await existingUser.save();

    if (avatar && avatarId && oldAvatarId && oldAvatarId !== avatarId) {
      try {
        await cloudinary.uploader.destroy(oldAvatarId);
      } catch (cloudinaryError) {
        console.error("Old avatar delete failed:", cloudinaryError);
      }
    }

    return Response.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("user update error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
