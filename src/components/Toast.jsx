import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
        error: <ExclamationCircleIcon className="w-6 h-6 text-red-500" />,
        info: <InformationCircleIcon className="w-6 h-6 text-blue-500" />,
    };

    const bgColors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        info: 'bg-blue-50 border-blue-200',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center min-w-[300px] p-4 rounded-xl shadow-lg border ${bgColors[type]}`}
        >
            <div className="flex-shrink-0 mr-3">{icons[type]}</div>
            <div className="flex-1 text-gray-800 font-medium">{message}</div>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600 transition">
                <XMarkIcon className="w-5 h-5" />
            </button>
        </motion.div>
    );
};

export default Toast;
