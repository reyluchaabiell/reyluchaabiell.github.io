module.exports = function(eleventyConfig) {
  // Menggunakan Format Objek agar lokasi tujuan pasti akurat di GitHub Actions
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "src/img": "img",
    "src/js": "js",
    "src/certs": "certs"
  });

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
      output: "_site"    // Folder hasil akhir
    }
  }
};