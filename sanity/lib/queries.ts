import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    logo,
    siteTitle,
    tagline,
    contactEmail,
    contactPhone,
    instagramUrl,
    tiktokUrl,
    linkedinUrl,
    footerText,
    newsletterHeading,
    newsletterDescription
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroImage,
    heroTagline,
    introDescription,
    selectedProjects[]-> {
      _id,
      title,
      slug,
      client,
      category,
      shortDescription,
      featuredImage,
      externalUrl,
      date
    },
    clientList
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(orderRank asc, date desc) {
    _id,
    title,
    slug,
    client,
    category,
    shortDescription,
    featuredImage,
    galleryImages[] {
      image,
      caption
    },
    externalUrl,
    date,
    orderRank
  }
`;

export const projectsByCategoryQuery = groq`
  *[_type == "project" && category == $category] | order(orderRank asc, date desc) {
    _id,
    title,
    slug,
    client,
    category,
    shortDescription,
    featuredImage,
    galleryImages[] {
      image,
      caption
    },
    externalUrl,
    date,
    orderRank
  }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    category,
    shortDescription,
    featuredImage,
    galleryImages[] {
      image,
      caption
    },
    externalUrl,
    date
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heading,
    heroImage,
    bio,
    videoUrl,
    videoCaption,
    experienceEntries[] {
      role,
      company,
      startDate,
      endDate,
      description
    },
    educationEntries[] {
      degree,
      school,
      year
    }
  }
`;

export const workshopsPageQuery = groq`
  *[_type == "workshopsPage"][0] {
    heading,
    description,
    skillLevels[] {
      level,
      description
    },
    pricing,
    duration,
    ctaText,
    ctaEmail,
    images
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    heading,
    description,
    featuredImage,
    successMessage
  }
`;
