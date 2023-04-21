class Recipe {
    constructor(id, dishName, occasion, serving, description, instruction) {
        this.id = id;
        this.dishName = dishName;
        this.occasion = occasion;
        this.serving = serving;
        this.description = description;
        this.instruction = instruction;
    }
}

module.exports = Recipe;