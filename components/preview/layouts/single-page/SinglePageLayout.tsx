const SinglePageLayout = () => {
    return (
        <div>
            <div className="text-4xl font-bold uppercase">John Doe</div>
            <div className="text-sm text-slate-800">Frontend Developer</div>
            <div className="grid grid-cols-2 mt-3 border-b pb-4">
                <div>
                    <div className="text-sm text-slate-800">Mob: +8936545254</div>
                    <div className="text-sm text-slate-800">Email: johndoe@yopmail.com</div>
                </div>
                <div className="text-end">
                    <div className="text-sm text-slate-800">https://github.com/jd/123</div>
                    <div className="text-sm text-slate-800">https://linkedin.com/johndoe/profile</div>
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div className="pe-4 pt-4">
                    <div className="grid gap-8">
                        <div>
                            <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Skills</div>
                            <div className="grid gap-2">
                                <div>
                                    <div className="text-sm text-slate-800">Languages:</div>
                                    <div className="text-sm font-semibold">HTML, CSS, Javascript</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-800">Technologies & Tools:</div>
                                    <div className="text-sm font-semibold">React Js, Firebase, Tailwind, Bootstrap, Git, Adobe Photoshop, Figma, Adobe Illustator</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Education</div>
                            <div className="grid gap-2">
                                <div>
                                    <div className="text-sm font-semibold">Bachelor of Physics</div>
                                    <div className="text-sm text-slate-800">Mahatma Gandhi University, kerala</div>
                                    <div className="text-xs mt-1 text-slate-800">Jul 2009 - Apr 2012</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Certification</div>
                            <div className="grid gap-2">
                                <div>
                                    <div className="text-sm font-semibold">Web Graphics Pro</div>
                                    <div className="text-sm text-slate-800">Faith Infotech, Kerala</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 border-s ps-4 pt-4">
                    <div>
                        <div className="text-sm font-semibold uppercase text-gray-400 mb-2">Work Experience</div>
                        <div className="grid gap-8">
                            <div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold">Microsoft, Kochi</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                                <div className="text-sm text-slate-800">UI Developer</div>
                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-800">
                                    <li>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</li>
                                    <li>Collaborate with UI/UX designers to translate wireframes, mockups, and prototypes into high-quality code.</li>
                                    <li>Build reusable code and libraries for future use, ensuring efficient and clean code.</li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold">Microsoft</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                                <div className="text-sm text-slate-800">UI Developer</div>
                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-800">
                                    <li>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</li>
                                    <li>Collaborate with UI/UX designers to translate wireframes, mockups, and prototypes into high-quality code.</li>
                                    <li>Build reusable code and libraries for future use, ensuring efficient and clean code.</li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-semibold">Microsoft</div>
                                    <div className="text-xs mt-1 text-slate-800">Apr 2014 - Apr 2015</div>
                                </div>
                                <div className="text-sm text-slate-800">UI Developer</div>
                                <ul className="text-sm list-disc ps-9 mt-2 text-slate-800">
                                    <li>Develop, maintain, and optimize web applications using HTML, CSS, Javascript, Sass, jQuery</li>
                                    <li>Collaborate with UI/UX designers to translate wireframes, mockups, and prototypes into high-quality code.</li>
                                    <li>Build reusable code and libraries for future use, ensuring efficient and clean code.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePageLayout