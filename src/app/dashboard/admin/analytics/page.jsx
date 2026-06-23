"use client";

import { useState, useEffect } from "react";
import { Card, Spinner } from "@heroui/react";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { getAdminStats, getDoctorPerformance } from "@/lib/api/admin";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export default function AdminAnalyticsPage() {
    const [stats, setStats] = useState(null);
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const [statsRes, perfRes] = await Promise.all([
                getAdminStats(),
                getDoctorPerformance(),
            ]);
            if (statsRes.success) setStats(statsRes.stats);
            if (perfRes.success) setPerformance(perfRes.data);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Spinner size="lg" label="Loading analytics..." color="primary" />
            </div>
        );
    }

    const overviewData = [
        { name: "Doctors", value: stats?.totalDoctors ?? 0 },
        { name: "Patients", value: stats?.totalPatients ?? 0 },
        { name: "Appointments", value: stats?.totalAppointments ?? 0 },
        { name: "Reviews", value: stats?.totalReviews ?? 0 },
        { name: "Payments", value: stats?.totalPayments ?? 0 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
                <p className="text-sm text-default-500 mt-0.5">Platform performance overview</p>
            </div>

            {/* stat summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {overviewData.map((item) => (
                    <Card key={item.name} shadow="sm" className="border border-default-100">
                        <div className="p-4 text-center">
                            <p className="text-2xl font-bold text-foreground">{item.value}</p>
                            <p className="text-xs text-default-500 mt-1">{item.name}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* platform overview bar chart */}
            <Card shadow="sm" className="border border-default-100">
                <div className="p-6">
                    <h2 className="text-base font-semibold text-foreground mb-6">Platform Overview</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={overviewData} barSize={48}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--heroui-default-200)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: "var(--heroui-default-500)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: "var(--heroui-default-500)" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "1px solid var(--heroui-default-200)",
                                    fontSize: "13px",
                                }}
                            />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {overviewData.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* doctor performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card shadow="sm" className="border border-default-100">
                    <div className="p-6">
                        <h2 className="text-base font-semibold text-foreground mb-6">Doctor Ratings</h2>
                        {performance.length === 0 ? (
                            <p className="text-sm text-default-400 text-center py-10">No review data yet.</p>
                        ) : (
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart
                                    data={performance}
                                    layout="vertical"
                                    barSize={20}
                                    margin={{ left: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--heroui-default-200)" />
                                    <XAxis
                                        type="number"
                                        domain={[0, 5]}
                                        tick={{ fontSize: 11, fill: "var(--heroui-default-500)" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        tick={{ fontSize: 11, fill: "var(--heroui-default-500)" }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={100}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid var(--heroui-default-200)",
                                            fontSize: "13px",
                                        }}
                                    />
                                    <Bar dataKey="avgRating" name="Avg Rating" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </Card>

                <Card shadow="sm" className="border border-default-100">
                    <div className="p-6">
                        <h2 className="text-base font-semibold text-foreground mb-6">Reviews Distribution</h2>
                        {performance.length === 0 ? (
                            <p className="text-sm text-default-400 text-center py-10">No review data yet.</p>
                        ) : (
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={performance}
                                        dataKey="totalReviews"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, percent }) =>
                                            `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                                        }
                                        labelLine={false}
                                    >
                                        {performance.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid var(--heroui-default-200)",
                                            fontSize: "13px",
                                        }}
                                    />
                                    <Legend
                                        iconType="circle"
                                        iconSize={8}
                                        wrapperStyle={{ fontSize: "12px" }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </Card>
            </div>

            {/* total revenue */}
            <Card shadow="sm" className="border border-default-100">
                <div className="p-6 flex flex-row items-center justify-between">
                    <div>
                        <p className="text-sm text-default-500">Total Revenue</p>
                        <p className="text-3xl font-bold text-foreground mt-1">
                            ৳{stats?.totalRevenue?.toLocaleString() ?? 0}
                        </p>
                    </div>
                    <div className="text-xs text-default-400">
                        from {stats?.totalPayments ?? 0} transactions
                    </div>
                </div>
            </Card>
        </div>
    );
}