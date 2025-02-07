import { FC } from 'react';
import Spinner from '../loader/Spinner';

interface ConfirmationModalProps {
    loading: boolean;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ loading, isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-20 p-3">
            <div className="bg-white p-8 rounded-xl xl:w-1/3">
                <div className="text-gray-700 font-semibold mb-6">{message}</div>
                <div className="flex flex-wrap justify-end gap-2">
                    <button
                        className="flex items-center justify-center gap-2 bg-red-500 rounded-md text-white px-8 py-3 font-medium hover:bg-red-600 w-full sm:w-auto"
                        onClick={onConfirm}
                    >
                        {loading ? <>Deleting data<Spinner size={18} color="#fff" /></> : <>Yes, Delete it</>}
                    </button>
                    <button
                        className="border border-slate-300 bg-slate-200 px-8 py-3 rounded-md font-medium w-full sm:w-auto hover:border-slate-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;