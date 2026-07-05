export {};

// The only roles in this app: "admin" is the teacher (you), and everyone
// else is a student. A user with no role set is treated as a student.
export type Role = "admin" | "student";

declare global {
  // Makes `sessionClaims.metadata.role` typed when reading from `auth()`.
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: Role;
    };
  }

  // Makes `user.publicMetadata.role` typed when reading from `currentUser()`.
  interface UserPublicMetadata {
    role?: Role;
  }
}
