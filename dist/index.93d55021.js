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
function render(element, container) {
    // TODO: create dom nodes
    const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
    const isProperty = (key)=>key !== "children";
    Object.keys(element.props).filter(isProperty).forEach((name)=>{
        dom[name] = element.props[name];
    });
    element.props.children.forEach((child)=>render(child, dom));
    console.log(dom);
    container.appendChild(dom);
}
const Zitact = {
    createElement,
    render
};
/** @jsx Zitact.createElement */ const element = /*#__PURE__*/ Zitact.createElement("div", {
    className: "id",
    __source: {
        fileName: "index.jsx",
        lineNumber: 51,
        columnNumber: 3
    },
    __self: this
}, /*#__PURE__*/ Zitact.createElement("h1", {
    __source: {
        fileName: "index.jsx",
        lineNumber: 52,
        columnNumber: 5
    },
    __self: this
}, "Hello world"), /*#__PURE__*/ Zitact.createElement("p", {
    __source: {
        fileName: "index.jsx",
        lineNumber: 53,
        columnNumber: 5
    },
    __self: this
}, "lorem"));
const root = document.getElementById("root");
Zitact.render(element, root); // console.log(element);
 // React.createElement('h1', {class: 'heading'}, React.createElement())
 // const element = Zitact.createElement(
 //   "div",
 //   { id: "app" },
 //   Zitact.createElement("a", null, "bar"),
 //   Zitact.createElement("b")
 // );

//# sourceMappingURL=index.93d55021.js.map
