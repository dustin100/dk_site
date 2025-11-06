export const HOME_QUERY = `
{
  "settings": *[_type=="siteSettings"][0]{
    siteName,
    versionBadge,
    nav[]{label, href},
    socials[]{label, href, style},
    contactEmail,
    seo{title, description, "ogImage": ogImage.asset->url}
  },
  "home": *[_type=="homePage"][0]{
    sections[]{
      _type == "heroSection" => {
        _type,
        kicker,
        title,
        subtitle,
        "ctas": ctas[]{label, href, style},
        "summaryBullets": summaryBullets
      }
      ,
      _type == "aboutSection" => {
        _type,
        title,
        subtitle,
        callout,
        body,
        bullets[]
      }
      ,
      _type == "workLogosMarqueeSection" => {
        _type,
        title,
        strapline,
        "logos": logos[]{name, url, "src": logo.asset->url, "alt": logo.alt}
      }
      ,
      _type == "skillsSection" => {
        _type,
        title,
        intro,
        tags
      }
      ,
      _type == "stackSection" => {
        _type,
        title,
        "stacks": stacks[]{
          label,
          host,
          summary,
          list
        }
      }
      ,
      _type == "contactSection" => {
        _type,
        title,
        body,
        "ctas": ctas[]{label, href, style}
      }
    }
  }
}
`;
