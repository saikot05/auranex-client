"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Table, Button, Chip, Modal, Input, Spinner } from "@heroui/react";
import { Calendar, TrashBin } from "@gravity-ui/icons";
import { getAppointments } from "@/lib/api/appointments";
import { cancelAppointmentAction, rescheduleAppointmentAction } from "@/lib/actions/appointments";

export default function MyAppointmentsPage() {
    const { data: session } = useSession();
    const userEmail = session?.user?.email;

    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [newDate, setNewDate] = useState("");

    const loadAppointments = async () => {
        if (!userEmail) return;
        try {
            setLoading(true);
            const data = await getAppointments(userEmail);
            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userEmail) {
            loadAppointments();
        }
    }, [userEmail]);

    const handleRescheduleSubmit = async () => {
        if (!selectedAppointment || !newDate) return;
        try {
            const result = await rescheduleAppointmentAction(selectedAppointment._id, newDate);
            if (result && result.success) { 
                await loadAppointments();
                setNewDate("");
                setIsRescheduleOpen(false); 
            } else {
                console.error("Reschedule failed:", result?.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelSubmit = async () => {
        if (!selectedAppointment) return;
        try {
            const result = await cancelAppointmentAction(selectedAppointment._id);
            if (result && result.success) { 
                await loadAppointments();
                setIsCancelOpen(false); 
            } else {
                console.error("Cancellation failed:", result?.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Spinner label="Loading appointments..." color="primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full p-4">
            <div>
                <h1 className="text-2xl font-bold">My Appointments</h1>
                <p className="text-sm text-muted-foreground">View, reschedule, or cancel your doctor consultations.</p>
            </div>

            <Table variant="secondary">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Patient Appointments Table" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>DOCTOR</Table.Column>
                            <Table.Column>DATE & TIME</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column align="center">ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body emptyContent={"No appointments found."}>
                            {appointments.map((app) => (
                                <Table.Row key={app._id}>
                                    <Table.Cell>
                                        <div>
                                            <p className="font-semibold">{app.doctorName || "Specialist Doctor"}</p>
                                            <p className="text-xs text-muted-foreground">{app.specialty || "General Medicine"}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p className="text-sm font-medium">{app.date}</p>
                                        <p className="text-xs text-muted-foreground">{app.time || "N/A"}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip 
                                            color={app.status === "accepted" ? "success" : app.status === "pending" ? "warning" : "danger"} 
                                            variant="flat" 
                                            size="sm"
                                            className="capitalize"
                                        >
                                            {app.status}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center justify-center gap-2">
                                            {app.status !== "canceled" && (
                                                <>
                                                    <Button 
                                                        size="sm" variant="flat" color="primary" startContent={<Calendar className="w-4 h-4" />}
                                                        onPress={() => { setSelectedAppointment(app); setIsRescheduleOpen(true); }}
                                                    >
                                                        Reschedule
                                                    </Button>
                                                    <Button 
                                                        size="sm" variant="flat" color="danger" startContent={<TrashBin className="w-4 h-4" />}
                                                        onPress={() => { setSelectedAppointment(app); setIsCancelOpen(true); }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            <Modal>
                <Modal.Backdrop isOpen={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
                    <Modal.Container placement="center">
                        <Modal.Dialog className="sm:max-w-[360px]">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Reschedule Appointment</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="space-y-4">
                                <p className="text-sm text-muted">Choose a new date for your consultation.</p>
                                <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">Close</Button>
                                <Button color="primary" onPress={handleRescheduleSubmit}>Confirm</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            <Modal>
                <Modal.Backdrop isOpen={isCancelOpen} onOpenChange={setIsCancelOpen}>
                    <Modal.Container placement="center">
                        <Modal.Dialog className="sm:max-w-[360px]">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Cancel Appointment</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p className="text-sm text-muted">Are you sure you want to cancel this appointment?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">No, Keep</Button>
                                <Button color="danger" onPress={handleCancelSubmit}>Yes, Cancel</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
}
