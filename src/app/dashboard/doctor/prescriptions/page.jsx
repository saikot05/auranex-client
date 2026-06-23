"use client";

import React, { useEffect, useState } from "react";
import { Table, Card, Chip } from "@heroui/react";
import { getDoctorPrescriptions } from "@/lib/api/doctors";
import { createPrescription, updatePrescription, deletePrescription } from "@/lib/actions/doctors";

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [form, setForm] = useState({ patientEmail: "", diagnosis: "", medications: "", notes: "" });
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(null);
  const doctorEmail = "doctor@example.com";

  const fetchPrescriptions = async () => {
    const res = await getDoctorPrescriptions(doctorEmail);
    if (res?.success) setPrescriptions(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getDoctorPrescriptions(doctorEmail);
      if (res?.success) setPrescriptions(res.data);
    })();
  }, []);

  const handleEdit = (p) => {
    setSelected(p);
    setForm({
      patientEmail: p.patientEmail || "",
      diagnosis: p.diagnosis,
      medications: p.medications,
      notes: p.notes,
    });
    setMode("edit");
  };

  const handleDelete = async (id) => {
    await deletePrescription(id);
    fetchPrescriptions();
  };

  const handleSubmit = async () => {
    if (mode === "create") {
      await createPrescription({ doctorEmail, ...form });
    } else if (mode === "edit") {
      await updatePrescription(selected._id, {
        diagnosis: form.diagnosis,
        medications: form.medications,
        notes: form.notes,
      });
    }
    setMode(null);
    setForm({ patientEmail: "", diagnosis: "", medications: "", notes: "" });
    setSelected(null);
    fetchPrescriptions();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prescription Management</h1>
          <p className="text-sm text-gray-500">Create and manage digital prescriptions for your patients.</p>
        </div>
        <button
          onClick={() => {
            setForm({ patientEmail: "", diagnosis: "", medications: "", notes: "" });
            setSelected(null);
            setMode("create");
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
        >
          + New Prescription
        </button>
      </div>

      {mode && (
        <Card>
          <Card.Content className="space-y-4">
            <h2 className="text-lg font-semibold">
              {mode === "create" ? "Create Prescription" : "Edit Prescription"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {mode === "create" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Patient Email</label>
                  <input
                    type="email"
                    value={form.patientEmail}
                    onChange={(e) => setForm({ ...form, patientEmail: e.target.value })}
                    placeholder="patient@example.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Diagnosis</label>
                <input
                  type="text"
                  value={form.diagnosis}
                  onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                  placeholder="Enter diagnosis"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Medications</label>
                <input
                  type="text"
                  value={form.medications}
                  onChange={(e) => setForm({ ...form, medications: e.target.value })}
                  placeholder="e.g. Paracetamol 500mg, twice daily"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Additional instructions..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                {mode === "create" ? "Create" : "Update"}
              </button>
              <button
                onClick={() => setMode(null)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-sm rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </Card.Content>
        </Card>
      )}

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Prescriptions table">
            <Table.Header>
              <Table.Column isRowHeader>Patient</Table.Column>
              <Table.Column>Date</Table.Column>
              <Table.Column>Diagnosis</Table.Column>
              <Table.Column>Medications</Table.Column>
              <Table.Column>Notes</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <p className="text-center text-gray-400 py-6">
                  No prescriptions found. Create one to get started.
                </p>
              )}
            >
              {prescriptions.map((p) => (
                <Table.Row key={p._id}>
                  <Table.Cell>
                    <p className="font-medium text-sm">{p.patientEmail}</p>
                  </Table.Cell>
                  <Table.Cell>{new Date(p.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Chip size="sm" variant="flat" color="primary">{p.diagnosis}</Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-sm max-w-[200px] truncate">{p.medications}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-sm max-w-[150px] truncate text-gray-500">{p.notes}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="px-3 py-1 text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}