"use client"

import { HiMiniPlus } from "react-icons/hi2";
import StepperLayout from '../shared/StepperLayout';
import StepperControlsLayout from '../shared/StepperControlsLayout';
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "../../services/firebase.config";
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors";
import { EducationForm } from "../../interfaces/formInterfaces";
import Spinner from "../shared/ui/loader/Spinner";
import { format } from 'date-fns';
import ConfirmationModal from "../shared/ui/confirmation/Confirmation";

const Education = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [educationData, setEducationData] = useState<EducationForm[]>([])
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string>();

    const user = auth.currentUser

    const formatDate = (timestamp: any) => {
        return timestamp ? format(new Date(timestamp.seconds * 1000), 'dd/MM/yyyy') : 'N/A';
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log('No authenticated user found.');
                return;
            }

            try {
                setPageLoading(true)
                const educationCollectionRef = collection(firestore, 'education');
                const docSnap = await getDocs(query(educationCollectionRef, where("userId", "==", user.uid)));

                if (!docSnap.empty) {
                    const data: EducationForm[] = docSnap.docs.map(doc => ({
                        ...(doc.data() as EducationForm),
                        id: doc.id
                    }))
                    console.log('Documents data:', data);
                    setEducationData(data);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                const errorMessage = handleFirebaseError(error as FirebaseError)
                console.log(errorMessage)
            } finally {
                setPageLoading(false)
            }
        }
        fetchData()
    }, [user])

    const handleDelete = async (id: any) => {
        setDeletingId(id);
        setModalOpen(true);
    };

    const confirmDelete = async () => {
        setLoading(true)
        if (deletingId) {
            try {
                await deleteDoc(doc(firestore, 'education', deletingId));
                setEducationData(educationData.filter(data => data.id !== deletingId));
            } catch (error) {
                console.log('Error deleting document:', error);
                alert('Failed to delete the record');
            } finally {
                setDeletingId(undefined);
                setLoading(false)
                setModalOpen(false);
            }
        }
    };

    return (
        <div>
            <StepperLayout>
                <div>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold">Educational Informations</div>
                        <div className="text-slate-400 mt-1">List out your education details here</div>
                    </div>
                    <Link href="/resume/education/new">
                        <button
                            className="bg-primary rounded-md text-white p-3 min-w-44 font-medium hover:opacity-90">
                            <span className="inline-flex items-center gap-1">
                                <HiMiniPlus size={20} />
                                Create New
                            </span>
                        </button>
                    </Link>
                </div>
                {pageLoading ?
                    (<div className="mt-12">
                        <Spinner size={32} />
                    </div>) :
                    (<>{educationData.length > 0 ?
                        <div className="grid xl:grid-cols-2 gap-5 mt-12">
                            {educationData.map((data, index) => (
                                <div key={index} className="flex flex-col bg-white rounded-lg border">
                                    <div className="grid px-6 py-4 gap-2 border-b">
                                        <div className="flex flex-wrap items-center justify-between gap-1">
                                            <div>
                                                <div className="font-semibold">{data.courseName}</div>
                                                <div className="text-sm text-slate-500">{data.university}</div>
                                            </div>
                                            {(data.marksInGpa !== "" || data.marksInCgpa !== "" || data.marksInPer !== "") && (
                                                <div className="text-xs text-amber-800 px-3 py-1 rounded-full bg-amber-100 whitespace-nowrap">
                                                    {data.marksIn}: <b>{data.marksIn === "GPA" ? data.marksInGpa : data.marksIn === "CGPA" ? data.marksInCgpa : data.marksInPer}</b>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="grid gap-4 p-6">
                                            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-5">
                                                <div>
                                                    <div className="text-sm text-slate-500">Join Date</div>
                                                    <div className="text-sm">{formatDate(data.joinDate)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-slate-500">Relieve Date</div>
                                                    <div className="text-sm">{formatDate(data.relieveDate)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-slate-500">Intitution</div>
                                                    <div className="text-sm">{data.institution}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-slate-500">Location</div>
                                                    <div className="text-sm">{data.city}, {data.state}, {data.country}</div>
                                                </div>
                                            </div>
                                            <div className="grid gap-2 text-sm">
                                                {data.coreSubjects.length > 0 && (
                                                    <div><u className="font-medium">Core Subjects:</u> {data.coreSubjects.join(', ')}</div>
                                                )}
                                                {data.complimentarySubjects.length > 0 && (
                                                    <div><u className="font-medium">Complimentary Subjects:</u> {data.complimentarySubjects.join(', ')}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 px-6 py-4 border-t">
                                        <Link href={`/resume/education/edit/${data.id}`}>
                                            <button type="button" className="text-blue-500 p-2 text-sm uppercase font-semibold">Edit</button>
                                        </Link>
                                        <button onClick={() => handleDelete(data.id)} type="button" className="p-2 text-sm uppercase text-red-500 font-semibold">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <div className="mt-12 text-slate-500">Add atleast one educational qualification and continue.</div>
                    }</>
                    )}

            </StepperLayout>
            <StepperControlsLayout currentStep={2} totalSteps={8} showBackButton={true} disableBackButton={false}>
                <Link href="/resume/certification">
                    <button
                        type="button"
                        className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                        disabled={educationData.length <= 0}
                    >Continue</button>
                </Link>
            </StepperControlsLayout>
            <ConfirmationModal
                isOpen={modalOpen}
                loading={loading}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this record?"
            />
        </div>
    );
};

export default Education;
