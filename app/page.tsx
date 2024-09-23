import React from "react"
import Link from "next/link"
import AppLayout from "../components/shared/AppLayout"
const Home = () => {
  return (
    <AppLayout>
      <div className="p-4 text-center">
        <Link href="/resume/user">
          <button className="bg-primary text-white p-5 text-lg rounded-lg min-w-64 font-medium">Create your resume</button>
        </Link>
      </div>
    </AppLayout>
  )
}

export default Home
