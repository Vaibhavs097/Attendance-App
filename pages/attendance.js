"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AttendancePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");
  const [todayRecord, setTodayRecord] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser || loggedUser.role !== "employee") {
      router.push("/login");
    } else {
      setUser(loggedUser);

      // Fetch today's record from API
      const today = new Date().toLocaleDateString();
      fetch("/api/attendance")
        .then((res) => res.json())
        .then((data) => {
          const record = data.find(
            (r) => r.email === loggedUser.email && r.date === today
          );
          setTodayRecord(record || null);
        });
    }
  }, [router]);

  const handleClockIn = async () => {
    const now = new Date().toLocaleTimeString();
    const today = new Date().toLocaleDateString();

    const record = { email: user.email, date: today, start: now, end: null };

    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (res.ok) {
      setTodayRecord(record);
      setStatus(`Clocked in at ${now}`);
    } else {
      setStatus("Error clocking in. Try again.");
    }
  };

  const handleClockOut = async () => {
    const now = new Date().toLocaleTimeString();
    const today = new Date().toLocaleDateString();

    // Get all records
    const res = await fetch("/api/attendance");
    const data = await res.json();

    const recordIndex = data.findIndex(
      (r) => r.email === user.email && r.date === today
    );

    if (recordIndex !== -1 && !data[recordIndex].end) {
      data[recordIndex].end = now;

      // Update the record in API (overwrite all for simplicity)
      await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data[recordIndex]), // send only updated record
      });

      setTodayRecord(data[recordIndex]);
      setStatus(`Clocked out at ${now}`);
    } else {
      setStatus("You need to clock in first or already clocked out.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: "#dfcae0ff" }}>
      <div className="flex justify-between w-full max-w-md mb-4">
        <h1 className="text-2xl font-bold">Employee Attendance</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="mb-4">Welcome, {user.email}</p>

      {!todayRecord?.start && (
        <button
          onClick={handleClockIn}
          className="bg-green-500 text-white px-4 py-2 rounded mb-2"
        >
          Clock In
        </button>
      )}

      {todayRecord?.start && !todayRecord?.end && (
        <button
          onClick={handleClockOut}
          className="bg-yellow-500 text-white px-4 py-2 rounded mb-2"
        >
          Clock Out
        </button>
      )}

      {todayRecord && (
        <div className="mt-2">
          <p>Start Time: {todayRecord.start || "-"}</p>
          <p>End Time: {todayRecord.end || "-"}</p>
        </div>
      )}

      {status && <p className="mt-2 text-blue-500">{status}</p>}
    </div>
  );
}
