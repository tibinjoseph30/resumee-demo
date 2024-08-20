"use client"

import Link from "next/link"
import StepperLayout from "../shared/StepperLayout"
import { HiMiniPlus } from "react-icons/hi2"
import StepperControlsLayout from "../shared/StepperControlsLayout"
import { useEffect, useState } from "react"
import { CertificationForm } from "../../interfaces/formInterfaces"
import { auth, firestore } from "../../services/firebase.config"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors"
import Spinner from "../shared/ui/loader/Spinner"
import { format } from "date-fns"
import ConfirmationModal from "../shared/ui/confirmation/Confirmation"

const Certification = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [certificationData, setCertificationData] = useState<CertificationForm[]>([])
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
                const certificationCollectionRef = collection(firestore, 'certification');
                const docSnap = await getDocs(query(certificationCollectionRef, where("userId", "==", user.uid)));

                if (!docSnap.empty) {
                    const data: CertificationForm[] = docSnap.docs.map(doc => ({
                        ...(doc.data() as CertificationForm),
                        id: doc.id
                    }))
                    console.log('Documents data:', data);
                    setCertificationData(data);
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
                await deleteDoc(doc(firestore, 'certification', deletingId));
                setCertificationData(certificationData.filter(data => data.id !== deletingId));
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
                        <div className="text-2xl font-semibold">Certification Courses</div>
                        <div className="text-slate-400 mt-1">List out your course details here</div>
                    </div>
                    <Link href="/resume/certification/new">
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
                    <div className="grid grid-cols-3 gap-5 mt-12">
                        {certificationData.map((data, index) => (
                            <div key={index} className="flex flex-col bg-white rounded-lg border">
                                <div className="px-6 py-4 border-b gap-1">
                                    <div className="font-semibold">{data.courseName}</div>
                                    <div className="text-sm text-slate-500">{data.institution}</div>
                                </div>
                                <div className="flex-1">
                                    <div className="grid gap-4 p-6">
                                        <div className="grid grid-cols-2 gap-5 items-center">
                                            <div>
                                                <div className="text-sm text-slate-500">Join Date</div>
                                                <div className="text-sm">{formatDate(data.joinDate)}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-500">Relieve Date</div>
                                                <div className="text-sm">{formatDate(data.relieveDate)}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm">{data.city}, {data.state}, {data.country}</div>
                                        <div className="text-sm"><u className="font-medium">Areas of study:</u> {data.subjects.join(', ')}</div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 px-6 py-4 border-t">
                                    <Link href={`/resume/certification/edit/${data.id}`}>
                                        <button type="button" className="text-blue-500 p-2 text-sm uppercase font-semibold">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(data.id)} type="button" className="p-2 text-sm uppercase text-red-500 font-semibold">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </StepperLayout>
            <StepperControlsLayout currentStep={3} totalSteps={8} showBackButton={true} disableBackButton={false}>
                <Link href="/resume/skills">
                    <button
                        type="button"
                        className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
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
    )
}

export default Certification