import Select from 'react-select';

const CountryOfOrigin = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Whre are you from?</div>
                <div className="text-slate-400 mt-1">Select your country of origin here</div>
            </div>
            <div className="grid grid-cols-2 gap-7">
                <div className="form-group">
                    <label htmlFor="" className="control-label">Origin</label>
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

export default CountryOfOrigin