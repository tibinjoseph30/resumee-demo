import { useState } from 'react';
import { HiMiniPlus } from "react-icons/hi2";
import CreateEducation from './CreateEducation';

const Education = () => {
    const [showCreate, setShowCreate] = useState(false);

    const handleButtonClick = () => {
        setShowCreate(true);
    };

    const handleCancel = () => {
        setShowCreate(false);
    };

    return (
        <div>
            {!showCreate ? (
                <div>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold">Educational Informations</div>
                        <div className="text-slate-400 mt-1">List out your education details here</div>
                    </div>
                    <button 
                        className="bg-primary rounded-md text-white p-3 min-w-44 font-medium hover:opacity-90"
                        onClick={handleButtonClick}
                    >
                        <span className="inline-flex items-center gap-1">
                            <HiMiniPlus size={20} />
                            Create New
                        </span>
                    </button>
                </div>
            ) : (
                <CreateEducation onCancel={handleCancel} />
            )}
        </div>
    );
};

export default Education;
