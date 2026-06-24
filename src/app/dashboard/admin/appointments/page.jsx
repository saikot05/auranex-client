"use client";

import { useState, useEffect } from "react";
import { Table, Chip, Input } from "@heroui/react";
import { Calendar } from "@gravity-ui/icons";
import { getAdminAppointments } from "@/lib/api/admin";

const statusColor = {
    pending: "warning",
    confirmed: "primary",
    completed: "success",
    canceled: "danger",
};

export default function AdminAppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getAdminAppointments({ page, limit: 10 });
            if (res.success) {
                setAppointments(res.appointments);
                setTotalPages(res.totalPages);
                setTotal(res.total);
            }
            setLoading(false);
        })();
    }, [page]);

    const filtered = appointments.filter((a) =>
        a.patientEmail?.toLowerCase().includes(search.toLowerCase()) ||
        a.doctorEmail?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
                    <p className="text-sm text-default-500 mt-0.5">{total} total appointments</p>
                </div>
                <Input
                    placeholder="Search by patient or doctor email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startContent={<Calendar className="size-4 text-default-400" />}
                    className="w-72"
                    size="sm"
                    variant="bordered"
                />
            </div>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Appointments table">
                        <Table.Header>
                            <Table.Column isRowHeader>PATIENT</Table.Column>
                            <Table.Column>DOCTOR</Table.Column>
                            <Table.Column>DATE</Table.Column>
                            <Table.Column>TIME</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>PAYMENT</Table.Column>
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <p className="text-center text-sm text-default-400 py-6">
                                    {loading ? "Loading..." : "No appointments found."}
                                </p>
                            )}
                        >
                            {filtered.map((appt) => (
                                <Table.Row key={appt._id} id={appt._id}>
                                    <Table.Cell>
                                        <span className="text-sm text-default-700">{appt.patientEmail || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-700">{appt.doctorEmail || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">
                                            {appt.appointmentDate
                                                ? new Date(appt.appointmentDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit", month: "short", year: "numeric",
                                                })
                                                : "—"}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">{appt.appointmentTime || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={statusColor[appt.appointmentStatus] || "default"}
                                            className="capitalize"
                                        >
                                            {appt.appointmentStatus || "pending"}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="dot"
                                            color={appt.paymentStatus === "paid" ? "success" : "warning"}
                                            className="capitalize"
                                        >
                                            {appt.paymentStatus || "unpaid"}
                                        </Chip>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                {totalPages > 1 && (
                    <Table.Footer>
                        <div className="flex justify-center gap-2 py-1">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="px-3 py-1 text-sm rounded disabled:opacity-40 border border-default-200 hover:bg-default-100"
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-1 text-sm rounded border ${
                                        p === page
                                            ? "bg-primary text-white border-primary"
                                            : "border-default-200 hover:bg-default-100"
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="px-3 py-1 text-sm rounded disabled:opacity-40 border border-default-200 hover:bg-default-100"
                            >
                                Next
                            </button>
                        </div>
                    </Table.Footer>
                )}
            </Table>
        </div>
    );
}
