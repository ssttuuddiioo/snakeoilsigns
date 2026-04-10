import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import FadeIn from "@/components/FadeIn";

async function getProjects() {
  try {
    return await client.fetch(allProjectsQuery);
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Murals \u2014 Snake Oil Signs",
  description:
    "Hand-painted murals, signage, and advertising by Snake Oil Signs. Clients include Apple, HBO, Netflix, Gucci, and more.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="pt-28 md:pt-36 pb-0">
      {/* Header */}
      <div className="px-6 md:px-12 max-w-content mx-auto mb-8 md:mb-12">
        <FadeIn>
          <p className="font-display text-[10px] tracking-[0.3em] uppercase text-rust mb-3">
            Portfolio
          </p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-[8rem] uppercase tracking-tight font-bold text-ink leading-[0.85]">
            Murals
          </h1>
          <p className="mt-6 text-ink/60 text-base md:text-lg leading-[1.8] max-w-2xl">
            Every mural starts the same way: we notice a wall that&apos;s not doing enough. Our work lives where people live, outside restaurants, down the block, on the walk home. A wall that used to be nothing becomes the thing people stop and photograph, the thing that brings foot traffic to a local business, the thing that makes someone care about art who never did before. We paint because a great mural doesn&apos;t just decorate a space. It changes the energy of an entire street.
          </p>
        </FadeIn>
      </div>

      {/* Projects */}
      {projects.length > 0 ? (
        <div>
          {projects.map((project: any, i: number) => (
            <FadeIn key={project._id}>
              <ProjectRow project={project} index={i} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="px-6 md:px-12 max-w-content mx-auto pb-24">
          {[1, 2, 3].map((i) => (
            <div key={i} className="py-16 border-t border-border">
              <p className="font-display text-2xl font-bold uppercase text-ink">
                Project {i}
              </p>
              <p className="mt-2 text-sm text-ink/40">
                Add projects in Sanity Studio.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectRow({ project, index }: { project: any; index: number }) {
  const slug = project.slug?.current;
  const href = slug ? `/work/${slug}` : `/work`;
  const isEven = index % 2 === 0;

  return (
    <Link href={href} className="block group">
      <section className="border-t border-border hover:bg-ink/[0.02] transition-colors duration-300">
        <div className="max-w-content mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            {/* Image */}
            <div
              className={`md:col-span-5 overflow-hidden ${
                isEven ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="relative aspect-[3/2] bg-ink/5">
                {project.featuredImage ? (
                  <Image
                    src={urlFor(project.featuredImage)
                      .width(800)
                      .quality(75)
                      .url()}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-ink/20 text-sm">No image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Text + Arrow */}
            <div
              className={`md:col-span-7 flex items-center justify-between gap-6 ${
                isEven ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="flex-1 min-w-0">
                {project.category && (
                  <p className="font-display text-[10px] tracking-[0.25em] uppercase text-rust mb-3">
                    {project.category}
                  </p>
                )}

                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-ink leading-[0.95] group-hover:text-rust transition-colors duration-300">
                  {project.title}
                </h2>

                {project.client && (
                  <p className="mt-2 text-sm text-ink/40">{project.client}</p>
                )}

                {project.shortDescription && (
                  <p className="mt-3 text-sm text-ink/50 leading-relaxed max-w-md line-clamp-2">
                    {project.shortDescription}
                  </p>
                )}

                <span className="inline-flex items-center gap-2 mt-4 text-sm font-display tracking-[0.1em] uppercase text-rust group-hover:text-rust-dark transition-colors">
                  View Project
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </div>

              {/* Big arrow circle */}
              <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-ink/10 group-hover:border-rust group-hover:bg-rust flex items-center justify-center transition-all duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-ink/30 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
