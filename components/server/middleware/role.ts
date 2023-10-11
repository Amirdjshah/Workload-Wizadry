const checkUserRole = (role: any) => {
  return (req: any, res: any, next: any) => {
    const user = req.user; // Assuming you have user information in the request

    if (user && user.role === role) {
      // User has the required role, allow access
      next();
    } else {
      // User doesn't have the required role, deny access with a "no access" response
      res.status(403).json({ message: "No access" });
    }
  };
};

export { checkUserRole };
