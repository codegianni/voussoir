module.exports = function(eleventyConfig) {
  // Copia i file CSS nella cartella di output
  eleventyConfig.addPassthroughCopy("src/css");

  // Copia eventuali immagini
  eleventyConfig.addPassthroughCopy("src/img");

  // Filtro per formattare le date in italiano
  eleventyConfig.addFilter("dataItaliana", function(date) {
    const mesi = [
      "gennaio","febbraio","marzo","aprile","maggio","giugno",
      "luglio","agosto","settembre","ottobre","novembre","dicembre"
    ];
    const d = new Date(date);
    return `${d.getDate()} ${mesi[d.getMonth()]} ${d.getFullYear()}`;
  });

  // Calcolo tempo di lettura (media 200 parole/minuto)
  eleventyConfig.addFilter("tempoLettura", function(content) {
    const parole = content.split(/\s+/).length;
    const minuti = Math.ceil(parole / 200);
    return `${minuti} min`;
  });

  // Ordina gli articoli dal più recente
  eleventyConfig.addCollection("articoli", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articoli/*.md")
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
