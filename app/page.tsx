import React from "react"
import Link from "next/link"
import AppLayout from "../components/shared/AppLayout"
import { HiOutlineArrowRight } from "react-icons/hi2"
const Home = () => {
  return (
    <AppLayout>
      <div className="p-4 text-center h-full flex justify-center items-center">
        <Link href="/resume/user">
          <button className="flex items-center justify-center gap-4 bg-primary text-white p-6 text-lg rounded-lg min-w-72 font-medium hover:opacity-90">Create your resume <HiOutlineArrowRight/></button>
        </Link>
      </div>
    </AppLayout>
  )
}

export default Home
