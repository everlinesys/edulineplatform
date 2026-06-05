import { useEffect, useState } from "react";
import api from "../../shared/api";

export default function AdminEduline() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [customDomain, setCustomDomain] = useState("");
    const [isSavingDomain, setIsSavingDomain] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const res = await api.get("/admin/eduline");
            setData(res.data);
            if (res.data?.academy?.customDomain) {
                setCustomDomain(res.data.academy.customDomain);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleSaveDomain = async (e) => {
        e.preventDefault();
        setIsSavingDomain(true);
        try {
            // Replace with your exact custom domain backend endpoint
            await api.post("/admin/eduline/domain", { domain: customDomain });
            alert("Custom domain updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update domain. Please try again.");
        } finally {
            setIsSavingDomain(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-gray-500">Loading settings...</p>
                </div>
            </div>
        );
    }

    const subscription = data?.subscription || {};
    const usage = data?.usage || {};
    const billingHistory = data?.billingHistory || [];
    const academy = data?.academy || {};

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto space-y-8">



                {/* TOP ROW: SUBSCRIPTION & UPGRADE BANNER */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* PLAN DETAILS */}
                    <div className="lg:col-span-2 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-lg text-gray-900">Subscription Status</h2>
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${subscription.status?.toLowerCase() === 'active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                    }`}>
                                    {subscription.status || "Active"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <InfoCard label="Current Plan" value={subscription.plan || "Starter"} />
                                <InfoCard
                                    label="Next Payment"
                                    value={subscription.nextPayment ? new Date(subscription.nextPayment).toLocaleDateString() : "-"}
                                />
                                <InfoCard label="Base Amount" value={`₹${subscription.amount || 499}`} />
                                <InfoCard label="Billing Interval" value={subscription.interval || "Monthly"} />
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-xl transition-colors shadow-sm">
                                Manage Subscription
                            </button>
                        </div>
                    </div>

                    {/* UPGRADE PROMO BANNER */}
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between border border-slate-800">
                        <div>
                            <span className="bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                Pro Feature
                            </span>
                            <h2 className="text-xl font-bold mt-3">Upgrade to Eduline Pro</h2>
                            <p className="text-slate-300 text-sm mt-1.5 leading-relaxed">
                                Unlock advanced automation tools, certificates, and live integrations.
                            </p>
                            <ul className="mt-4 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-300">
                                <li className="flex items-center gap-1.5">✓ Unlimited Courses</li>
                                <li className="flex items-center gap-1.5">✓ Live Classes</li>
                                <li className="flex items-center gap-1.5">✓ Certificates</li>
                                <li className="flex items-center gap-1.5">✓ Priority Help</li>
                            </ul>
                        </div>
                        <button className="mt-5 w-full py-2.5 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm rounded-xl transition-colors shadow-sm text-center">
                            Upgrade Plan
                        </button>
                    </div>
                </div>

                {/* CUSTOM DOMAIN CONFIGURATION */}
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-gray-100 gap-2">
                        <div>
                            <h2 className="font-semibold text-lg text-gray-900">Custom Domain Settings</h2>
                            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                                Brand your academy platform URL by routing a personalized web domain.
                            </p>
                        </div>
                        {academy.customDomain && (
                            <span className="self-start md:self-center px-2.5 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                Connected
                            </span>
                        )}
                    </div>

                    <form onSubmit={handleSaveDomain} className="space-y-4 max-w-2xl">
                        <div>
                            <label htmlFor="domain" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                                Domain Name
                            </label>
                            <div className="flex gap-2 max-w-md">
                                <div className="relative flex-grow">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm select-none">
                                        https://
                                    </span>
                                    <input
                                        type="text"
                                        id="domain"
                                        placeholder="academy.yourdomain.com"
                                        value={customDomain}
                                        onChange={(e) => setCustomDomain(e.target.value.replace(/\s+/g, ""))}
                                        className="w-full pl-16 pr-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-900"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSavingDomain}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors disabled:opacity-50 shadow-sm shrink-0"
                                >
                                    {isSavingDomain ? "Saving..." : "Link Domain"}
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600 space-y-2">
                            <p className="font-semibold text-gray-700">⚠️ DNS Setup Instructions:</p>
                            <p>To finalize integration point your domain provider DNS parameters to the following destination:</p>
                            <div className="grid grid-cols-3 max-w-sm gap-2 pt-1 font-mono text-[11px]">
                                <span className="text-gray-400 font-sans">Type:</span> <span className="font-semibold col-span-2">CNAME</span>
                                <span className="text-gray-400 font-sans">Host:</span> <span className="font-semibold col-span-2">@ (or subdomain)</span>
                                <span className="text-gray-400 font-sans">Value:</span> <span className="font-semibold col-span-2 text-blue-600">domains.eduline.com</span>
                            </div>
                        </div>
                    </form>
                </div>

                {/* METRICS & RESOURCES USAGE */}
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-semibold text-lg text-gray-900 mb-5">Resource Utilization</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InfoCard label="Active Courses" value={usage.courses ?? 0} />
                        <InfoCard label="Total Students" value={usage.students ?? 0} />
                        <InfoCard label="Cloud Storage" value={`${usage.storageGb ?? 0} GB`} />
                        <InfoCard label="Video Streaming" value={`${usage.videoHours ?? 0} hrs`} />
                    </div>
                </div>

                {/* METADATA PLATFORM PROFILE */}
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-semibold text-lg text-gray-900 mb-5">Academy Profile Metadata</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <InfoCard label="Academy Name" value={academy.name || "-"} />
                        <InfoCard label="Default Subdomain" value={academy.domain || "-"} />
                        <InfoCard label="Tenant Reference ID" value={academy.id || "-"} hideOverflow />
                        <InfoCard
                            label="Account Created"
                            value={academy.createdAt ? new Date(academy.createdAt).toLocaleDateString() : "-"}
                        />
                    </div>
                </div>

                {/* BILLING INVOICES */}
                <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-semibold text-lg text-gray-900 mb-4">Billing Invoices</h2>
                    {billingHistory.length === 0 ? (
                        <div className="text-gray-400 text-sm py-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
                            <p>No historical transactions recorded.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-6 py-3.5 font-semibold">Statement Date</th>
                                        <th scope="col" className="px-6 py-3.5 font-semibold">Amount Billed</th>
                                        <th scope="col" className="px-6 py-3.5 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {billingHistory.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700">₹{item.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-100">
                                                    {item.status || "Paid"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

function InfoCard({ label, value, hideOverflow = false }) {
    return (
        <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
            <p className={`text-base font-bold text-gray-800 mt-2 ${hideOverflow ? 'truncate font-mono text-sm' : ''}`} title={String(value)}>
                {value}
            </p>
        </div>
    );
}