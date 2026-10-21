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

  // NEW: machine-readable date for <time datetime="...">
  eleventyConfig.addFilter("isoDate", function(date) {
    return new Date(date).toISOString().slice(0, 10);
  });

  // NEW: up to `limit` posts of the same category, excluding the current page
  eleventyConfig.addFilter("related", function(posts, category, currentUrl, limit = 3) {
    return [...(posts || [])]
      .reverse()
      .filter(p => p.data.category === category && p.url !== currentUrl)
      .slice(0, limit);
  });

  return {
    dir: {
      input: "src",      // Folder tempat Anda menulis kode & konten
      output: "_site"    // Folder hasil akhir
    }
  }
};
