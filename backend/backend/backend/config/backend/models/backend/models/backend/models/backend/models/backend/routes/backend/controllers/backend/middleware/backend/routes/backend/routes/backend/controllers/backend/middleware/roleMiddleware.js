// backend/middleware/roleMiddleware.js

// Allow only instructors
export const instructorOnly = (req, res, next) => {
  if (req.user && (req.user.role === "instructor" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Instructor access only" });
  }
};

// Allow only admins
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
