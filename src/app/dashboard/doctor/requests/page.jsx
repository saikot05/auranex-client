"use client";

import React, { useEffect, useState } from "react";
import { Table, Chip } from "@heroui/react";
import { getDoctorAppointments } from "@/lib/api/doctors";
import { updateAppointmentStatus } from "@/lib/actions/doctors";

export default function AppointmentRequestsPage() {
  const [appointments, setAppointments] = useState([]);
  const doctorEmail = "doctor@example.com";

  const fetchAppointments = async () => {
    const res = await getDoctorAppointments(doctorEmail);
    if (res?.success) setAppointments(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getDoctorAppointments(doctorEmail);
      if (res?.success) setAppointments(res.data);
    })();
  }, []);

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
              <Table.Column>TIME</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <p className="text-center text-gray-400 py-4">
                  No pending appointment requests found.
                </p>
              )}
            >
              {appointments.map((app) => (
                <Table.Row key={app._id}>
                  <Table.Cell>{app.patientName}</Table.Cell>
                  <Table.Cell>{app.appointmentDate}</Table.Cell>
                  <Table.Cell>{app.appointmentTime}</Table.Cell>
                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={
                        app.appointmentStatus === "pending" ? "warning" :
                        app.appointmentStatus === "accepted" ? "success" : "danger"
                      }
                    >
                      {app.appointmentStatus}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
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