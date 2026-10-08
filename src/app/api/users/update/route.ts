import { v2 as cloudinary } from "cloudinary";

import { getAuthUserId } from "@/helpers/getUserId";
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

// Profile Update API functiob ===
export async function PATCH(request: Request) {
  try {
    await dbConnect();

    const {
      fullName,
      gender,
      dateOfBirth,
      blood,
      nationality,
      address,
      avatar,
      avatarId,
    } = await request.json();

    // Get decoded form getAuthUserId ===
    const auth = await getAuthUserId();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    const user = await UserModel.findById(auth.decoded?.userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 },
      );
    }

    const oldAvatarId = user.avatarId;

    user.fullName = fullName;
    user.gender = gender;
    user.dateOfBirth = dateOfBirth;
    user.blood = blood;
    user.nationality = nationality;
    user.address = address;

    if (avatar && avatarId) {
      user.avatar = avatar;
      user.avatarId = avatarId;
    }

    await user.save();

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
