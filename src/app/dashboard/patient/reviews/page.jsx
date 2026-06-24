"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { getMyReviews } from "@/lib/api/reviews";
import { deleteReview } from "@/lib/actions/reviews";
import { Table, Button, Spinner, Chip } from "@heroui/react";

export default function MyReviewsPage() {
    const { data: session, isPending } = useSession();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (isPending) return;

            if (session?.user?.email) {
                setLoading(true);
                const data = await getMyReviews(session.user.email);
                if (data.success) {
                    setReviews(data.reviews);
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [session, isPending]);

    const handleDelete = async (id) => {
        const res = await deleteReview(id);
        if (res.success) {
            setReviews((prev) => prev.filter((rev) => rev._id !== id));
        }
    };

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
                <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>
                <p className="text-sm text-muted-foreground">Manage your feedback provided to doctors.</p>
            </div>

            <Table aria-label="My reviews table">
                <Table.ScrollContainer>
                    <Table.Content className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column>DOCTOR</Table.Column>
                            <Table.Column>RATING</Table.Column>
                            <Table.Column>REVIEW</Table.Column>
                            <Table.Column>DATE</Table.Column>
                            <Table.Column className="text-end">ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body renderEmptyState={() => <div className="p-4 text-center">No reviews found.</div>}>
                            {reviews.map((rev) => (
                                <Table.Row key={rev._id}>
                                    <Table.Cell className="font-semibold">{rev.doctorName}</Table.Cell>
                                    <Table.Cell>
                                        <Chip variant="soft" color="warning" size="sm">{rev.rating}</Chip>
                                    </Table.Cell>
                                    <Table.Cell className="max-w-[300px] truncate">{rev.comment}</Table.Cell>
                                    <Table.Cell>{new Date(rev.createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell className="text-end">
                                        <Button 
                                            size="sm" 
                                            variant="danger-soft" 
                                            onClick={() => handleDelete(rev._id)}
                                        >
                                            Delete
                                        </Button>
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
