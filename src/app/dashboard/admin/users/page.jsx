"use client";

import { useState, useEffect } from "react";
import { Table, Avatar, Chip, Button, Input } from "@heroui/react";
import { Lock, Person, TrashBin } from "@gravity-ui/icons";

import { deleteUser, updateUserStatus } from "@/lib/actions/admin";
import { getAdminUsers } from "@/lib/api/admin";

const statusColor = {
    active: "success",
    suspended: "danger",
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await getAdminUsers();
            if (res.success) setUsers(res.users);
        })();
    }, []);

    const filtered = users.filter((u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id) => {
        setLoading(id + "_delete");
        const res = await deleteUser(id);
        if (res.success) {
            setUsers((prev) => prev.filter((u) => u._id !== id));
        }
        setLoading(null);
    };

    const handleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "suspended" ? "active" : "suspended";
        setLoading(id + "_status");
        const res = await updateUserStatus(id, newStatus);
        if (res.success) {
            setUsers((prev) =>
                prev.map((u) => u._id === id ? { ...u, status: newStatus } : u)
            );
        }
        setLoading(null);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
                    <p className="text-sm text-default-500 mt-0.5">{users.length} total users</p>
                </div>
                <Input
                    placeholder="Search by name or email..."
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
                    <Table.Content aria-label="Users table">
                        <Table.Header>
                            <Table.Column isRowHeader>USER</Table.Column>
                            <Table.Column>EMAIL</Table.Column>
                            <Table.Column>ROLE</Table.Column>
                            <Table.Column>PHONE</Table.Column>
                            <Table.Column>GENDER</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body
                            renderEmptyState={() => (
                                <p className="text-center text-sm text-default-400 py-6">No users found.</p>
                            )}
                        >
                            {filtered.map((user) => (
                                <Table.Row key={user._id} id={user._id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar size="sm">
                                                <Avatar.Image src={user.image || user.photo || user.photoURL} />
                                                <Avatar.Fallback>
                                                    {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </Avatar.Fallback>
                                            </Avatar>
                                            <span className="font-medium text-sm">{user.name}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">{user.email}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip size="sm" variant="flat" color="primary" className="capitalize">
                                            {user.role || "patient"}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">{user.phone || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600 capitalize">{user.gender || "—"}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            color={statusColor[user.status] || "default"}
                                            className="capitalize"
                                        >
                                            {user.status || "active"}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color={user.status === "suspended" ? "success" : "warning"}
                                                isLoading={loading === user._id + "_status"}
                                                onPress={() => handleStatus(user._id, user.status)}
                                                startContent={<Lock className="size-3.5" />}
                                            >
                                                {user.status === "suspended" ? "Activate" : "Suspend"}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="flat"
                                                color="danger"
                                                isLoading={loading === user._id + "_delete"}
                                                onPress={() => handleDelete(user._id)}
                                                isIconOnly
                                            >
                                                <TrashBin className="size-3.5" />
                                            </Button>
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
