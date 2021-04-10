
class Exercise {
  constructor(name, type = '', notes = '') {
    this.name = name;
    this.type = type;
    this.notes = notes
  }

  toJson = () => {
   return { 
      name: this.name,
      type: this.type,
      notes: this.notes
    }
  }
}

export default Exercise