const Zitact = {
    createElement,
    render
};
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            /* here we are checking this because the children of any react element can just be text
       or number //////// (primitives).  So, we have to handle them seperately as while rendernig
       recursively it can be a problem.
      */ children: children.map((child)=>typeof child === "object" ? child : createTextElement(child))
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
// to keep track of text unit of work
let nextUnitOfWork = null;
let wipTree = null;
function createDOMNode(fiber) {
    const dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);
    //filering children from the props and assigning remaining to the dom
    Object.keys(fiber.props).filter((key)=>key !== "children").forEach((name)=>dom[name] = fiber.props[name]);
    return dom;
}
function render(element, container) {
    // TODO  set next unit of work
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [
                element
            ]
        }
    };
}
/*
regulary performs small units of work 
*/ function workLooop(deadline) {
    let shouldYeild = false;
    while(nextUnitOfWork && !shouldYeild){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYeild = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLooop);
}
/* request idle callback is like settimeout but we don't define when to run the code 
instead browser runs the code passed into it when the browser is idle
*/ requestIdleCallback(workLooop);
function performUnitOfWork(fiber) {
    if (!fiber.dom) fiber.dom = createDOMNode(fiber);
    const elements = fiber.props.children;
    let index = 0;
    let prevSibling = null;
    while(index < elements.lenth){
        const element = elements[index];
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        };
        if (index === 0) fiber.child = newFiber;
        else prevSibling.sibling = newFiber;
        prevSibling = newFiber;
        index++;
    }
    if (fiber.child) return fiber.child;
    let nextFiber = fiber;
    while(nextFiber){
        if (nextFiber.sibling) return nextFiber.sibling;
        nextFiber = nextFiber.parent;
    }
}
/** @jsx Zitact.createElement */ const element = /*#__PURE__*/ Zitact.createElement("div", {
    className: "id",
    __source: {
        fileName: "index.jsx",
        lineNumber: 122,
        columnNumber: 3
    },
    __self: this
}, /*#__PURE__*/ Zitact.createElement("h1", {
    __source: {
        fileName: "index.jsx",
        lineNumber: 123,
        columnNumber: 5
    },
    __self: this
}, "Hello world"), /*#__PURE__*/ Zitact.createElement("p", {
    __source: {
        fileName: "index.jsx",
        lineNumber: 124,
        columnNumber: 5
    },
    __self: this
}, "Lorem eiciendis eos laborum deserunt vero adipisci aliquid voluptates ratione ex!"));
const root = document.getElementById("root");
Zitact.render(element, root);

//# sourceMappingURL=index.93d55021.js.map
