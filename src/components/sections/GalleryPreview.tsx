import { Link } from 'react-router-dom'
import { galleryImages } from '../../data/gallery'
import CafeImage from '../CafeImage'
import SectionHeading from '../SectionHeading'

export default function GalleryPreview() {
  const items = galleryImages.slice(0, 6)

  return (
    <section className="py-24 md:py-32">
      <div className="container-cafe">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Gallery"
            title="Life at the spoon."
            className="mb-0"
          />
          <Link
            to="/gallery"
            className="link-underline mb-2 text-sm font-semibold text-espresso"
          >
            View all photos →
          </Link>
        </div>
      </div>

      <div className="mt-10 flex gap-4 overflow-x-auto px-6 pb-4 md:gap-6 md:px-12 lg:px-20">
        {items.map((image, i) => (
          <Link
            key={image.id}
            to={`/gallery#${image.id}`}
            className="group relative aspect-[4/5] w-[68vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-paper sm:w-[42vw] md:w-[30vw] lg:w-[22vw]"
            aria-label={image.title}
          >
            <div className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105">
              <CafeImage src={image.image} alt={image.title} />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-espresso/70 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="font-display text-lg font-semibold text-ivory">
                {image.title}
              </p>
              <span className="font-mono text-xs text-cream/70">
                0{i + 1}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}