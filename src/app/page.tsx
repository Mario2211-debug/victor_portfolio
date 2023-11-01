import PreSection from "./Section"
import FullScreenNavBar from "../components/Navbar"
import Projects from "./projects/page"


export default function Home() {
  return (
 <div className=''>
    <FullScreenNavBar/>
    <section className='text-gray-600 body-font grid-flow-row md:h-screen-[calc(100vh-24px)]'>
  <PreSection/>
  <Projects/>
  </section>

  </div>
  )
}
