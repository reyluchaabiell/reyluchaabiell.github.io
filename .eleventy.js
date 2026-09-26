module.exports = function(eleventyConfig) {
  // Menyuruh 11ty untuk menyalin folder css dan gambar langsung ke hasil akhir
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/certs");


  eleventyConfig.addFilter("tanggalIndo", function(date) {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short', 
      year: 'numeric'
    });
  });

  return {
    dir: {
      input: "src",      // Folder tempat Anda menulis kode & konten
      output: "_site"    // Folder hasil akhir (otomatis dibuat oleh 11ty)
    }
  }
};