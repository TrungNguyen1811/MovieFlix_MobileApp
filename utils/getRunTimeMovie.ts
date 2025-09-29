const getRunTimeMovie = (runtime: number) =>
  `${Math.floor(runtime / 60)}h ${runtime % 60}m`

export default getRunTimeMovie
