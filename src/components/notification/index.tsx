'use client';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { removeText } from "../../slices/notificationSlice";

const Notification = () => {
    const message = useAppSelector(state => state.notificationSlice.text);
    const [animation, setAnimation] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (message.length > 0) {
            setAnimation(true);

            timer = setTimeout(() => {
                setAnimation(false);
                dispatch(removeText());
            }, 2500);
        }

        return () => clearTimeout(timer);
    }, [message, dispatch]);

    return (
        <>
            {message.length > 0 && (
                <div
                    className={`fixed right-3 md:w-full max-w-xs p-2 text-gray-500 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-400 z-50 transition-all duration-1000  ${
                        animation ? 'top-20' : 'top-0'
                    }`}
                    role="alert"
                >
                    <div className="flex">
                        <div className="inline-flex items-center justify-center flex-shrink-0 md:w-8 w-6 md:h-8 h-6 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
                                />
                            </svg>
                            <span className="sr-only">Refresh icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">
                            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Update</span>
                            <div className="md:text-sm text-xs font-normal">{message}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notification;
