import Select from 'react-select';

type SkillCreateProps = {
    onCancel: () => void;
};

const CreateSkill: React.FC<SkillCreateProps> = ({ onCancel }) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Create new skill</div>
                <div className="text-slate-400 mt-1">Add your skills here</div>
            </div>
            <div className="grid grid-cols-2 gap-7">
                <div className="form-group col-span-2">
                    <label htmlFor="" className="control-label">Skill</label>
                    <input type="text" placeholder="eg: javascript" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Category name</label>
                    <input type="text" placeholder="eg: languages" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Proficiency</label>
                    <Select
                        options={options}
                        classNames={{
                            control: () => 'control-select'
                        }}
                        classNamePrefix="react-select"
                    />
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-10">
                <button type="button" className="bg-gray-400 text-white p-3 rounded-md min-w-32 font-medium hover:opacity-90" onClick={onCancel}>Cancel</button>
                <button type="submit" className="bg-primary p-3 rounded-md text-white min-w-32 font-medium hover:opacity-90">Save</button>
            </div>
        </div>
    )
}

export default CreateSkill