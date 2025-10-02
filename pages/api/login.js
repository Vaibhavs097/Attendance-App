// Sample users data
const users = [
  { email: "admin@gmail.com", password: "admin123", role: "admin" },
  { email: "vaibhav@gmail.com", password: "emp123", role: "employee" },
  { email: "saurabh@gmail.com", password: "emp123", role: "employee" },
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, role } = req.body;

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      return res.status(200).json({ success: true, user });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email, password, or role" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
