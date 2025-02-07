import React from "react"
import Link from "next/link"
import AppLayout from "../components/shared/AppLayout"
import { HiOutlineArrowRight } from "react-icons/hi2"
const Home = () => {
  return (
    <AppLayout>
      <div className="p-4 text-center h-full flex justify-center items-center">
        <Link href="/resume/user">
          <button className="group flex items-center justify-center gap-4 bg-primary text-white p-6 text-lg rounded-lg min-w-80 font-medium hover:bg-primary">Create your resume
            <HiOutlineArrowRight size={20} className="group-hover:translate-x-2 transition-all" />
          </button>
        </Link>
      </div>
    </AppLayout>
  )
}

export default Home
