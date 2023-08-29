const Zitact = {
  createElement,
  render,
};

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      /* here we are checking this because the children of any react element can just be text
       or number //////// (primitives).  So, we have to handle them seperately as while rendernig
       recursively it can be a problem.
      */
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}


const el = {
  type: 'div', 
  props: {
    className: 'id',
    children:[
      {
        type: 'h1',
        props: {
          children: [
            {
              type: 'TEXT_ELEMENT',
              props: {
                nodeValue: 'Hello World',
                children:[],
             }
            }
          ]
        }
      },
      {
        type: 'p',
        props:{
          children:[ 
          {
            type: "TEXT_ELEMENT",
            props: {
              nodeValue: 'lorem',
              children: []
            }
          }
          ]
        }
      }
    ]
  }
}

function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
 
  //filering children from the props and assigning remaining to the dom
  Object.keys(element.props)
    .filter(key => key!=='children')
    .forEach((name) => (dom[name] = element.props[name]));

    /*
    Recursiverly going through the childrren and appending to the parent container after finish of each 
    children pass.
    */
    element.props.children.forEach(child=> {
      render(child, dom)
    })

    container.appendChild(dom);
    
}

/** @jsx Zitact.createElement */
const element = (
  <div className="id">
    <h1>Hello world</h1>
    <p>Lorem eiciendis eos laborum deserunt vero adipisci aliquid voluptates ratione ex!</p>
  </div>
);

const root = document.getElementById("root");

Zitact.render(element, root);