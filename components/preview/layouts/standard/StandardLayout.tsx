const StandardLayout = () => {
    return (
        <div>
            <div className="text-3xl font-medium text-center mb-4">John Doe</div>
            <div className="mb-3">
                <div className="flex items-center justify-center gap-2 text-sm">
                    <div>7569856321</div>
                    <div>|</div>
                    <div>jd@yopmail.com</div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                    <div><a href=""><u>github.com/johndoe1</u></a></div>
                    <div>|</div>
                    <div><a href=""><u>linkedin.com/in/johndoe.com</u></a></div>
                </div>
            </div>
            <div className="grid gap-5">
                <div>
                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Skills</div>
                    <div className="text-sm"><b>Languages:</b> C/C++, Java, Python, JavaScript, TypeScript, SQL</div>
                    <div className="text-sm"><b>Technologies & Tools:</b> AWS, EC2, DynamoDB, S3, SQS, Lambda, Athena, Elasticsearch, Spark, Hive, Presto, Docker, Splunk, Kafka, Spring, Angular, ReactJS</div>
                </div>
                <div>
                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Work Experience</div>
                    <div className="grid gap-3">
                        <div className="grid gap-1">
                            <div className="flex justify-between items-center text-sm">
                                <div><b>Adobe, Bangalore</b></div>
                                <div>Mar 2021 - Present</div>
                            </div>
                            <div className="text-sm font-semibold"><i>Comuter Scientist</i></div>
                            <ul className="text-sm list-disc ps-9">
                                <li>Led the migration of Hive and Presto jobs from Qubole to AWS EMR, enhancing availability and significantly reducing
                                    operational costs.</li>
                                <li>Reduced the cost involved in running custom reports service by more than 80% by devising an automated system that
                                    identified and disabled reports with no usage or empty data.
                                </li>
                                <li>Led a cost-saving initiative by identifying unused AWS resources and establishing S3 bucket expiration policies, leading
                                    to an annual cost reduction exceeding $50,000 in AWS expenditures.</li>
                            </ul>
                        </div>
                        <div className="grid gap-1">
                            <div className="flex justify-between items-center text-sm">
                                <div><b>Amazone, Bangalore</b></div>
                                <div>Sep 2019 - Mar 2021</div>
                            </div>
                            <div className="text-sm font-semibold"><i>Software Development Engineer</i></div>
                            <ul className="text-sm list-disc ps-9">
                                <li>Led the migration of Hive and Presto jobs from Qubole to AWS EMR, enhancing availability and significantly reducing
                                    operational costs.</li>
                                <li>Reduced the cost involved in running custom reports service by more than 80% by devising an automated system that
                                    identified and disabled reports with no usage or empty data.
                                </li>
                                <li>Led a cost-saving initiative by identifying unused AWS resources and establishing S3 bucket expiration policies, leading
                                    to an annual cost reduction exceeding $50,000 in AWS expenditures.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Education</div>
                    <div className="grid gap-2">
                        <div>
                            <div className="flex justify-between items-center text-sm">
                                <div><b>BITS Hyderabad </b></div>
                                <div>Aug 2013 - Jun 2017</div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div>B.E. in Computer Science and Engineering </div>
                                <div className="font-semibold">CGPA: 7.96/10</div>
                            </div>
                        </div>
                        <div className="text-sm">Relevant Coursework: Object Oriented Programming, Databases, Discrete Maths, Data Structures and Algorithms, Operating Systems, Computer Networks, Machine Learning, Data Mining, Advance Data Structures and Algorithms, Information
                            Retrieval, Image Processing</div>
                    </div>
                </div>
                <div>
                    <div className="text-xl font-medium border-b border-slate-500 mb-2">Projects</div>
                    <ul className="text-sm list-disc ps-9">
                        <li><b>Word Lookup Dictionary (2015):</b> Developed a desktop software for online lookup of English words. Implemented
                            efficient search of valid words using Trie data structure. Implemented spelling correction and auto-suggestion using
                            edit distance algorithm. Used web scraping to get the data for online lookup. Python, BeautifulSoup.</li>
                        <li><b>Alternative-Routes in Road Networks (2016):</b> Applied Dijkstra’s shortest path algorithm to find the route which takes
                            the shortest time to travel from source to destination in a given road network with randomly generated traffic. Implemented methods to avoid collisions between vehicles by dynamically changing their speeds. Used C++ and OpenGL
                            library for simulation. C++, OpenGL
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default StandardLayout