export default class Element {
  constructor({ tag, attributes, children, on }) {
    this.tag = tag
    this.attributes = attributes
    this.children = children
    this.on = on
  }

  create() {
    if (!this.tag || typeof this.tag !== 'string') {
      throw new Error('Requirement tag param in Element.js');
    }
    const created_element = document.createElement(this.tag);

    if(this.children && typeof this.attributes !== 'object') {
      throw new Error('The Element attributes have to be object type');
    }
    if (this.attributes) {
      for (let i in this.attributes) {
        created_element[i] = this.attributes[i];
      }
    }

    if(this.children && typeof this.children !== 'object') {
      throw new Error('The Element children have to be object type');
    }
    if (this.children) {
      for (let child in this.children) {
        if(!this.children[child] instanceof Element) {
          throw new Error('The Element children have to be build by Element.js');
        }
        created_element.appendChild(this.children[child].render())
      }
    }

    if (this.on || typeof this.on.event !== 'string') {
      created_element.addEventListener(this.on.event, this.on.function)
    }
    return created_element
  }
}
