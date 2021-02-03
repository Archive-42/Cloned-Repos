export const fetchAllPokemon = () => (
  $.ajax({
    method: "GET",
    url: "api/pokemon"
  })
)

export const fetchPoke = (id) => (
  $.ajax({
    method: "GET",
    url: `api/pokemon/${id}`
  })
);