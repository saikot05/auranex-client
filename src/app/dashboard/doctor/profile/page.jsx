"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { getDoctorProfile } from "@/lib/api/doctors";
import { updateDoctorProfile } from "@/lib/actions/doctors";
import { useSession } from "@/lib/auth-client";

export default function ProfileManagementPage() {
  const { data: session } = useSession();
  const doctorEmail = session?.user?.email;
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
    if (!doctorEmail) return;
    const res = await getDoctorProfile(doctorEmail);
    if (res?.success) {
      setProfile(res.doctor);
      setForm({
        qualifications: res.doctor.qualifications || "",
        experience: res.doctor.experience || "",
        consultationFee: res.doctor.consultationFee || "",
        availableSlots: res.doctor.availableSlots?.join(", ") || "",
        hospitalName: res.doctor.hospitalName || "",
        specialization: res.doctor.specialization || "",
      });
    }
  };

  useEffect(() => {
    if (!doctorEmail) return;
    (async () => {
      const res = await getDoctorProfile(doctorEmail);
      if (res?.success) {
        setProfile(res.doctor);
        setForm({
          qualifications: res.doctor.qualifications || "",
          experience: res.doctor.experience || "",
          consultationFee: res.doctor.consultationFee || "",
          availableSlots: res.doctor.availableSlots?.join(", ") || "",
          hospitalName: res.doctor.hospitalName || "",
          specialization: res.doctor.specialization || "",
        });
      }
    })();
  }, [doctorEmail]);

  const handleSubmit = async () => {
    await updateDoctorProfile(doctorEmail, {
      ...form,
      availableSlots: form.availableSlots.split(",").map((s) => s.trim()),
    });
    fetchProfile();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Management</h1>
        <p className="text-sm text-gray-500">Update your professional information.</p>
      </div>

      {profile && (
        <Card>
          <Card.Content className="flex items-center gap-4">
            <img src={profile.profileImage || "/default-avatar.png"} alt={profile.doctorName} className="w-16 h-16 rounded-full object-cover border" />
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
              <input type="text" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} placeholder="e.g. Cardiologist" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hospital Name</label>
              <input type="text" value={form.hospitalName} onChange={(e) => setForm({ ...form, hospitalName: e.target.value })} placeholder="e.g. City General Hospital" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Qualifications</label>
              <input type="text" value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} placeholder="e.g. MBBS, MD" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience (years)</label>
              <input type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 10" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Consultation Fee (৳)</label>
              <input type="number" value={form.consultationFee} onChange={(e) => setForm({ ...form, consultationFee: e.target.value })} placeholder="e.g. 1000" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Available Slots (comma separated)</label>
              <input type="text" value={form.availableSlots} onChange={(e) => setForm({ ...form, availableSlots: e.target.value })} placeholder="e.g. 10:00 AM - 12:00 PM, 04:00 PM - 06:00 PM" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {form.availableSlots && (
            <div>
              <p className="text-xs text-gray-400 mb-2">Preview Slots</p>
              <div className="flex flex-wrap gap-2">
                {form.availableSlots.split(",").map((slot, i) =>
                  slot.trim() && (
                    <span key={i} className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-lg">🕐 {slot.trim()}</span>
                  )
                )}
              </div>
            </div>
          )}

          <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
            Save Changes
          </button>
        </Card.Content>
      </Card>
    </div>
  );
}
