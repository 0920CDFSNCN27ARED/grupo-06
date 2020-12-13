const toThousand = (n) => {
  return n
    .toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

module.exports = toThousand;
