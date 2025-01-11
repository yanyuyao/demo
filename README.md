# UP1 Web Starter (UP1WebStarter) Demo Site

UP1WebStarter is a generic web site building template. It supports features like,

- Contentful CMS integration
- MUI based component UI
- ...   

For more docs, see https://docs.google.com/document/d/16cqFiANamZvIgvfQjhh8kzTLOkKz1qPxuQ8uUMkjeaM/edit?usp=sharing

## Features

- Contentful CMS
- Nextjs with App router

## Demo Site

### [https://www.web-starter.up1.tech/](https://www.web-starter.up1.tech/)

- github: https://github.com/devobjpro/up1-starter-demo

## Configuration

Setup .env.local

```
BUNDLE_ANALYZE=false
ENVIRONMENT_NAME=local

# The URL for the domain your app is hosted on (used for generating the urls needed for SEO)
# If you deploy to Vercel or Netlify it is configured through the respective config files (`vercel.json` and `netlify.toml`)
NEXT_PUBLIC_BASE_URL=http://localhost:3012/

# Your current space ID: https://www.contentful.com/help/find-space-id/
CONTENTFUL_SPACE_ID=ogv8n4ero9sj

# Your current space Content Delivery API access token: https://www.contentful.com/developers/docs/references/content-delivery-api/
CONTENTFUL_ACCESS_TOKEN=q5i8IObSVzIQV3hx20nbR6vT8Rm_7yl2aZR8HHV4L4c

# Your current space Content Preview API access token: https://www.contentful.com/developers/docs/references/content-preview-api/
CONTENTFUL_PREVIEW_ACCESS_TOKEN=tlsxeoirCAb2kfvW8cMRr6bonTYlFEfAWoCLiUgdpuE

# for setup.js during content type import
CONTENTFUL_MANAGEMENT_TOKEN=[Personal Access Token]

CONTENTFUL_PREVIEW_SECRET=up1-preview
CONTENTFUL_REVALIDATE_SECRET=up1-revalidate
```

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

### Build static site and deploy to public site

```bash
npm run build
rsync -avz -e "ssh -i /Users/dewenli/.ssh/101BIO_AWS2.pem" /Users/dewenli/sandbox/unitpro/up1_demo_cf_app_nextjs/out/ ubuntu@35.88.149.109:/var/www/up1_tech_web_starter/
```

## Contentful CLI

Login to Contentful

```
contentful login
```

Export content type only

```
contentful space export --space-id ogv8n4ero9sj --environment-id master --max-allowed-limit 10 --export-dir /tmp --skip-content
```

## Resource Links

### Graphic

- Royalty free images
  - https://www.pexels.com/
  - https://unsplash.com/

## Log

### 2024-10-19

- disabled /app/api/\*_/_.ts
