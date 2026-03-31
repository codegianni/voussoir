module.exports = function(eleventyConfig) {
  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");

  // Topic slug → label mapping
  const TOPIC_LABELS = {
    'ai-regulation': 'AI & Regulation',
    'comparative-policy': 'Comparative Policy',
    'data-privacy': 'Data & Privacy',
    'democracy-and-institutions': 'Democracy & Institutions',
    'digital-governance': 'Digital Governance',
    'energy-and-climate': 'Energy & Climate',
    'eu-policy': 'EU Policy',
    'govtech': 'GovTech',
    'migration': 'Migration',
    'public-administration': 'Public Administration',
    'public-health': 'Public Health',
    'security-and-defence': 'Security & Defence',
    'social-policy': 'Social Policy',
    'trade-and-sanctions': 'Trade & Sanctions',
    'urban-policy': 'Urban Policy',
  };

  // Filters
  eleventyConfig.addFilter("topicLabel", function(slug) {
    return TOPIC_LABELS[slug] || slug;
  });

  eleventyConfig.addFilter("readableDate", function(dateVal) {
    const months = ["January","February","March","April","May","June",
      "July","August","September","October","November","December"];
    const d = new Date(dateVal);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addFilter("shortDate", function(dateVal) {
    const months = ["Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"];
    const d = new Date(dateVal);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addFilter("isoDate", function(dateVal) {
    return new Date(dateVal).toISOString().split('T')[0];
  });

  // Legacy Italian filter kept for backwards compat
  eleventyConfig.addFilter("dataItaliana", function(date) {
    const mesi = ["gennaio","febbraio","marzo","aprile","maggio","giugno",
      "luglio","agosto","settembre","ottobre","novembre","dicembre"];
    const d = new Date(date);
    return `${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
  });

  eleventyConfig.addFilter("tempoLettura", function(content) {
    const parole = content.split(/\s+/).length;
    const minuti = Math.ceil(parole / 200);
    return `${minuti} min`;
  });

  // Collections
  eleventyConfig.addCollection("articles", function(api) {
    return api.getFilteredByGlob("src/articles/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("reports", function(api) {
    return api.getFilteredByGlob("src/reports/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("allContent", function(api) {
    const articles = api.getFilteredByGlob("src/articles/*.md");
    const reports = api.getFilteredByGlob("src/reports/*.md");
    return [...articles, ...reports].sort((a, b) => b.date - a.date);
  });

  // Legacy Italian collection
  eleventyConfig.addCollection("articoli", function(api) {
    return api.getFilteredByGlob("src/articoli/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
