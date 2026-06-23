"use client";

import { useEffect, useState } from "react";
import { Table, Button, Input, Card } from "@heroui/react";
import { createDoctorSlot, deleteDoctorSlot } from "@/lib/actions/doctors";
import { getDoctorSlots } from "@/lib/api/doctors";

export default function ManageSchedulePage() {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");
  const doctorEmail = "doctor@example.com";

  const fetchSlots = async () => {
    const res = await getDoctorSlots(doctorEmail);
    if (res?.success) setSlots(res.data);
  };

  useEffect(() => {
    (async () => {
      const res = await getDoctorSlots(doctorEmail);
      if (res?.success) setSlots(res.data);
    })();
  }, []);

  const handleAddSlot = async () => {
    await createDoctorSlot({ email: doctorEmail, time: newSlot });
    setNewSlot("");
    fetchSlots();
  };

  const handleDelete = async (id) => {
    await deleteDoctorSlot(id);
    fetchSlots();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Schedule</h2>

      <Card className="mb-6">
        <Card.Content className="flex flex-row gap-4">
          <Input
            placeholder="e.g., 10:00 AM - 11:00 AM"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
          />
          <Button color="primary" onPress={handleAddSlot}>
            Add Slot
          </Button>
        </Card.Content>
      </Card>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Doctor Slots">
            <Table.Header>
              <Table.Column isRowHeader>Time Slot</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <p className="text-center text-gray-400 py-4">
                  No slots added yet.
                </p>
              )}
            >
              {slots.map((slot) => (
                <Table.Row key={slot._id}>
                  <Table.Cell>{slot.time}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="px-3 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                    >
                      Delete
                    </button>
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