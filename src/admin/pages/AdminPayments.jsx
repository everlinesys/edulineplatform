import { useEffect, useState } from "react";
import api from "../../shared/api";
// Note: Install lucide-react if you haven't already: npm install lucide-react
import { CreditCard, CheckCircle, Clock, RefreshCw, Save, Loader2 } from "lucide-react";

export default function AdminPayments() {
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [payments, setPayments] = useState([]);
    const [settings, setSettings] = useState({
        razorpayKeyId: "",
        razorpayKeySecret: "",
    });
    const [stats, setStats] = useState({
        revenue: 0,
        successful: 0,
        pending: 0,
        refunds: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setLoading(true);
            const [paymentsRes, settingsRes, dashboardRes] = await Promise.all([
                api.get("/admin/payments/all"),
                api.get("/admin/payments/payment-settings"),
                api.get("/adminDashboard/dashboard"),
            ]);

            const paymentsData = paymentsRes.data.payments || [];
            setPayments(paymentsData);

            setSettings(
                settingsRes.data.payment || {
                    razorpayKeyId: "",
                    razorpayKeySecret: "",
                }
            );
            console.log("Fetched payments:", settingsRes);
            setStats({
                revenue: dashboardRes.data?.revenue?.total || 0,
                successful: paymentsData.filter((p) => p.status === "paid" || p.status === "success").length,
                pending: paymentsData.filter((p) => p.status === "pending").length,
                refunds: paymentsData.filter((p) => p.status === "refunded").length,
            });
        } catch (err) {
            console.error("Payments dashboard data fetch failure:", err);
        } finally {
            setLoading(false);
        }
    }

    async function saveSettings() {
        try {
            setIsSaving(true);
            await api.put("/admin/payments/payment-settings", settings);
            alert("Razorpay API credentials updated successfully.");
        } catch (err) {
            console.error("Settings patch error:", err);
            alert("Failed to sync gateway adjustments. Check backend policies.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 text-gray-900 bg-gray-50/50 min-h-screen">
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-5 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payment Infrastructure</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitor incoming processing queues, issue payouts, and configure API gateway integration.
                    </p>
                </div>
            </div>

            {/* METRICS DISPLAYS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    title="Gross Revenue"
                    value={`₹${stats.revenue.toLocaleString("en-IN")}`}
                    icon={<CreditCard className="w-5 h-5 text-blue-600" />}
                    bgColor="bg-blue-50"
                    loading={loading}
                />
                <StatCard
                    title="Captured Settlements"
                    value={stats.successful}
                    icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
                    bgColor="bg-emerald-50"
                    loading={loading}
                />
                <StatCard
                    title="Outstanding Escrow"
                    value={stats.pending}
                    icon={<Clock className="w-5 h-5 text-amber-600" />}
                    bgColor="bg-amber-50"
                    loading={loading}
                />
                <StatCard
                    title="Reversed Debits"
                    value={stats.refunds}
                    icon={<RefreshCw className="w-5 h-5 text-rose-600" />}
                    bgColor="bg-rose-50"
                    loading={loading}
                />
            </div>

            {/* RAZORPAY CONFIGURATION FORM */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900">Razorpay API Authentication</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Configure secure communication webhooks between your product wrapper and the Razorpay payment infrastructure.
                    </p>
                </div>
                <div className="p-6 bg-gray-50/50 space-y-4">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Razorpay Key ID
                            </label>
                            <input
                                type="text"
                                value={settings.razorpayKeyId}
                                onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-mono focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition"
                                placeholder="rzp_live_xxxxxxxxxxxxxx"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Razorpay Secret Key
                            </label>
                            <input
                                type="password"
                                value={settings.razorpayKeySecret}
                                onChange={(e) => setSettings({ ...settings, razorpayKeySecret: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm font-mono focus:ring-2 focus:ring-black/5 focus:border-black outline-none transition"
                                placeholder="••••••••••••••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            onClick={saveSettings}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 transition"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Commit Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* PAYMENTS AUDIT TRAIL DATA TABLE */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">Transaction History Ledger</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Comprehensive chronological database of internal client actions.</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full self-start sm:self-center">
                        {payments.length} Settlements Registered
                    </span>
                </div>

                {loading ? (
                    <div className="p-12 space-y-4">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="flex gap-4 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        ))}
                    </div>
                ) : payments.length === 0 ? (
                    <div className="py-16 text-center text-sm text-gray-400">
                        No documented clearings found in historical data states.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 font-medium text-xs border-b border-gray-200 uppercase tracking-wider">
                                    <th className="p-4">Customer profile</th>
                                    <th className="p-4">Reference Product</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">State</th>
                                    <th className="p-4">Gateway Reference Token</th>
                                    <th className="p-4 text-right">Settlement Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {payments?.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-gray-50/70 transition">
                                        <td className="p-4 font-medium text-gray-900">
                                            {payment.studentName || payment.student?.name || "Anonymous Purchaser"}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {payment.courseTitle || payment.course?.title || "Legacy Product SKU"}
                                        </td>
                                        <td className="p-4 font-semibold text-gray-900">
                                            ₹{Number(payment.amount).toLocaleString("en-IN")}
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={payment.status} />
                                        </td>
                                        <td className="p-4 text-xs font-mono text-gray-500">
                                            {payment.razorpayPaymentId || <span className="text-gray-300 italic">Razorpay Token</span>}
                                        </td>
                                        <td className="p-4 text-right text-gray-500 text-xs">
                                            {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            }) : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, bgColor, loading }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start justify-between">
            <div className="space-y-1">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</p>
                {loading ? (
                    <div className="h-7 w-20 bg-gray-200 animate-pulse rounded mt-1" />
                ) : (
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">{value}</h3>
                )}
            </div>
            <div className={`p-2.5 rounded-lg ${bgColor}`}>
                {icon}
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const normalize = status?.toLowerCase() || "";

    const mapping = {
        paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200",
        pending: "bg-amber-50 text-amber-700 border-amber-200",
        refunded: "bg-blue-50 text-blue-700 border-blue-200",
        failed: "bg-rose-50 text-rose-700 border-rose-200",
    };

    const style = mapping[normalize] || "bg-gray-50 text-gray-600 border-gray-200";

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${style}`}>
            {normalize || "unknown"}
        </span>
    );
}