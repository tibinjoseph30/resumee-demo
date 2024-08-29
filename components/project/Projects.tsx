"use client"

import Link from "next/link"
import StepperLayout from "../shared/StepperLayout"
import { HiMiniPlus } from "react-icons/hi2"
import Spinner from "../shared/ui/loader/Spinner"
import StepperControlsLayout from "../shared/StepperControlsLayout"
import ConfirmationModal from "../shared/ui/confirmation/Confirmation"
import { useEffect, useState } from "react"
import { ProjectForm } from "../../interfaces/formInterfaces"
import { auth, firestore } from "../../services/firebase.config"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { FirebaseError, handleFirebaseError } from "../../constants/firebaseErrors"
import { format } from "date-fns"

const Projects = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [projectData, setProjectData] = useState<ProjectForm[]>([])
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string>();

    const user = auth.currentUser

    const formatDate = (timestamp: { seconds: number } | null | undefined) => {
        return timestamp ? format(new Date(timestamp.seconds * 1000), 'yyy') : 'N/A';
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log('No authenticated user found.');
                return;
            }

            try {
                setPageLoading(true)
                const projectCollectionRef = collection(firestore, 'projects')
                const docSnap = await getDocs(query(projectCollectionRef, where("userId", "==", user.uid)))

                if (!docSnap.empty) {
                    const data: ProjectForm[] = docSnap.docs.map(doc => ({
                        ...(doc.data() as ProjectForm),
                        id: doc.id
                    }))
                    console.log('Documents data:', data);
                    setProjectData(data)
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
        setDeletingId(id)
        setModalOpen(true)
    }

    const confirmDelete = async () => {
        setLoading(true)
        if (deletingId) {
            try {
                await deleteDoc(doc(firestore, 'projects', deletingId))
                setProjectData(projectData.filter(data=> data.id !== deletingId))
            } catch (error) {
                console.log('Error deleting document:', error);
            } finally {
                setDeletingId(undefined);
                setLoading(false)
                setModalOpen(false);
            }
        }
    }

    return (
        <div>
            <StepperLayout>
                <div>
                    <div className="mb-8">
                        <div className="text-2xl font-semibold">Projects</div>
                        <div className="text-slate-400 mt-1">List out your skills here</div>
                    </div>
                    <Link href="/resume/project/new">
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
                    <div className="grid grid-cols-2 gap-5 mt-12">
                        {projectData.map((data, index) => (
                            <div key={index} className="flex flex-col bg-white rounded-lg border">
                                <div className="flex justify-between items-center px-6 py-4 pb-0">
                                    <div className="font-semibold">{data.projectName}</div>
                                    <div className="text-sm text-slate-500">{formatDate(data.projectStartedOn)}</div>
                                </div>
                                <div className="grid gap-4 p-6">
                                    <div className="text-sm">{data.description}</div>
                                    <div className="text-sm"><u className="font-medium">Built in:</u> {data.technology.join(', ')}</div>
                                </div>
                                <div className="flex justify-end gap-2 px-6 py-4 border-t">
                                    <Link href={`/resume/project/edit/${data.id}`}>
                                        <button type="button" className="text-blue-500 p-2 text-sm uppercase font-semibold">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(data.id)} type="button" className="p-2 text-sm uppercase text-red-500 font-semibold">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </StepperLayout>
            <StepperControlsLayout currentStep={5} totalSteps={8} showBackButton={true} disableBackButton={false}>
                <Link href="/resume/work-experience">
                    <button
                        type="button"
                        className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:opacity-90"
                    // disabled={educationData.length <= 0}
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

export default Projects