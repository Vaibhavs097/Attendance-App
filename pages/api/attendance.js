import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "attendance.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    const data = JSON.parse(fs.readFileSync(filePath));
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const { email, date, start, end } = req.body;
    const data = JSON.parse(fs.readFileSync(filePath));

    data.push({ email, date, start, end });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ message: "Attendance saved" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
