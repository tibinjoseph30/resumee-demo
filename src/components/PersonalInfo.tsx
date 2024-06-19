const PersonalInfo = () => {
    return (
        <div>
            <div className="text-2xl font-semibold">Personal informations.</div>
            <div className="text-slate-400 mb-8">Fill up the details below</div>
            <div className="grid grid-cols-2 gap-7">
                <div className="form-group">
                    <label htmlFor="" className="control-label">First name</label>
                    <input type="text" placeholder="Name" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Last name</label>
                    <input type="text" placeholder="Surname" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Designation</label>
                    <input type="text" placeholder="eg: Ui developer" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Mobile number</label>
                    <input type="text" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group col-span-2">
                    <label htmlFor="" className="control-label">Email</label>
                    <input type="text" placeholder="eg: johndoe@gmail.com" className="control border-2 p-4 rounded-md" />
                </div>
            </div>
            <div className="mt-10 mb-5">
                <div className="text-xl font-semibold">Address</div>
            </div>
            <div className="grid grid-cols-2 gap-7">
                <div className="form-group">
                    <label htmlFor="" className="control-label">House / Flat / Villa</label>
                    <input type="text" placeholder="Name" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Street / Road / Village</label>
                    <input type="text" placeholder="Surname" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">District</label>
                    <input type="text" placeholder="" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">State</label>
                    <input type="text" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Country</label>
                    <input type="text" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Pin code</label>
                    <input type="text" className="control border-2 p-4 rounded-md" />
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo