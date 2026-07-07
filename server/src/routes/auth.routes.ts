import { Router, Response } from "express";
import { supabase } from "../config/supabase";
import { pool } from "../config/db";
import { requireAuth, AuthenticatedRequest } from "../middlewares/auth.middleware";

const router = Router();

// ── 1. REGISTRATION ENDPOINT (POST /api/auth/register) ────────────────
router.post("/register", async (req, res) => {
  const client = await pool.connect();
  try {
    const { clinicName, email, password, firstName, lastName } = req.body;

    if (!clinicName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: { message: "Clinic name, email, and password are required." },
      });
    }

    // A. Create User inside Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      return res.status(400).json({
        success: false,
        error: { message: authError?.message || "Auth registration failed." },
      });
    }

    const userId = authData.user.id;

    // B. Start Database transaction on local Postgres
    await client.query("BEGIN");

    // B1. Insert new business tenant
    const businessResult = await client.query(
      "INSERT INTO businesses (name, email) VALUES ($1, $2) RETURNING id",
      [clinicName, email]
    );
    const businessId = businessResult.rows[0].id;

    // B2. Ensure default "owner" role exists in roles table
    let roleIdResult = await client.query("SELECT id FROM roles WHERE name = 'owner'");
    let roleId: string;
    
    if (roleIdResult.rows.length === 0) {
      const newRole = await client.query(
        "INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING id",
        ["owner", "Clinic Workspace Owner"]
      );
      roleId = newRole.rows[0].id;
    } else {
      roleId = roleIdResult.rows[0].id;
    }

    // B3. Insert profile user record linked to business
    await client.query(
      `INSERT INTO users (id, business_id, first_name, last_name, email, status) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        userId,
        businessId,
        firstName || "Clinic",
        lastName || "Owner",
        email,
        "active",
      ]
    );

    // B4. Assign user to the owner role
    await client.query(
      "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
      [userId, roleId]
    );

    await client.query("COMMIT");

    res.status(201).json({
      success: true,
      message: "Clinic registered and setup completed.",
      data: {
        session: authData.session,
        user: {
          id: userId,
          email,
          firstName: firstName || "Clinic",
          lastName: lastName || "Owner",
          businessId,
        },
      },
    });
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error("Registration endpoint error:", err);
    res.status(500).json({
      success: false,
      error: { message: err.message || "Failed to create registration profile." },
    });
  } finally {
    client.release();
  }
});

// ── 2. LOGIN ENDPOINT (POST /api/auth/login) ──────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { message: "Email and password are required." },
      });
    }

    // A. Sign in with password using Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user || !authData.session) {
      return res.status(401).json({
        success: false,
        error: { message: authError?.message || "Invalid credentials." },
      });
    }

    const userId = authData.user.id;

    // B. Fetch profile records from Postgres
    const userQuery = await pool.query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.business_id, b.name as business_name
       FROM users u
       JOIN businesses b ON u.business_id = b.id
       WHERE u.id = $1 AND u.status = 'active'`,
      [userId]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: { message: "User account suspended or profile not initialized." },
      });
    }

    const userProfile = userQuery.rows[0];

    res.status(200).json({
      success: true,
      data: {
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_at: authData.session.expires_at,
        },
        user: {
          id: userProfile.id,
          email: userProfile.email,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          businessId: userProfile.business_id,
          businessName: userProfile.business_name,
        },
      },
    });
  } catch (err: any) {
    console.error("Login Endpoint Error:", err);
    res.status(500).json({
      success: false,
      error: { message: err.message || "Internal server error during login check." },
    });
  }
});

// ── 3. ME SESSION PROFILE (GET /api/auth/me) ──────────────────────────
router.get("/me", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userSession = req.user;
    if (!userSession) {
      return res.status(401).json({
        success: false,
        error: { message: "Authentication required." },
      });
    }

    const profileQuery = await pool.query(
      `SELECT u.id, u.first_name as "firstName", u.last_name as "lastName", u.email, u.business_id as "businessId", 
              b.name as "businessName", b.timezone, b.currency
       FROM users u
       JOIN businesses b ON u.business_id = b.id
       WHERE u.id = $1`,
      [userSession.id]
    );

    if (profileQuery.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: "Session user profile not found." },
      });
    }

    res.status(200).json({
      success: true,
      data: profileQuery.rows[0],
    });
  } catch (err: any) {
    console.error("Get /me Error:", err);
    res.status(500).json({
      success: false,
      error: { message: err.message || "Failed to fetch session profile." },
    });
  }
});

export default router;
