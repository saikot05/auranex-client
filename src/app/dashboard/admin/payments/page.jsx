"use client";

import { useState, useEffect } from "react";
import { Table, Chip, Input, Pagination } from "@heroui/react";
import { CreditCard } from "@gravity-ui/icons";
import { getAdminPayments } from "@/lib/api/admin";

const statusColor = {
    paid: "success",
    pending: "warning",
    failed: "danger",
};

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await getAdminPayments({ page, limit: 10 });
            if (res.success) {
                setPayments(res.payments);
                setTotalPages(res.totalPages);
                setTotal(res.total);
            }
            setLoading(false);
        })();
    }, [page]);

    const filtered = payments.filter((p) =>
        p.patientEmail?.toLowerCase().includes(search.toLowerCase()) ||
        p.transactionId?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Payment Records</h1>
                    <p className="text-sm text-default-500 mt-0.5">{total} total transactions</p>
                </div>
                <Input
                    placeholder="Search by email or transaction ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startContent={<CreditCard className="size-4 text-default-400" />}
                    className="w-72"
                    size="sm"
                    variant="bordered"
                />
            </div>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Payments table">
                        <Table.Header>
                            <Table.Column isRowHeader>TRANSACTION ID</Table.Column>
                            <Table.Column>PATIENT</Table.Column>
                            <Table.Column>DOCTOR</Table.Column>
                            <Table.Column>AMOUNT</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>DATE</Table.Column>
                        </Table.Header>
                        <Table.Body
                            isLoading={loading}
                            renderEmptyState={() => (
                                <p className="text-center text-sm text-default-400 py-6">No payment records found.</p>
                            )}
                        >
                            {filtered.map((payment) => (
                                <Table.Row key={payment._id} id={payment._id}>
                                    <Table.Cell>
                                        <span className="text-xs font-mono text-default-600">
                                            {payment.transactionId || "—"}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-700">{payment.patientEmail || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-700">{payment.doctorEmail || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm font-semibold text-foreground">
                                            ৳{payment.amount?.toLocaleString() || 0}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={statusColor[payment.paymentStatus] || "default"}
                                            className="capitalize"
                                        >
                                            {payment.paymentStatus || "paid"}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-500">
                                            {payment.paymentDate
                                                ? new Date(payment.paymentDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit", month: "short", year: "numeric",
                                                })
                                                : "—"}
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            {totalPages > 1 && (
                <div className="flex justify-center pt-2">
                    <Pagination
                        total={totalPages}
                        page={page}
                        onChange={setPage}
                        color="primary"
                        size="sm"
                    />
                </div>
            )}
        </div>
    );
}
