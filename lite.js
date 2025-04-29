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

export const Lite = {
    createElement
}