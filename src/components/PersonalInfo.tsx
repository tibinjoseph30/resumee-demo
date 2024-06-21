import Select from 'react-select';
import 'react-phone-number-input/style.css'
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input/input';

const PersonalInfo = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const [value, setValue] = useState()

    return (
        <div>
            <div className="mb-8">
                <div className="text-2xl font-semibold">Personal informations</div>
                <div className="text-slate-400 mt-1">Fill up the details below</div>
            </div>
            <div className="grid grid-cols-2 gap-7">
                <div className="form-group col-end-2">
                    <label htmlFor="" className="control-label">First name</label>
                    <input type="text" placeholder="Name" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Last name</label>
                    <input type="text" placeholder="Surname" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Designation</label>
                    <input type="text" placeholder="eg: ui developer" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Mobile number</label>
                    <PhoneInput
                        placeholder="eg: +91 xxxxxxxx"
                        value="+91"
                        className="border-2 p-4 rounded-md control"
                        onChange={() => setValue}
                    />
                    {/* <input type="text" className="control border-2 p-4 rounded-md" /> */}
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
                    <input type="text" placeholder="eg: 102 skyline" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">Street / Road / Village</label>
                    <input type="text" placeholder="eg: new castle road" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">City</label>
                    <input type="text" placeholder="" className="control border-2 p-4 rounded-md" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="control-label">State</label>
                    <Select
                        options={options}
                        classNames={{
                            control: () => 'control-select'
                        }}
                        classNamePrefix="react-select"
                    />
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