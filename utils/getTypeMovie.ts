const getTypeMovie = (type: number) => {
  switch (type) {
    case 1:
      return 'Premiere'
    case 2:
      return 'Theatrical (limited)'
    case 3:
      return 'Theatrical'
    case 4:
      return 'Digital'
    case 5:
      return 'Physical'
    default:
      return 'TV'
  }
}

export default getTypeMovie
