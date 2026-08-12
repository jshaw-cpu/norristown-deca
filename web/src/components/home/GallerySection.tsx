import Image from "next/image";

const PHOTOS = [
  { src: "/gallery/mr-shaw.png", alt: "Mr. Shaw", caption: "Mr. Shaw!" },
  { src: "/gallery/j-and-j.jpg", alt: "Two members at a conference", caption: "Brotherly Love in the ATL!" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="bg-blue-night px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-head font-bold text-xs uppercase tracking-[0.28em] text-[#4aa3e8] mb-3">
          Chapter Life
        </p>
        <h2 className="font-head font-black uppercase text-4xl md:text-5xl tracking-tight text-white mb-6">
          Eagles in action.
        </h2>
        <p className="text-silver-light text-lg mb-12">
          Competition floors, conference halls, leadership stages &mdash;
          this is what showing up looks like.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="bg-white/5 border border-white/15 p-4">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={640}
                height={640}
                className="w-full h-auto"
              />
              <p className="font-head font-bold text-xs uppercase tracking-[0.14em] text-silver-light mt-4">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
