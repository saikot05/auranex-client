"use client";

import React, { useEffect, useState } from "react";
import { Table, Chip } from "@heroui/react";
import { getDoctorAppointments } from "@/lib/api/doctors";
import { updateAppointmentStatus } from "@/lib/actions/doctors";
import { useSession } from "@/lib/auth-client";

export default function AppointmentRequestsPage() {
  const [appointments, setAppointments] = useState([]);
  const { data: session } = useSession();
  const doctorEmail = session?.user?.email;

  const fetchAppointments = async () => {
    if (!doctorEmail) return;
    const res = await getDoctorAppointments(doctorEmail);
    if (res?.success) setAppointments(res.data);
  };

  useEffect(() => {
    if (!doctorEmail) return;
    (async () => {
      const res = await getDoctorAppointments(doctorEmail);
      if (res?.success) setAppointments(res.data);
    })();
  }, [doctorEmail]);

  const handleStatusChange = async (id, status) => {
    await updateAppointmentStatus(id, status);
    fetchAppointments();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Appointment Requests</h2>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Appointment requests table">
            <Table.Header>
              <Table.Column isRowHeader>PATIENT NAME</Table.Column>
              <Table.Column>DATE</Table.Column>
              <Table.Column>TIME SLOT</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <p className="text-center text-gray-400 py-4">No pending appointment requests found.</p>
              )}
            >
              {appointments.map((app) => (
                <Table.Row key={app._id}>
                  <Table.Cell>
                    <div>
                      <p className="font-semibold">{app.patientName || "Patient"}</p>
                      <p className="text-xs text-gray-500">{app.patientEmail || ""}</p>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{app.selectedDate || "—"}</Table.Cell>
                  <Table.Cell>{app.selectedSlot || "—"}</Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        app.appointmentStatus === "pending" ? "warning" :
                        app.appointmentStatus === "accepted" ? "primary" :
                        app.appointmentStatus === "completed" ? "success" : "danger"
                      }
                      className="capitalize"
                    >
                      {app.appointmentStatus || "pending"}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2 flex-wrap">
                      {app.appointmentStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(app._id, "accepted")}
                            className="px-3 py-1 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(app._id, "rejected")}
                            className="px-3 py-1 text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {app.appointmentStatus === "accepted" && (
                        <a
                          href="/dashboard/doctor/prescriptions"
                          onClick={() => handleStatusChange(app._id, "completed")}
                          className="px-3 py-1 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                        >
                          Mark Completed
                        </a>
                      )}
                      {(app.appointmentStatus === "completed" || app.appointmentStatus === "rejected") && (
                        <span className="text-xs text-gray-400 italic">
                          {app.appointmentStatus === "completed" ? "Completed ✓" : "Rejected"}
                        </span>
                      )}
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
