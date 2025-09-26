import { NextResponse } from "next/server";
import User from "@/app/models/user";
import { connectDB } from "@/app/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();
  console.log({ fullname, email, password });

  if (!password || password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters long" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json(savedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
