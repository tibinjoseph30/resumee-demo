import AppLayout from "@/components/shared/AppLayout"
import Link from "next/link"

const Home = () => {
  return (
    <AppLayout>
      <div className="p-4 text-center">
        <Link href="/resume/new">
          <button className="bg-primary text-white p-5 text-lg rounded-lg min-w-64 font-medium">Create your resume</button>
        </Link>
      </div>
    </AppLayout>
  )
}

export default Home
