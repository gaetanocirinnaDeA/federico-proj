console.log("everythings works");
import "./../styles/styles.scss";
import { posts } from "./api/posts";

posts().then((res) => {
    let div = document.getElementById("divContainer");

    res.forEach((element, index) => {
        const text = document.createTextNode(element.other);
        div.appendChild(text);
    });

    console.log("res", res);
});
