import { P } from '@/components/ui/typography'

export default function SectionAbout() {
  return (
    <section
      id="about"
      className="h-screen grid grid-cols-2 gap-10 border-2 border-red-500"
    >
      <div className="flex flex-col justify-center items-end gap-2">Image</div>

      <div className="flex flex-col justify-center items-start">
        <P className="md:w-2/3 lg:w-1/2">
          Born in December 1994, I was immersed in technology from a young age
          thanks to my father — a web designer and journalist — whose passion
          for computers naturally influenced my early interests. Although I was
          always drawn to games and PCs, my true calling in the tech industry
          only emerged later. I initially carved out a successful six-year
          career in human resources, a journey that honed my people skills and
          strategic thinking. At the onset of the pandemic, I discovered
          programming, and its creative and problem-solving aspects ignited a
          profound passion within me. Since then, I have dedicated myself to
          continuous learning and professional growth, eager to contribute
          innovative solutions and drive digital transformation.
        </P>
      </div>
    </section>
  )
}
