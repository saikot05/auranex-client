"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { getPaymentHistory } from "@/lib/api/appointments";
import { Table, Chip, Spinner } from "@heroui/react";

export default function PaymentHistoryPage() {
    const { data: session, isPending } = useSession();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            if (isPending) return;

            if (session?.user?.email) {
                setLoading(true);
                const data = await getPaymentHistory(session.user.email);
                if (data.success) {
                    setPayments(data.payments);
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [session, isPending]);

    if (loading || isPending) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-200">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Payment History</h1>
                <p className="text-sm text-muted-foreground">Track your paid appointments and digital transaction records.</p>
            </div>

            <Table aria-label="Payment history table">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Payments data" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>DOCTOR</Table.Column>
                            <Table.Column>TRANSACTION ID</Table.Column>
                            <Table.Column>DATE</Table.Column>
                            <Table.Column>AMOUNT</Table.Column>
                            <Table.Column align="center">STATUS</Table.Column>
                        </Table.Header>
                        <Table.Body emptyContent={"No payment records found."}>
                            {payments.map((pay) => (
                                <Table.Row key={pay._id || pay.id}>
                                    <Table.Cell>
                                        <div>
                                            <p className="font-semibold text-sm">{pay.doctorName}</p>
                                            <p className="text-xs text-muted-foreground">{pay.specialty}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <code className="text-xs bg-muted p-1 rounded font-mono text-primary">
                                            {pay.transactionId}
                                        </code>
                                    </Table.Cell>
                                    <Table.Cell className="text-sm text-default-600">{pay.date}</Table.Cell>
                                    <Table.Cell className="font-semibold text-sm">${pay.fee}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex justify-center">
                                            <Chip color="success" variant="flat" size="sm" radius="sm">
                                                Paid
                                            </Chip>
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