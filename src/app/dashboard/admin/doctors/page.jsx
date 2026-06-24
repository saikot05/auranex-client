"use client";

import { useState, useEffect } from "react";
import { Table, Avatar, Chip, Button, Input } from "@heroui/react";
import { Person, Check, Xmark } from "@gravity-ui/icons";

import { getAdminDoctors } from "@/lib/api/admin";
import { updateDoctorVerification } from "@/lib/actions/admin";

const statusColor = { verified: "success", pending: "warning", rejected: "danger" };

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await getAdminDoctors();
            if (res.success) setDoctors(res.doctors);
        })();
    }, []);

    const filtered = doctors.filter((d) =>
        d.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization?.toLowerCase().includes(search.toLowerCase())
    );

    const handleVerify = async (id, action) => {
        setLoading(id + "_" + action);
        const res = await updateDoctorVerification(id, action);
        if (res.success) {
            const statusMap = { verify: "verified", reject: "rejected", cancel: "pending" };
            setDoctors((prev) =>
                prev.map((d) => d._id === id ? { ...d, verificationStatus: statusMap[action] } : d)
            );
        }
        setLoading(null);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Manage Doctors</h1>
                    <p className="text-sm text-default-500 mt-0.5">{doctors.length} total doctors</p>
                </div>
                <Input
                    placeholder="Search by name or specialization..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startContent={<Person className="size-4 text-default-400" />}
                    className="w-72"
                    size="sm"
                    variant="bordered"
                />
            </div>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Doctors table">
                        <Table.Header>
                            <Table.Column isRowHeader>DOCTOR</Table.Column>
                            <Table.Column>SPECIALIZATION</Table.Column>
                            <Table.Column>HOSPITAL</Table.Column>
                            <Table.Column>FEE</Table.Column>
                            <Table.Column>EXPERIENCE</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <p className="text-center text-sm text-default-400 py-6">No doctors found.</p>
                            )}
                        >
                            {filtered.map((doctor) => (
                                <Table.Row key={doctor._id} id={doctor._id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar size="sm">
                                                <Avatar.Image src={doctor.profileImage} />
                                                <Avatar.Fallback>
                                                    {doctor.doctorName?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </Avatar.Fallback>
                                            </Avatar>
                                            <span className="font-medium text-sm">{doctor.doctorName}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">{doctor.specialization}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">{doctor.hospitalName || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm font-semibold">৳{doctor.consultationFee}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">{doctor.experience} yrs</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={statusColor[doctor.verificationStatus] || "default"}
                                            className="capitalize"
                                        >
                                            {doctor.verificationStatus || "pending"}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            {doctor.verificationStatus !== "verified" && (
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="success"
                                                    isLoading={loading === doctor._id + "_verify"}
                                                    onPress={() => handleVerify(doctor._id, "verify")}
                                                    startContent={<Check className="size-3.5" />}
                                                >
                                                    Verify
                                                </Button>
                                            )}
                                            {doctor.verificationStatus === "verified" && (
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="warning"
                                                    isLoading={loading === doctor._id + "_cancel"}
                                                    onPress={() => handleVerify(doctor._id, "cancel")}
                                                >
                                                    Revoke
                                                </Button>
                                            )}
                                            {doctor.verificationStatus !== "rejected" && (
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="danger"
                                                    isLoading={loading === doctor._id + "_reject"}
                                                    onPress={() => handleVerify(doctor._id, "reject")}
                                                    isIconOnly
                                                >
                                                    <Xmark className="size-3.5" />
                                                </Button>
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
