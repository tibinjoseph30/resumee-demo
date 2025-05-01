"use client"

import { HiMiniPlus } from 'react-icons/hi2';
import StepperLayout from '../shared/StepperLayout';
import Link from 'next/link';
import StepperControlsLayout from '../shared/StepperControlsLayout';
import { auth, db } from '../../services/firebase.config';
import { useEffect, useState } from 'react';
import { SkillsForm } from '../../interfaces/formInterfaces';
import Spinner from '../shared/ui/loader/Spinner';
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { FirebaseError, handleFirebaseError } from '../../constants/firebaseErrors';
import ConfirmationModal from '../shared/ui/confirmation/Confirmation';
import { useUserTypes } from '../hooks/useUserTypes';

const Skills = () => {
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [skillsData, setSkillsData] = useState<SkillsForm[]>([])
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string>();

    const user = auth.currentUser
    const {isExperienced} = useUserTypes();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.log('No authenticated user found.');
                return;
            }

            try {
                setPageLoading(true)
                const skillsCollectionRef = collection(db, 'skills');
                const docSnap = await getDocs(
                    query(
                        skillsCollectionRef, 
                        where("userId", "==", user.uid),
                        orderBy("createdAt", "asc")
                    ));

                if (!docSnap.empty) {
                    const data: SkillsForm[] = docSnap.docs.map(doc => ({
                        ...(doc.data() as SkillsForm),
                        id: doc.id
                    }))
                    console.log('Documents data:', data);
                    setSkillsData(data);
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
                await deleteDoc(doc(db, 'skills', deletingId));
                setSkillsData(skillsData.filter(data => data.id !== deletingId));
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
                        <div className="text-2xl font-semibold">Skills</div>
                        <div className="text-slate-400 mt-1">List out your skills here</div>
                    </div>
                    <Link href="/resume/skills/new">
                        <button
                            className="bg-primary rounded-md text-white p-3 min-w-44 font-medium hover:bg-primary">
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
                    (<>{skillsData.length > 0 ?
                        <div className="grid md:grid-cols-2 gap-5 mt-12">
                            {skillsData.map((data, index) => (
                                <div key={index} className="flex flex-col bg-white rounded-lg border">
                                    <div className="px-6 py-4 pb-0">
                                        <div className="font-semibold">{data.skillCategory}</div>
                                    </div>
                                    <div className="grid gap-4 p-6 basis-full">
                                        <div className="flex items-start flex-wrap gap-2">
                                            {data.skills.map((skill, skillIndex) => (
                                                <div key={skillIndex} className='border rounded-full text-sm inline-flex px-3 py-1'>{skill}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 px-6 py-4 border-t">
                                        <Link href={`/resume/skills/edit/${data.id}`}>
                                            <button type="button" className="text-blue-500 p-2 text-sm uppercase font-semibold">Edit</button>
                                        </Link>
                                        <button onClick={() => handleDelete(data.id)} type="button" className="p-2 text-sm uppercase text-red-500 font-semibold">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <>
                            <div className="mt-12 text-slate-500">Add at least one Skill set and continue.</div>
                        </>
                    }</>)
                }
            </StepperLayout>
            <StepperControlsLayout currentStep={5} totalSteps={isExperienced ? 9 : 8} showBackButton={true} disableBackButton={false}>
                <Link href="/resume/project">
                    <button
                        type="button"
                        className="bg-primary p-3 rounded-md text-white min-w-36 font-medium hover:bg-primary"
                        disabled={skillsData.length <= 0}
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

export default Skills