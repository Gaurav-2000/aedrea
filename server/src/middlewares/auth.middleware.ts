import { Response, NextFunction } from "express";
import { Request } from "express";
import { supabase } from "../config/supabase";
import { pool } from "../config/db";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    businessId: string;
    role?: string;
  };
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: { message: "Access denied. No authentication token provided." },
      });
    }

    const token = authHeader.split(" ")[1];
    
    // 1. Verify token with Supabase Auth API
    const { data: { user: authUser }, error } = await supabase.auth.getUser(token);
    
    if (error || !authUser) {
      return res.status(401).json({
        success: false,
        error: { message: "Invalid or expired session token." },
      });
    }

    // 2. Query our public users table to verify user enrollment and fetch business details
    const userQuery = await pool.query(
      "SELECT id, email, business_id FROM users WHERE id = $1 AND status = 'active'",
      [authUser.id]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: { message: "User account not enrolled or currently suspended." },
      });
    }

    const dbUser = userQuery.rows[0];

    // 3. Populate authenticated user info
    req.user = {
      id: dbUser.id,
      email: dbUser.email,
      businessId: dbUser.business_id,
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({
      success: false,
      error: { message: "Internal server error during session validation." },
    });
  }
}
