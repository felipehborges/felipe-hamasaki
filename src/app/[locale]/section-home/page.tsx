import { H1, P } from '@/components/ui/typography'

export default function SectionHome() {
  return (
    <section className="pt-17 h-screen grid grid-cols-2 gap-10 border-2 border-red-500">
      <div className="flex flex-col justify-center items-end gap-2 ">
        <H1 className="">Greetings!</H1>
        <H1 className="">I'm Felipe Hamasaki</H1>
      </div>

      <div className="flex flex-col justify-center items-start ">
        <P className="md:w-2/3 lg:w-1/2">
          I'm a passionate software developer and a tech enthusiast. I love
          learning new things and sharing knowledge with others. I'm currently
          working with React and Next.js, but I'm always open to new
          opportunities and challenges.
        </P>
      </div>
    </section>
  )
}
