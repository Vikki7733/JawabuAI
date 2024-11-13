// controllers/authController.ts
import { Request, Response } from "express";
import { generateJWT, verifyJWT } from '../utils/jwtToken';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, clientAuth, adminAuth, adminDb } from "../config/firebase";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { fetchUserByEmail, fetchUserById, fetchEnrolledChapters, fetchAvailableCourses } from "../utils/firebaseUtils";

export async function registerUser(req: Request, res: Response):Promise<any> {
  const { firstName, lastName, email, password, age, address, phone } = req.body;

  try {
    const existingUser = await adminAuth.getUserByEmail(email).catch(() => null);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    const hashedPassword = await hashPassword(password);
    const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
    const userId = userCredential.user.uid;

    await adminDb.collection("users").doc(userId).set({
      firstName, lastName, email, password: hashedPassword, age, address, phone,
      created_at: new Date(), updated_at: new Date()
    });

    const token = generateJWT({ uid: userId, email });
    const availableCourses = await fetchAvailableCourses();

    res.json({
      message: "User registered successfully",
      token,
      user: { id: userId, firstName, lastName, email, age, address, phone, availableCourses }
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function loginUser(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const userSnapshot = await fetchUserByEmail(email);
    if (!userSnapshot) {
      return res.status(404).json({ error: "User not found." });
    }

    const userCredential = userSnapshot.data();
    const isPasswordValid = await verifyPassword(password, userCredential.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const enrolledChapters = await fetchEnrolledChapters(userSnapshot.id);
    const availableCourses = await fetchAvailableCourses();
    const token = generateJWT({ uid: userSnapshot.id, email });

    res.json({
      message: 'User logged in successfully',
      token,
      user: userCredential,
      enrolledChapters,
      availableCourses
    });
  } catch (error) {
    res.status(500).json({error: (error as Error).message });
  }
}

export async function googleLogin(req: Request, res: Response): Promise<any> {
  const { idToken } = req.body;

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDoc = await fetchUserById(uid);
    if (!userDoc) {
      await adminDb.collection("users").doc(uid).set({
        name: decodedToken.name,
        email: decodedToken.email,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    res.json({ message: "User authenticated via Google", uid, email: decodedToken.email });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function getUserData(req: Request, res: Response):Promise<any> {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyJWT(token);
    const userCredential = await fetchUserById(decoded.uid);

    if (!userCredential) {
      return res.status(404).json({ error: 'User not found' });
    }

    const enrolledChapters = await fetchEnrolledChapters(decoded.uid);
    const availableCourses = await fetchAvailableCourses();

    res.json({
      user: {
        id: decoded.uid,
        ...userCredential,           // Includes all user data fields
      },
      enrolledChapters,
      availableCourses});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
