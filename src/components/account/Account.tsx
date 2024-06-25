const Account = () => {

    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Connect accounts</div>
                <div className="text-slate-400 mt-1">Making you more prevalent</div>
            </div>
            <div className="grid grid-cols-2 gap-7">
                <div className="control-check">
                    <input type="checkbox" id="html" />
                    <label htmlFor="html" className="font-medium">Link your github account <span className="text-sm font-normal">(Preffered for IT jobs)</span></label>
                </div>
                <div className="form-group col-span-2">
                    <input type="text" placeholder="eg: UI developer" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="control-check">
                    <input type="checkbox" id="html2" />
                    <label htmlFor="html2" className="font-medium">Link your linkedin profile</label>
                </div>
                <div className="form-group col-span-2">
                    <input type="text" placeholder="eg: UI developer" className="control border-2 p-4 rounded-md" />
                </div>
            </div>
        </div>
    )
}

export default Account