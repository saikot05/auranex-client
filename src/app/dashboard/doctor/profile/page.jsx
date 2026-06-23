"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { getDoctorDetails } from "@/lib/api/doctors";
import { createDoctorSlot } from "@/lib/actions/doctors";

export default function ProfileManagementPage() {
  const doctorEmail = "doctor@example.com";
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    qualifications: "",
    experience: "",
    consultationFee: "",
    availableSlots: "",
    hospitalName: "",
    specialization: "",
  });

  const fetchProfile = async () => {
    const res = await getDoctorDetails(doctorEmail);
    if (res) {
      setProfile(res);
      setForm({
        qualifications: res.qualifications || "",
        experience: res.experience || "",
        consultationFee: res.consultationFee || "",
        availableSlots: res.availableSlots || "",
        hospitalName: res.hospitalName || "",
        specialization: res.specialization || "",
      });
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getDoctorDetails(doctorEmail);
      if (res) {
        setProfile(res);
        setForm({
          qualifications: res.qualifications || "",
          experience: res.experience || "",
          consultationFee: res.consultationFee || "",
          availableSlots: res.availableSlots || "",
          hospitalName: res.hospitalName || "",
          specialization: res.specialization || "",
        });
      }
    })();
  }, []);

  const handleSubmit = async () => {
    await createDoctorSlot({ email: doctorEmail, ...form });
    fetchProfile();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Management</h1>
        <p className="text-sm text-gray-500">Update your professional information.</p>
      </div>

      {profile && (
        <Card className="mb-4">
          <Card.Content className="flex items-center gap-4">
            <img
              src={profile.profileImage || "/default-avatar.png"}
              alt={profile.doctorName}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <p className="text-lg font-semibold">{profile.doctorName}</p>
              <p className="text-sm text-gray-500">{profile.specialization}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${profile.verificationStatus === "verified" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                {profile.verificationStatus}
              </span>
            </div>
          </Card.Content>
        </Card>
      )}

      <Card>
        <Card.Content className="space-y-4">
          <h2 className="text-lg font-semibold">Update Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Specialization</label>
              <input
                type="text"
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                placeholder="e.g. Cardiologist"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hospital Name</label>
              <input
                type="text"
                value={form.hospitalName}
                onChange={(e) => setForm({ ...form, hospitalName: e.target.value })}
                placeholder="e.g. City General Hospital"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Qualifications</label>
              <input
                type="text"
                value={form.qualifications}
                onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                placeholder="e.g. MBBS, MD"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience (years)</label>
              <input
                type="number"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="e.g. 10"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Consultation Fee ($)</label>
              <input
                type="number"
                value={form.consultationFee}
                onChange={(e) => setForm({ ...form, consultationFee: e.target.value })}
                placeholder="e.g. 50"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Available Slots</label>
              <input
                type="text"
                value={form.availableSlots}
                onChange={(e) => setForm({ ...form, availableSlots: e.target.value })}
                placeholder="e.g. Mon-Fri 9AM-5PM"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </Card.Content>
      </Card>
    </div>
  );
}