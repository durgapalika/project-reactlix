
export const fetchGenres = async () => {
  return await fetch('./genres.json')
    .then((res) => res.json())
    .then((data) => {
       data.forEach((item) => {
        item.checked = false;
      });
      return data;
    });
};
