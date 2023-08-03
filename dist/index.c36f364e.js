function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child)=>typeof child === "object" ? child : createTextElement(child))
        }
    };
}
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    };
}
const Zitact = {
    createElement
};
const element = Zitact.createElement("div", {
    id: "app"
}, Zitact.createElement("a", null, "bar"), Zitact.createElement("b"));
console.log(element); // React.createElement('h1', {class: 'heading'}, React.createElement())

//# sourceMappingURL=index.c36f364e.js.map
