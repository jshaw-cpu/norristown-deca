import Image from "next/image";

export function GallerySection() {
  return (
    <section id="gallery" className="bg-blue-night px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
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

        <div className="inline-block bg-white/5 border border-white/15 p-4">
          <Image
            src="/gallery/mr-shaw.png"
            alt="Mr. Shaw"
            width={640}
            height={640}
            className="w-full max-w-sm h-auto"
          />
          <p className="font-head font-bold text-xs uppercase tracking-[0.14em] text-silver-light mt-4">
            Mr. Shaw!
          </p>
        </div>
      </div>
    </section>
  );
}
