import Select from 'react-select';

const Skills = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Skills.</div>
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
        </div>
    )
}

export default Skills