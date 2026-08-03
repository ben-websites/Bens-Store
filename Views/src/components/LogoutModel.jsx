import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function LogoutModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Logout",
    message = "Are you sure you want to logout?",
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                <h2 className="text-2xl font-bold text-slate-900">
                    {title}
                </h2>

                <p className="mt-3 text-slate-600">
                    {message}
                </p>

                <div className="mt-8 flex gap-4">

                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-blue-500 bg-white py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

export default LogoutModal;