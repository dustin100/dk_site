export const HOME_QUERY = `
{
  "settings": *[_type=="siteSettings"][0]{
    siteName,
    versionBadge,
    nav[]{label, href},
    socials[]{label, href, style},
    seo{
      title,
      description,
      "ogImage": ogImage.asset->url,
      "favicon": favicon.asset->url
    }
  },
  "strings": *[_type=="strings"][0]{
    ...
  },
  "home": *[_type=="homePage"][0]{
    sections[]{
      _type == "heroSection" => {
        _type,
        kicker,
        title,
        subtitle,
        "ctas": ctas[]{label, href, style},
        photo{
          alt,
          asset,
          crop,
          hotspot
        }
      },
      _type == "aboutSection" => {
        _type,
        title,
        subtitle,
        callout,
        body,
        bullets[]
      },
      _type == "workLogosGridSection" => {
        _type,
        title,
        strapline,
        "logos": logos[]{name, url, "src": logo.asset->url, "alt": logo.alt}
      },
      _type == "skillsSection" => {
        _type,
        title,
        intro,
        tags
      },
      _type == "stackSection" => {
        _type,
        title,
        tryStack,
        "stacks": stacks[]{
          label,
          host,
          summary,
          list,
          builtWith
        }
      },
      _type == "contactSection" => {
        _type,
        title,
        body,
        emailAddress,
        emailLabel,
        "ctas": ctas[]{label, href, style}
      }
    }
  }
}
`
