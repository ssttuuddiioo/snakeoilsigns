# Snake Oil Signs

Portfolio website for Snake Oil Signs — hand-painted murals, signage, and oil paintings by Steve, a Los Angeles-based muralist formerly at Colossal Media.

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Sanity v5** (embedded studio at `/studio`)
- **Tailwind CSS**
- **GROQ** queries
- Deployed to **Vercel**

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone <your-repo-url>
cd snakeoil
npm install --legacy-peer-deps
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (e.g. `fix50z8g`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (usually `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version (e.g. `2024-01-01`) |
| `SANITY_API_TOKEN` | Optional — needed for write operations |

### Run Locally

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Sanity CMS Guide (for Steve)

### Accessing the Studio

Go to `yourdomain.com/studio` and log in with your Sanity account.

### Sidebar Structure

- **Settings** — Site title, logo, contact info, social links, newsletter text
- **Pages** — Home Page, About Page, Workshops Page, Contact Page
- **Projects** — All portfolio projects (murals, signs, oil paintings)

### How to Update the Homepage

1. Go to **Pages → Home Page**
2. Upload a hero image and set the tagline
3. Under "Selected Projects", click + to add references to Project documents
4. Drag to reorder. The homepage shows these in order.
5. Add client names to the "Client List" array for the scrolling marquee

### How to Add a New Project

1. Go to **Projects → + Create**
2. Fill in: Title, Client, Category (Mural / Sign Painting / Oil Painting / Gold Leaf / Other)
3. Upload a Featured Image (required — this shows in the gallery grid)
4. Add Gallery Images with captions (these show in the lightbox)
5. Set an Order Rank number (lower = appears first)
6. Publish

### How to Update Other Pages

- **About**: Bio text (rich text), hero photo, video URL (YouTube/Vimeo), experience entries, education
- **Workshops**: Description, skill levels with details, pricing, images
- **Contact**: Heading, description, featured image, success message

### Content Updates

Changes appear on the live site within a few seconds after publishing in Sanity.

## Project Structure

```
app/
  (site)/           # Public site pages
    page.tsx        # Home
    work/           # Portfolio gallery
    oil-paintings/  # Oil paintings gallery + commission info
    workshops/      # Workshop details
    about/          # Bio, video, experience
    contact/        # Quote form
  studio/           # Sanity Studio (embedded)
  api/contact/      # Contact form API route

components/         # Shared React components
sanity/
  schemas/          # Sanity document schemas
  lib/              # Client, queries, image helper
```

## Deployment

### Vercel

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

### Custom Domain

1. Add your domain in Vercel project settings
2. Update DNS records as instructed by Vercel
3. Add the production domain to Sanity CORS origins:
   - Go to [sanity.io/manage](https://sanity.io/manage) → your project → API → CORS Origins
   - Add `https://yourdomain.com`

### Sanity CORS

For the studio to work, add these CORS origins in Sanity:
- `http://localhost:3000` (development)
- `https://yourdomain.com` (production)
- `https://your-app.vercel.app` (Vercel preview)

## Content Seeding

After first deploy, populate content in this order:

1. **Site Settings** — logo, contact email/phone, social URLs
2. **Projects** — create at least 5-6 with images and categories
3. **Home Page** — hero image, tagline, select projects, client list
4. **About Page** — photo, bio, video URL, experience, education
5. **Workshops Page** — description, skill levels, images
6. **Contact Page** — description, featured image

## Future Enhancements

- Wire contact form to [Resend](https://resend.com) or SendGrid
- Newsletter signup backend (Mailchimp, ConvertKit)
- Individual project detail pages
- Blog / field notes section
- E-commerce / print shop integration
- Video hosting via [Mux](https://www.mux.com) (Sanity plugin)
