import React from "react";
import ReactDOM from "react-dom";
import { Catalog, pageLoader } from "catalog";

const pages = [{
        path: "/",
        title: "Nuestra Mision",
        content: pageLoader(() =>
            import ("./WELCOME.md"))
    },
    {
        path: "/design",
        title: "Nuestra Mision",
        content: pageLoader(() =>
            import ("./DESIGN.md"))
    },


];

ReactDOM.render( <
    Catalog title = "Neo Pos"
    pages = { pages }
    />,
    document.getElementById("catalog")
);