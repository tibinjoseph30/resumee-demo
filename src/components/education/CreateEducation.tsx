import { useState } from "react";
import DatePicker from "react-datepicker";

type EducationCreateProps = {
    onCancel: () => void;
};

const CreateEducation: React.FC<EducationCreateProps> = ({ onCancel }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Create new education</div>
                <div className="text-slate-400 mt-1">Fill up the details below</div>
            </div>
            <div className="grid grid-cols-2 gap-7">
                <div className="form-group col-span-2">
                    <label htmlFor="" className="control-label">Degree</label>
                    <input type="text" placeholder="eg: bachelor of physics" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Institution name</label>
                    <input type="text" placeholder="eg: st. alberts college" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">University</label>
                    <input type="text" placeholder="eg: oxford" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">City</label>
                    <input type="text" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">State</label>
                    <input type="text" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Start date</label>
                    <DatePicker
                        className="control border-2 p-4 rounded-md"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        dropdownMode="select"
                        withPortal
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">End date</label>
                    <input type="text" className="control border-2 p-4 rounded-md" />
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-10">
                <button type="button" className="bg-gray-400 text-white p-3 rounded-md min-w-32 font-medium hover:opacity-90" onClick={onCancel}>Cancel</button>
                <button type="submit" className="bg-primary p-3 rounded-md text-white min-w-32 font-medium hover:opacity-90">Save</button>
            </div>
        </div>
    )
}

export default CreateEducation