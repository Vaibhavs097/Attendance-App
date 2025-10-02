"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import autoTable from "jspdf-autotable";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser || loggedUser.role !== "admin") {
      router.push("/login");
    } else {
      setUser(loggedUser);

      // Fetch attendance data from API
      fetch("/api/attendance")
        .then((res) => res.json())
        .then((data) => setAttendanceData(data))
        .catch((err) => console.error("Error fetching attendance:", err));
    }
  }, [router]);

  const exportPDF = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.jsPDF();
        const tableColumn = ["Email", "Date", "Start", "End"];
        const tableRows = attendanceData.map((row) => [
          row.email,
          row.date,
          row.start || "-",
          row.end || "-",
        ]);

        doc.text("Employee Attendance Report", 14, 15);
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 20,
        });
        doc.save("attendance_report.pdf");
      });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
<div className="p-6 min-h-screen" style={{ backgroundColor: "#87cbe3ff" }}>
      
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold" style={{ backgroundColor: "#78c9f8ff" }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <table className="table-auto border-collapse border border-gray-400 mb-4 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Start</th>
            <th className="border px-4 py-2">End</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{row.email}</td>
              <td className="border px-4 py-2">{row.date}</td>
              <td className="border px-4 py-2">{row.start || "-"}</td>
              <td className="border px-4 py-2">{row.end || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={exportPDF}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Export PDF
      </button>
    </div>
  );
}
