/**
 * creates a text element that has no children
 * 
 * @param {string} text - the text string value
 * @returns a TEXT_ELEMENT
 */
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],   // texts do not have children
        }
    }
}

/**
 * Creates a "react-lite" element
 * @param {string} type - the element to render
 * @param {any} props - the properties of the element
 * @param  {...any} children - the children elements of the element created
 * 
 * If the child is not an "object" type, it must be a text type
 */
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === "object" ? child : createTextElement(child))
        }
    }
}

/**
 * Adds the passed element to a parent destination
 * @param {{ props: { children: { type: string, props: any }[] } }} element - the element to add to the a parent
 * @param {Element} parent - the parent element to add the element to
 */
function render(element, parent) {
    const domElement =  element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)

    // assign the passed element props to the html dom attributes
    // e.g. <h1 mProp={1} /> --> <h1 mProp="1">...</h1>
    // etc...
    Object.keys(element.props)
        .filter(key => key !== "children")
        .forEach(name => domElement[name] = element.props[name])

    // recursively add the children of the `element` to the dom version of the element
    element.props.children.forEach(child => render(child, domElement))
    parent.appendChild(domElement)
}

export const Lite = {
    createElement,
    render
}