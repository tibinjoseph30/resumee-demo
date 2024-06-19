
const UserType = () => {

    return (
        <div>
            <div className="text-2xl font-semibold mb-8">Getting started with your experience.</div>
            <div className="grid grid-cols-2 gap-7">
                <div className="control-radio-container">
                    <input
                        type="radio"
                        name="user_type"
                        id="user_fresher"
                        defaultChecked
                    />
                    <label htmlFor="user_fresher" className="border-2 rounded-lg h-full">
                        <span className="text-lg font-semibold title">I am a Fresher</span>
                        <div className="mt-4 text-slate-500">If you are starting a new career or did'nt work anywhere yet! stay here</div>
                        <div className="text-sm mt-2">(Recommended for freshers)</div>
                    </label>
                </div>
                <div className="control-radio-container">
                    <input
                        type="radio"
                        name="user_type"
                        id="user_experienced"
                    />
                    <label htmlFor="user_experienced" className="border-2 rounded-lg h-full">
                        <span className="text-lg font-semibold title">I am an Expert <span className="bg-green-300/20 text-green-600 text-sm font-normal px-3 py-1 rounded-md ms-2">Most preffered</span></span>
                        <div className="mt-4 text-slate-500">If you have some experience in a field or looking for an upgrade! go with this</div>
                        <div className="text-sm mt-2">(Recommended for employees)</div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default UserType